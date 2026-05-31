/**
 * Captures the Live Lab telemetry dashboard (crop-only, no site chrome) and
 * builds a GitHub-safe animated GIF (native autoplay, no video transcode).
 *
 * GitHub transcodes GIFs above ~5 MB into MP4 with play controls. This script
 * targets 3–4.9 MB while preserving dashboard crop and visual quality.
 *
 * Requires: yarn dev:api && yarn dev:web
 * Usage: yarn capture:live-lab-gif (from interfaces/web)
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gifenc from 'gifenc';
import sharp from 'sharp';

const { GIFEncoder, quantize, applyPalette } = gifenc;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../../..');
const WEB = process.env.WEB_URL ?? 'http://127.0.0.1:5173';
const OUTPUT_DIR = path.join(REPO_ROOT, 'assets');
const OUTPUT_GIF = path.join(OUTPUT_DIR, 'live-lab-demo.gif');
const PROFILE_REPO = process.env.PROFILE_REPO ?? path.resolve(REPO_ROOT, '..', 'viniciusdatti');
const PROFILE_GIF = path.join(PROFILE_REPO, 'assets', 'live-lab-demo.gif');

const VIEWPORT = { width: 1440, height: 900 };
const DURATION_SEC = 7;
const GIF_WIDTH = 1280;
const LOCALE = process.env.CAPTURE_LOCALE ?? 'en-US';
const LOCALE_BCP47 = LOCALE === 'pt-BR' ? 'pt-BR' : 'en-US';
const LOCALE_READY_TEXT = LOCALE === 'pt-BR' ? 'Canais simulados' : 'Simulated channels';
const DASHBOARD_SELECTOR = '[data-testid="telemetry-dashboard"]';

/** GitHub renders GIFs natively below ~4.5 MB; larger files become video players. */
const GITHUB_NATIVE_GIF_MAX_BYTES = Math.floor(4.45 * 1024 * 1024);
const TARGET_MIN_BYTES = 3 * 1024 * 1024;

const ENCODE_ATTEMPTS = [
  { fps: 12, palette: 256 },
  { fps: 11, palette: 256 },
  { fps: 10, palette: 256 },
  { fps: 10, palette: 224 },
  { fps: 9, palette: 224 },
  { fps: 9, palette: 192 },
  { fps: 8, palette: 192 },
];

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const detectFileKind = (buffer) => {
  if (buffer.length >= 6) {
    const head = buffer.subarray(0, 6).toString('ascii');
    if (head === 'GIF87a' || head === 'GIF89a') return 'gif';
  }
  if (buffer.length >= 12) {
    const ftyp = buffer.subarray(4, 8).toString('ascii');
    if (ftyp === 'ftyp') return 'mp4';
  }
  if (buffer.length >= 4 && buffer[0] === 0x1A && buffer[1] === 0x45) return 'webm';
  return 'unknown';
};

