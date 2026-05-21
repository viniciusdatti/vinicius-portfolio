import { chromium } from 'playwright';

const WEB = process.env.WEB_URL ?? 'http://localhost:5173';

const run = async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  for (const route of ['/', '/live-lab']) {
    await page.goto(`${WEB}${route}`, { waitUntil: 'networkidle', timeout: 30000 });
    const headers = await page.locator('header').count();
    const systemBars = await page.locator('[class*="SystemBarRoot"]').count();
    if (headers !== 1 || systemBars > 0) {
      throw new Error(`${route}: headers=${headers} systemBars=${systemBars}`);
    }
    console.log(`✓ ${route}: 1 header, 0 system bars`);
  }

  await page.goto(`${WEB}/`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'scripts/visual-audit/single-nav-home.png' });
  await page.goto(`${WEB}/live-lab`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'scripts/visual-audit/single-nav-live-lab.png' });

  await browser.close();
  console.log('Single nav check OK');
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
