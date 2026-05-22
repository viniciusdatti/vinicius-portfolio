/**
 * Normalizes legacy section comment blocks to the 100-column centered format.
 * Usage: node scripts/normalize-section-comments.mjs [--write]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const WIDTH = 100;
const PREFIX = '// ';
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');
const WRITE = process.argv.includes('--write');

/** @param {string} label */
export function formatSectionHeader(label) {
  const normalized = label.trim().toUpperCase();
  const border = `${PREFIX}${'='.repeat(WIDTH - PREFIX.length)}`;
  const innerWidth = WIDTH - PREFIX.length;
  const text = ` ${normalized} `;
  const pad = innerWidth - text.length;
  const left = Math.floor(pad / 2);
  const right = pad - left;
  const middle = `${PREFIX}${'='.repeat(left)}${text}${'='.repeat(right)}`;
  return `${border}\n${middle}\n${border}`;
}

/** @param {string} content */
function normalizeContent(content) {
  let next = content;

  // Asterisk banners: /* ************** LABEL ************** */
  next = next.replace(
    /\/\*\s*\*+\s*([^*]+?)\s*\*+\s*\*\//g,
    (_, label) => formatSectionHeader(label.trim()),
  );

  // Broken triple blocks from partial migration
  next = next.replace(
    /\/\/ ={10,}\n\/\/ PLACEHOLDER_SECTION\n\/\/ ={10,}\n\/\/ [^\n]+\n\/\/ ={10,}\n\/\/ PLACEHOLDER_SECTION\n\/\/ ={10,}\n/g,
    '',
  );

  // Old // ============ ... ============ (single or double line)
  next = next.replace(
    /\/\/ ={10,}\s*\n\/\/\s*([^\n=]+?)\s*\n\/\/ ={10,}\s*\n/g,
    (_, label) => `${formatSectionHeader(label.trim())}\n`,
  );

  // Plain middle line without borders: // Fade Animations
  next = next.replace(
    /^\/\/ ([A-Za-z][\w\s()-]+)$/gm,
    (line, label) => {
      if (label.length > 60 || label.includes('http')) return line;
      if (/^(Core|Libraries|Types|Hooks|Components|View|Store|Config)$/i.test(label)) {
        return line;
      }
      const header = formatSectionHeader(label);
      if (line === header.split('\n')[1]) return line;
      return header;
    },
  );

  // Duplicate consecutive 3-line headers (keep first)
  const headerLine = PREFIX + '='.repeat(WIDTH - PREFIX.length);
  const dup = new RegExp(
    `(${headerLine.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n[^\\n]+\\n${headerLine.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n){2,}`,
    'g',
  );
  next = next.replace(dup, (m) => m.split('\n').slice(0, 3).join('\n') + '\n');

  return next;
}

/** @param {string} dir */
function walk(dir) {
  /** @type {string[]} */
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (/\.(ts|tsx)$/.test(entry.name)) files.push(full);
  }
  return files;
}

const isMain = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  let changed = 0;
  for (const file of walk(ROOT)) {
    if (file.includes('sectionComment.ts')) continue;
    const before = fs.readFileSync(file, 'utf8');
    const after = normalizeContent(before);
    if (after !== before) {
      changed += 1;
      if (WRITE) fs.writeFileSync(file, after);
    }
  }

  console.log(
    WRITE
      ? `Updated ${changed} files.`
      : `Would update ${changed} files (dry-run). Pass --write to apply.`,
  );
}