const waitForLiveLabReady = async (page) => {
  await page.goto(`${WEB}/live-lab`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector(DASHBOARD_SELECTOR, { timeout: 30000 });

  await page.waitForFunction(
    (readyText) => document.body.textContent?.includes(readyText) ?? false,
    LOCALE_READY_TEXT,
    { timeout: 15000 },
  );

  await page.waitForFunction(
    () => {
      const boot = document.querySelector('[aria-label*="telemetry transport"], [aria-label*="Transporte"]');
      return boot === null;
    },
    { timeout: 20000 },
  ).catch(async () => {
    await page.waitForTimeout(2000);
  });

  await page.waitForFunction(
    () => {
      const samples = document.body.textContent ?? '';
      const match = samples.match(/#(\d+)/);
      return match !== null && Number(match[1]) >= 10;
    },
    { timeout: 30000 },
  ).catch(async () => {
    await page.waitForTimeout(3000);
  });

  await page.waitForSelector('[data-testid="telemetry-trend-chart"]', { timeout: 15000 });
  await page.waitForTimeout(600);
};

const captureFrames = async (page, fps) => {
  const dashboard = page.locator(DASHBOARD_SELECTOR);
  const frameCount = fps * DURATION_SEC;
  const frameDelayMs = Math.round(1000 / fps);
  const frames = [];

  for (let i = 0; i < frameCount; i += 1) {
    const buffer = await dashboard.screenshot({ type: 'png' });
    frames.push(buffer);
    await page.waitForTimeout(frameDelayMs);
  }

  return frames;
};

const pngToRgba = async (pngBuffer, targetHeight) => {
  const { data, info } = await sharp(pngBuffer)
    .resize(GIF_WIDTH, targetHeight, { fit: 'inside', withoutEnlargement: false })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return { rgba: new Uint8ClampedArray(data.buffer), width: info.width, height: info.height };
};

const subsampleFrames = (frameBuffers, sourceFps, targetFps) => {
  if (targetFps >= sourceFps) {
    return frameBuffers;
  }

  const step = sourceFps / targetFps;
  const sampled = [];

  for (let i = 0; i < frameBuffers.length; i += step) {
    sampled.push(frameBuffers[Math.floor(i)]);
  }

  return sampled;
};

const buildGif = async (frameBuffers, fps, paletteSize) => {
  const meta = await sharp(frameBuffers[0]).metadata();
  const aspectHeight = Math.round((meta.height / meta.width) * GIF_WIDTH);
  const gif = GIFEncoder();
  const delayCs = Math.round((100 / fps) * 10);

  for (const buffer of frameBuffers) {
    const { rgba, width, height } = await pngToRgba(buffer, aspectHeight);
    const palette = quantize(rgba, paletteSize, { format: 'rgba4444' });
    const index = applyPalette(rgba, palette, 'rgba4444');
    gif.writeFrame(index, width, height, { palette, delay: delayCs });
  }

  gif.finish();
  return {
    buffer: Buffer.from(gif.bytes()),
    height: aspectHeight,
    frameCount: frameBuffers.length,
    fps,
    paletteSize,
  };
};

const pickBestEncoding = async (frameBuffers, sourceFps) => {
  let bestUnderLimit = null;

  for (const attempt of ENCODE_ATTEMPTS) {
    const sampledFrames = subsampleFrames(frameBuffers, sourceFps, attempt.fps);
    const encoded = await buildGif(sampledFrames, attempt.fps, attempt.palette);
    const size = encoded.buffer.length;
    const kind = detectFileKind(encoded.buffer);

    console.log(
      `  try ${attempt.fps}fps · ${attempt.palette} colors → `
      + `${(size / (1024 * 1024)).toFixed(2)} MB (${kind})`,
    );

    if (kind !== 'gif') {
      continue;
    }

    if (size <= GITHUB_NATIVE_GIF_MAX_BYTES) {
      if (!bestUnderLimit || size > bestUnderLimit.buffer.length) {
        bestUnderLimit = encoded;
      }
    }
  }

  if (bestUnderLimit) {
    return bestUnderLimit;
  }

  throw new Error('Could not encode GIF under GitHub native autoplay size limit (4.95 MB)');
};

const copyToProfileRepo = (gifBuffer) => {
  if (!fs.existsSync(PROFILE_REPO)) {
    console.log(`ℹ Profile repo not found at ${PROFILE_REPO} — skipping copy`);
    return;
  }

  ensureDir(path.dirname(PROFILE_GIF));
  fs.writeFileSync(PROFILE_GIF, gifBuffer);
  console.log(`✓ Copied to ${PROFILE_GIF}`);
};

const run = async () => {
  ensureDir(OUTPUT_DIR);

  const previousBuffer = fs.existsSync(OUTPUT_GIF)
    ? fs.readFileSync(OUTPUT_GIF)
    : null;
  const previousKind = previousBuffer ? detectFileKind(previousBuffer) : 'missing';
  const previousSizeMb = previousBuffer
    ? (previousBuffer.length / (1024 * 1024)).toFixed(2)
    : 'n/a';

  console.log(`Previous asset: ${previousKind.toUpperCase()} · ${previousSizeMb} MB`);

  const apiRes = await fetch('http://127.0.0.1:8000/health').catch(() => null);
  if (!apiRes?.ok) {
    throw new Error('API not reachable at http://127.0.0.1:8000 — run yarn dev:api first');
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    colorScheme: 'dark',
    locale: LOCALE_BCP47,
  });

  await context.addInitScript((language) => {
    Object.defineProperty(navigator, 'language', { get: () => language });
    Object.defineProperty(navigator, 'languages', { get: () => [language] });
  }, LOCALE_BCP47);

  const page = await context.newPage();

  console.log(`Capture locale: ${LOCALE_BCP47}`);

  console.log('Navigating to Live Lab (dashboard crop only)…');
  await waitForLiveLabReady(page);

  const box = await page.locator(DASHBOARD_SELECTOR).boundingBox();
  if (!box) {
    throw new Error('Telemetry dashboard not visible for capture');
  }

  console.log(`Dashboard bounds: ${Math.round(box.width)}×${Math.round(box.height)}px`);
  console.log(`Capturing ${DURATION_SEC}s at up to 12fps…`);

  const sourceFps = 12;
  const frameBuffers = await captureFrames(page, sourceFps);
  await browser.close();

  console.log('Encoding GIF candidates for GitHub native autoplay…');
  const encoded = await pickBestEncoding(frameBuffers, sourceFps);
  const finalKind = detectFileKind(encoded.buffer);

  if (finalKind !== 'gif') {
    throw new Error(`Final asset is not GIF (detected: ${finalKind})`);
  }

  fs.writeFileSync(OUTPUT_GIF, encoded.buffer);
  copyToProfileRepo(encoded.buffer);

  const sizeMb = (encoded.buffer.length / (1024 * 1024)).toFixed(2);
  console.log(
    `✓ Final: ${finalKind.toUpperCase()} · ${sizeMb} MB · `
    + `${GIF_WIDTH}×${encoded.height} · ${encoded.fps}fps · `
    + `${encoded.frameCount} frames · ${encoded.paletteSize} colors`,
  );
  console.log('✓ GitHub native autoplay: expected (GIF < 4.95 MB, rendered via <img>)');
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
