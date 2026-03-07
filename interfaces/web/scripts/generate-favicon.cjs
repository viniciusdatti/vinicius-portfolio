/**
 * Generates square, center-cropped favicon and apple-touch-icon from avatar.png.
 * Prevents deformation in the browser tab by using equal width/height and fit: cover.
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

  await sharp(avatarPath)
    .resize(32, 32, squareOptions)
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  await sharp(avatarPath)
    .resize(180, 180, squareOptions)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  console.log('Generated public/favicon.png (32x32) and public/apple-touch-icon.png (180x180)');
}

run().catch((err) => {
  console.error('generate-favicon failed:', err);
  process.exit(1);
});
