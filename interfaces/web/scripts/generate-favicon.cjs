/**
 * Generates round (circular) favicon and apple-touch-icon from avatar.png.
 * Same visual as the About page: center-cropped circle with transparent background.
 * Run: yarn generate-favicon (or node scripts/generate-favicon.cjs)
 */

const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '..', 'public');
const avatarPath = path.join(publicDir, 'avatar.png');

if (!fs.existsSync(avatarPath)) {
  console.warn('scripts/generate-favicon: avatar.png not found in public/. Skipping.');
  process.exit(0);
}

function circleSvg(size) {
  const r = size / 2;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <circle cx="${r}" cy="${r}" r="${r}" fill="white"/>
    </svg>`
  );
}

async function run() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch {
    console.warn(
      'scripts/generate-favicon: sharp not installed. Run: yarn add -D sharp'
    );
    process.exit(1);
  }

  const squareOptions = { fit: 'cover', position: 'center' };

  async function writeRoundFavicon(size, outName) {
    const resized = await sharp(avatarPath)
      .resize(size, size, squareOptions)
      .png()
      .toBuffer();
    const mask = await sharp(circleSvg(size))
      .resize(size, size)
      .png()
      .toBuffer();
    await sharp(resized)
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toFile(path.join(publicDir, outName));
  }

  await writeRoundFavicon(32, 'favicon.png');
  await writeRoundFavicon(180, 'apple-touch-icon.png');

  console.log(
    'Generated round public/favicon.png (32x32) and public/apple-touch-icon.png (180x180)'
  );
}

run().catch((err) => {
  console.error('generate-favicon failed:', err);
  process.exit(1);
});
