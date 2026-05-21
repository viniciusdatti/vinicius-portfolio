/**
 * Responsive layout audit — alignment, overflow, horizontal drift.
 * Usage: yarn qa:responsive
 */
import { chromium } from 'playwright';
import fs from 'fs';

const WEB = process.env.WEB_URL ?? 'http://localhost:5173';
const OUT_DIR = 'scripts/responsive-audit';

const ROUTES = ['/', '/about', '/skills', '/projects', '/live-lab', '/contact'];
const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 720 },
];

const run = async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const issues = [];

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

    for (const route of ROUTES) {
      await page.goto(`${WEB}${route}`, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(500);

      const metrics = await page.evaluate(() => {
        const main = document.getElementById('main-content');
        const doc = document.documentElement;
        const offCenter = [];
        if (!main) {
          return { overflow: false, offCenter: ['no #main-content'] };
        }
        const mainRect = main.getBoundingClientRect();
        const selectors = [
          'section',
          'header',
          'footer',
          '[class*="PageContainer"]',
          'h1',
          'h2',
        ];
        const seen = new Set();
        document.querySelectorAll(selectors.join(',')).forEach((el) => {
          if (seen.has(el) || !main.contains(el)) return;
          seen.add(el);
          const r = el.getBoundingClientRect();
          if (r.width < 40) return;
          const leftGap = r.left - mainRect.left;
          const rightGap = mainRect.right - r.right;
          const drift = Math.abs(leftGap - rightGap);
          if (drift > 24 && r.width > mainRect.width * 0.5) {
            const tag = `${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).split(' ')[0] : ''}`;
            offCenter.push({ tag, drift: Math.round(drift), leftGap: Math.round(leftGap), rightGap: Math.round(rightGap) });
          }
        });
        return {
          overflow: doc.scrollWidth > doc.clientWidth + 2,
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
          offCenter: offCenter.slice(0, 5),
        };
      });

      const shot = `${OUT_DIR}/${vp.name}-${route.replace(/\//g, '_') || 'home'}.png`;
      await page.screenshot({ path: shot, fullPage: route !== '/live-lab' });

      if (metrics.overflow || metrics.offCenter.length > 0) {
        issues.push({ vp: vp.name, route, ...metrics, shot });
      }
    }
    await page.close();
  }

  await browser.close();

  console.log('\n=== Responsive audit ===\n');
  if (issues.length === 0) {
    console.log('No drift/overflow issues detected.');
    return;
  }
  for (const i of issues) {
    console.log(`[${i.vp}] ${i.route} overflow=${i.overflow} (${i.scrollWidth}/${i.clientWidth})`);
    i.offCenter.forEach((o) => console.log(`  drift ${o.drift}px: ${o.tag} L${o.leftGap} R${o.rightGap}`));
    console.log(`  → ${i.shot}`);
  }
  process.exit(1);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
