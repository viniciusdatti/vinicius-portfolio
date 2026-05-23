/**
 * Align @/ import paths with git-tracked lowercase directory names (Linux case-sensitive FS).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcRoot = path.join(__dirname, '..', 'src');

const REPLACEMENTS = [
  ['@/components/Admin', '@/components/admin'],
  ['@/components/Atmosphere', '@/components/atmosphere'],
  ['@/components/Common', '@/components/common'],
  ['@/components/Home', '@/components/home'],
  ['@/components/Layout', '@/components/layout'],
  ['@/components/Motion', '@/components/motion'],
  ['@/components/Primitives', '@/components/primitives'],
  ['@/components/Showcase', '@/components/showcase'],
  ['@/components/Skills', '@/components/skills'],
  ['@/components/Workspace', '@/components/workspace'],
  ['@/pages/Admin', '@/pages/admin'],
  ['./pages/Admin', './pages/admin'],
];

const walk = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(fullPath);
    }
    if (/\.(ts|tsx)$/.test(entry.name)) {
      return [fullPath];
    }
    return [];
  });
};

const applyReplacements = (content) => {
  let next = content;
  REPLACEMENTS.forEach(([from, to]) => {
    next = next.split(from).join(to);
  });
  return next;
};

let changed = 0;
walk(srcRoot).forEach((filePath) => {
  const original = fs.readFileSync(filePath, 'utf8');
  const updated = applyReplacements(original);
  if (updated !== original) {
    fs.writeFileSync(filePath, updated, 'utf8');
    changed += 1;
  }
});

console.log(`Updated ${changed} files under src/`);
