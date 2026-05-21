/**
 * Live Lab operational flow audit (dev server required).
 * Usage: yarn qa:workspace
 */
import { chromium } from 'playwright';

const WEB = process.env.WEB_URL ?? 'http://localhost:5173';

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const run = async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.goto(`${WEB}/live-lab`, { waitUntil: 'networkidle', timeout: 45000 });

  const bootVisible = await page.getByText(
    /transport status|status do transporte|initializing transport|inicializando transporte|channel live|canal live —/i
  ).count();
  assert(bootVisible > 0, 'Transport status strip missing on Live Lab');

  const liveChannel = await page.getByLabel(/live channel|canal live/i).count();
  assert(liveChannel > 0, 'Live channel surface missing');

  const eventLog = page.locator('aside[aria-label*="Event"], aside[aria-label*="event"]');
  const eventCountBefore = await eventLog.locator('li').count();
  assert(eventCountBefore >= 2, 'Event log should list transport events');

  const casesPanel = await page.getByText(/case modules|módulos de case/i).count();
  assert(casesPanel > 0, 'Cases module panel should be default on Live Lab');

  const rail = page.getByLabel(/live lab modules|módulos do live lab/i);
  await rail.getByRole('button', { name: /stack/i }).click();
  await page.waitForTimeout(700);
  const capabilitiesPanel = await page
    .getByText(
      /capability surface|superfície de competências|engineering stack|stack de engenharia|no capabilities|nenhuma competência|loading|carregando/i
    )
    .count();
  assert(capabilitiesPanel > 0, 'Rail should switch module in-place');
  await rail.getByRole('button', { name: /cases/i }).click();
  await page.waitForTimeout(250);

  const caseButtons = page.locator('ul button');
  const caseCount = await caseButtons.count();
  if (caseCount > 0) {
    await caseButtons.first().click();
    await page.waitForTimeout(400);
    const contextStrip = await page.getByText(/active case|case ativo/i).count();
    assert(contextStrip > 0, 'Context strip missing after case attach');
    const eventCountAfter = await eventLog.locator('li').count();
    assert(
      eventCountAfter > eventCountBefore,
      'Event log should grow after context attach'
    );
    console.log(`Context strip OK, events ${eventCountBefore}→${eventCountAfter}`);
  } else {
    console.log('No case buttons — skip context attach test');
  }

  const footer = await page.locator('footer').count();
  assert(footer === 0, 'Footer should be hidden on Live Lab');

  await page.screenshot({ path: 'scripts/audit-live-lab-recalibrated.png', fullPage: true });

  if (errors.length) {
    console.log('Console errors:', [...new Set(errors)].slice(0, 8));
    process.exit(1);
  }
  console.log('Live Lab flow audit OK');
  await browser.close();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
