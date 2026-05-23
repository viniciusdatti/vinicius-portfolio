/**
 * Normalizes section divider comments to 100-char lines with centered labels.
 */
import fs from 'node:fs';
import path from 'node:path';

const WIDTH = 100;

const buildSectionBlock = (label) => {
  const text = label.trim().toUpperCase();
  const top = `/* ${'*'.repeat(WIDTH - 3)}`;
  const bottom = ` ${'*'.repeat(WIDTH - 4)} */`;

  const labelWithSpaces = ` ${text} `;
  const starsTotal = WIDTH - 1 - labelWithSpaces.length;
  const leftStars = Math.floor(starsTotal / 2);
  const rightStars = starsTotal - leftStars;
  const center = ` ${'*'.repeat(leftStars)}${labelWithSpaces}${'*'.repeat(rightStars)}`;

  if (top.length !== WIDTH || center.length !== WIDTH || bottom.length !== WIDTH) {
    throw new Error(
      `Width mismatch for "${text}": ${top.length}/${center.length}/${bottom.length}`,
    );
  }

  return `${top}\n${center}\n${bottom}`;
};

const isSectionTop = (line) => /^\/\* \*+$/.test(line.trimEnd());
const isSectionBottom = (line) => /^ +\*+ \*\/$/.test(line);

const extractLabel = (centerLine) => {
  const match = centerLine.match(/[A-Z][A-Z0-9 /]{1,}/);
  return match?.[0]?.trim() ?? 'SECTION';
};

const normalizeSource = (source) => {
  const lines = source.split(/\r?\n/);
  const out = [];
  let changed = false;
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const next = lines[index + 1];
    const after = lines[index + 2];

    if (line !== undefined && isSectionTop(line) && next !== undefined && after !== undefined && isSectionBottom(after)) {
      const label = extractLabel(next);
      const block = buildSectionBlock(label).split('\n');
      out.push(...block);
      changed = true;
      index += 3;
      continue;
    }

    out.push(line);
    index += 1;
  }

  return { text: out.join('\n'), changed };
};

const normalizeFile = (filePath) => {
  const source = fs.readFileSync(filePath, 'utf8');
  const { text, changed } = normalizeSource(source);
  if (changed) {
    fs.writeFileSync(filePath, text.endsWith('\n') || !source.includes('\n') ? text : `${text}\n`);
  }
  return changed;
};

const walk = (dir) => {
  const fixed = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory() && ent.name !== 'node_modules' && ent.name !== 'dist') {
      fixed.push(...walk(full));
    } else if (/\.(ts|tsx)$/.test(ent.name) && normalizeFile(full)) {
      fixed.push(full);
    }
  }
  return fixed;
};

const fixed = walk(path.join(process.cwd(), 'src'));
console.log(`Normalized ${fixed.length} files to ${WIDTH}-char section blocks.`);
