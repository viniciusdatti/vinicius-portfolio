import { chromium } from 'playwright';

const WEB = process.env.WEB_URL ?? 'http://127.0.0.1:5173';

const snapshot = async (page, label) => {
  const diag = await page.evaluate(() => ({
    path: location.pathname,
    layers: document.querySelectorAll('#main-content > div').length,
    h1: document.querySelector('#main-content h1')?.textContent?.trim().slice(0, 40) ?? null,
    hasExperience: document.body.innerText.includes('Front-end em produção')
      || document.body.innerText.includes('Production front-end'),
    mainTextLen: document.querySelector('#main-content')?.innerText?.length ?? 0,
  }));
  console.log(label, JSON.stringify(diag));
  return diag;
};

const run = async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  let passed = 0;
  let failed = 0;

  const assert = (name, ok) => {
    if (ok) {
      passed += 1;
      console.log(`PASS: ${name}`);
    } else {
      failed += 1;
      console.log(`FAIL: ${name}`);
    }
  };

  await page.goto(`${WEB}/`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);

  // 1) Navbar click
  await page.getByRole('navigation').getByRole('link', { name: 'Competências' }).click();
  await page.waitForTimeout(800);
  let diag = await snapshot(page, 'navbar click +800ms');
  assert('navbar: URL is /skills', diag.path === '/skills');
  assert('navbar: not stuck on home hero', !diag.h1?.includes('Desenvolvo interfaces'));

  await page.waitForTimeout(1200);
  diag = await snapshot(page, 'navbar click +2000ms');
  assert('navbar: Competências title within 2s', diag.h1 === 'Competências');
  assert('navbar: experience section visible', diag.hasExperience);
  assert('navbar: main has content', diag.mainTextLen > 500);

  // 2) Navigate away and back via navbar
  await page.getByRole('navigation').getByRole('link', { name: 'Início' }).click();
  await page.waitForTimeout(600);
  await page.getByRole('navigation').getByRole('link', { name: 'Competências' }).click();
  await page.waitForTimeout(1000);
  diag = await snapshot(page, 'second navbar nav +1000ms');
  assert('second nav: Competências title', diag.h1 === 'Competências');

  // 3) Simulate tab hidden then visible (paused animation scenario)
  await page.getByRole('navigation').getByRole('link', { name: 'Trabalhos' }).click();
  await page.waitForTimeout(200);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.getByRole('navigation').getByRole('link', { name: 'Competências' }).click();
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.waitForTimeout(1200);
  diag = await snapshot(page, 'after tab hide/show nav +1200ms');
  assert('tab visibility: still on /skills', diag.path === '/skills');
  assert('tab visibility: Competências renders', diag.h1 === 'Competências');

  // 4) Prefetch path: hover then click
  await page.goto(`${WEB}/`, { waitUntil: 'networkidle', timeout: 60000 });
  const skillsLink = page.getByRole('navigation').getByRole('link', { name: 'Competências' });
  await skillsLink.hover();
  await page.waitForTimeout(300);
  await skillsLink.click();
  await page.waitForTimeout(1500);
  diag = await snapshot(page, 'hover prefetch +1500ms');
  assert('prefetch: Competências renders', diag.h1 === 'Competências');

  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  if (errors.length > 0) {
    console.log('Console errors:', errors.slice(0, 5));
  }

  await browser.close();
  process.exit(failed > 0 ? 1 : 0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
