/**
 * Full-stack smoke + visual audit for public routes (dev servers must be running).
 * Usage: yarn qa:audit (from interfaces/web)
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const WEB = process.env.WEB_URL ?? 'http://127.0.0.1:5173';
const API = process.env.API_URL ?? 'http://127.0.0.1:8000/health';
const ROUTES = ['/', '/about', '/skills', '/projects', '/live-lab', '/contact'];
const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 720 },
];
const SCREENSHOT_DIR = path.join('scripts', 'qa-screenshots');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const run = async () => {
  ensureDir(SCREENSHOT_DIR);

  const apiRes = await fetch(API);
  const apiJson = await apiRes.json();
  console.log(`API ${API} → ${apiRes.status}`, apiJson);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  const failedRequests = [];
  const failures = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('response', (res) => {
    const url = res.url();
    if (
      url.includes('/api/v1') &&
      res.status() >= 400 &&
      !failedRequests.includes(url)
    ) {
      failedRequests.push(`${res.status()} ${url}`);
    }
  });

  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    for (const route of ROUTES) {
      const pathSuffix = route === '/' ? '' : route;
      await page.goto(`${WEB}${pathSuffix}`, {
        waitUntil: 'load',
        timeout: 60000,
      });
      try {
        await page.waitForSelector('#main-content', { timeout: 20000 });
      } catch {
        await page.waitForTimeout(1500);
      }
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(800);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);

      const mainCount = await page.locator('#main-content').count();
      const h1Count = await page.locator('h1').count();
      const heroHeadline = await page
        .getByRole('heading', { level: 1 })
        .first()
        .textContent()
        .catch(() => '');
      const presenceStrip = await page.locator('#portfolio-presence').count();
      const liveChannel = await page
        .getByLabel(/live channel|canal live/i)
        .count();
      const eventLog = await page
        .getByLabel(/event log|log de eventos/i)
        .count();
      const bootHandshake = await page
        .getByText(
          /transport status|status do transporte|initializing transport|inicializando transporte/i
        )
        .count();
      const footer = await page.locator('footer').count();
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth > doc.clientWidth + 2;
      });
      const brokenImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.filter((img) => !img.complete || img.naturalWidth === 0).length;
      });
      const liveLabCardVisible =
        route === '/'
          ? (await page.locator('#live-lab-preview').locator('a[href="/live-lab"]').count()) >
            0
          : true;

      const url = page.url();
      const onLiveLab = url.includes('/live-lab');
      const liveLabOk = route === '/live-lab' ? onLiveLab : !onLiveLab;
      const expectHero =
        route === '/' && h1Count > 0 && (heroHeadline?.length ?? 0) > 10;
      const expectPresence = route === '/' && presenceStrip > 0;
      const expectLive = route === '/live-lab' && liveChannel > 0;
      const expectBoot = route === '/live-lab' && bootHandshake > 0;
      const expectFooter = route !== '/live-lab' && footer > 0;
      const portfolioOk =
        mainCount > 0 &&
        (route !== '/live-lab' || (expectLive && expectBoot)) &&
        (route === '/' ? expectHero && expectPresence : true) &&
        (route !== '/live-lab' ? expectFooter : footer === 0) &&
        !overflow &&
        brokenImages === 0 &&
        liveLabCardVisible;

      const shotName = `${vp.name}_${route.replace(/\//g, '_') || 'home'}.png`;
      const shotPath = path.join(SCREENSHOT_DIR, shotName);
      await page.screenshot({ path: shotPath, fullPage: true });

      const status = portfolioOk ? '✓' : '✗';
      console.log(
        `${status} [${vp.name}] ${route} main=${mainCount > 0} h1=${h1Count} hero="${(heroHeadline ?? '').slice(0, 40)}..." presence=${presenceStrip > 0} liveLabCta=${liveLabCardVisible} live=${liveChannel} boot=${bootHandshake} footer=${footer} overflow=${overflow} brokenImg=${brokenImages} → ${shotPath}`
      );

      if (!liveLabOk || !portfolioOk) {
        failures.push(`${vp.name}${route}`);
        process.exitCode = 1;
      }
    }
  }

  // Home: project case panel interaction (desktop)
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(`${WEB}/`, { waitUntil: 'load', timeout: 60000 });
  await page.waitForSelector('#main-content', { timeout: 20000 });
  await page.waitForTimeout(1200);
  const projectCard = page.locator('article[role="button"][data-variant]').first();
  const cardCount = await projectCard.count();
  if (cardCount > 0) {
    await projectCard.click();
    await page.waitForTimeout(600);
    const panel = page.getByText(/enquadramento|framing/i);
    const panelVisible = (await panel.count()) > 0;
    console.log(
      `${panelVisible ? '✓' : '✗'} [desktop] / case panel opens=${panelVisible}`
    );
    if (!panelVisible) {
      failures.push('home-case-panel');
      process.exitCode = 1;
    }
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'desktop_home_case_panel.png'),
      fullPage: true,
    });
  } else {
    console.log('⚠ [desktop] / case panel skipped — no project cards rendered');
  }

  if (errors.length) {
    console.log('Console errors (unique):', [...new Set(errors)].slice(0, 12));
  } else {
    console.log('No console errors on public routes.');
  }
  if (failedRequests.length) {
    console.log('Failed API responses:', failedRequests.slice(0, 8));
  }
  if (failures.length) {
    console.log('Failures:', failures.join(', '));
  } else {
    console.log('\nAll route checks passed.');
  }

  await browser.close();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
