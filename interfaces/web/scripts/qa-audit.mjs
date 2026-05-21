/**
 * Full-stack smoke audit for public routes (dev servers must be running).
 * Usage: yarn qa:audit (from interfaces/web)
 */
import { chromium } from 'playwright';

const WEB = process.env.WEB_URL ?? 'http://localhost:5173';
const API = process.env.API_URL ?? 'http://127.0.0.1:8000/health';
const ROUTES = ['/', '/about', '/skills', '/projects', '/live-lab', '/contact'];
const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 720 },
];

const run = async () => {
  const apiRes = await fetch(API);
  const apiJson = await apiRes.json();
  console.log(`API ${API} → ${apiRes.status}`, apiJson);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  const failedRequests = [];

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
      const path = route === '/' ? '' : route;
      await page.goto(`${WEB}${path}`, {
        waitUntil: 'networkidle',
        timeout: 45000,
      });
      const mainCount = await page.locator('#main-content').count();
      const h1Count = await page.locator('h1').count();
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
      const systemBar = await page.locator('[role="status"]').count();
      const footer = await page.locator('footer').count();
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth > doc.clientWidth + 2;
      });
      const url = page.url();
      const onLiveLab = url.includes('/live-lab');
      const liveLabOk = route === '/live-lab' ? onLiveLab : !onLiveLab;
      const heroName = await page.getByText(/vinicius datti/i).count();
      const expectHero = route === '/' && heroName > 0;
      const expectLive = route === '/live-lab' && liveChannel > 0;
      const expectBoot = route === '/live-lab' && bootHandshake > 0;
      const expectFooter = route !== '/live-lab' && footer > 0;
      const portfolioOk =
        (route !== '/live-lab' || (expectLive && expectBoot)) &&
        (route === '/' ? expectHero : true) &&
        (route !== '/live-lab' ? expectFooter : footer === 0);
      console.log(
        `[${vp.name}] ${route} main=${mainCount > 0} h1=${h1Count} hero=${heroName > 0} live=${liveChannel > 0} boot=${bootHandshake > 0} footer=${footer} liveLabRoute=${liveLabOk} portfolioOk=${portfolioOk} overflow=${overflow}`
      );
      if (!liveLabOk || !portfolioOk) {
        process.exitCode = 1;
      }
    }
  }

  if (errors.length) {
    console.log('Console errors (unique):', [...new Set(errors)].slice(0, 8));
  } else {
    console.log('No console errors on public routes.');
  }
  if (failedRequests.length) {
    console.log('Failed API responses:', failedRequests.slice(0, 8));
  }

  await browser.close();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
