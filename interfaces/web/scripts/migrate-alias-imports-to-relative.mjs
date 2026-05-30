import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const WEB_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_ROOT = path.join(WEB_ROOT, 'src');

const SPECIFIER_RE = /(['"])@\/([^'"]+)\1/g;

const resolveTarget = (specifier) => {
  const base = path.join(SRC_ROOT, specifier.replace(/\//g, path.sep));
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    path.join(base, 'index.ts'),
    path.join(base, 'index.tsx'),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return base;
};

const toImportPath = (fromFile, specifier) => {
  const target = resolveTarget(specifier);
  const fromDir = path.dirname(fromFile);
  let rel = path.relative(fromDir, target);
  rel = rel.split(path.sep).join('/');
  rel = rel.replace(/\.(tsx?)$/, '');
  if (rel.endsWith('/index')) {
    rel = rel.slice(0, -6);
  }
  if (!rel.startsWith('.')) {
    rel = `./${rel}`;
  }
  return rel;
};

const walk = (dir, out = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (/\.tsx?$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
};

let fileCount = 0;

for (const filePath of walk(SRC_ROOT)) {
  const original = fs.readFileSync(filePath, 'utf8');
  const next = original.replace(SPECIFIER_RE, (match, quote, specifier) => {
    const rel = toImportPath(filePath, specifier);
    return `${quote}${rel}${quote}`;
  });
  if (next !== original) {
    fs.writeFileSync(filePath, next);
    fileCount += 1;
  }
}

console.log(String(fileCount));
