/**
 * Visual + hierarchy inspection for portfolio recalibration.
 * Usage: yarn qa:visual
 */
import { chromium } from 'playwright';
import fs from 'fs';

const WEB = process.env.WEB_URL ?? 'http://localhost:5173';
const OUT_DIR = 'scripts/visual-audit';

const ROUTES = [
  { path: '/', name: 'home', checks: { hero: true, footer: true, live: false, boot: false } },
  { path: '/projects', name: 'projects', checks: { hero: false, footer: true, live: false } },
  {
    path: '/live-lab',
    name: 'live-lab',
    checks: { hero: false, footer: false, live: true, boot: true, h1LiveLab: true },
  },
  { path: '/contact', name: 'contact', checks: { hero: false, footer: true, live: false } },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 720 },
  { name: 'mobile', width: 375, height: 812 },
];

const run = async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const report = [];

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    for (const route of ROUTES) {
      await page.goto(`${WEB}${route.path}`, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(600);

      const h1 = await page.locator('h1').first().textContent();
      const header = await page.locator('header').count();
      const footer = await page.locator('footer').count();
      const live = await page.getByLabel(/live channel|canal live/i).count();
      const boot = await page.getByText(
        /transport status|status do transporte|initializing transport|inicializando transporte/i
      ).count();
      const heroName = await page.getByText(/vinicius datti/i).first().isVisible();
      const navHome = await page.getByRole('link', { name: /^home$|^início$/i }).count();
      const presence = await page.getByText(/live lab →|channel on demand|canal sob demanda/i).count();
      const liveLabMock = await page.getByText(/event log|log de eventos/i).count();
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth > doc.clientWidth + 2;
      });

      const shot = `${OUT_DIR}/${vp.name}-${route.name}.png`;
      await page.screenshot({ path: shot, fullPage: route.path === '/' });

      const checks = route.checks;
      const h1LiveLab =
        route.path === '/live-lab'
          ? /live lab/i.test(h1 ?? '')
          : true;
      const ok =
        header > 0 &&
        (checks.footer ? footer > 0 : footer === 0) &&
        (checks.live ? live > 0 : live === 0) &&
        (checks.boot ? boot > 0 : boot === 0) &&
        (checks.hero ? heroName : true) &&
        (checks.h1LiveLab ? h1LiveLab : true) &&
        (route.path === '/' ? liveLabMock > 0 : true) &&
        !overflow;

      report.push({
        viewport: vp.name,
        route: route.path,
        ok,
        h1: h1?.trim().slice(0, 60),
        header,
        footer,
        live,
        boot,
        navHome,
        presence: route.path === '/' ? presence > 0 : null,
        liveLabMock: route.path === '/' ? liveLabMock > 0 : null,
        overflow,
        screenshot: shot,
        consoleErrors: errors.length,
      });
    }
    await page.close();
  }

  await browser.close();

  console.log('\n=== Visual inspection report ===\n');
  for (const row of report) {
    console.log(
      `${row.ok ? '✓' : '✗'} [${row.viewport}] ${row.route} | h1="${row.h1}" footer=${row.footer} live=${row.live} boot=${row.boot} presence=${row.presence} → ${row.screenshot}`
    );
  }

  const failed = report.filter((r) => !r.ok);
  if (failed.length) {
    console.log(`\n${failed.length} checks failed.`);
    process.exit(1);
  }
  console.log('\nAll visual checks passed.');
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
