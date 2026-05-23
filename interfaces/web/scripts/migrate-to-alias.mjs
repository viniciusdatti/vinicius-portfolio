/**
 * One-off: rewrite relative imports under src/ to @/ alias.
 */
import fs from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('src');

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      walk(full, out);
    } else if (/\.(tsx?)$/.test(name) && !name.endsWith('.d.ts')) {
      out.push(full);
    }
  }
  return out;
}

function toAlias(filePath, spec) {
  if (!spec.startsWith('.')) return spec;
  const base = path.dirname(filePath);
  let resolved = path.normalize(path.join(base, spec));
  if (!resolved.startsWith(SRC)) return spec;
  let rel = path.relative(SRC, resolved).replace(/\\/g, '/');
  if (!rel.startsWith('.')) {
    return `@/${rel}`;
  }
  return spec;
}

const importRe = /from\s+(['"])(\.[^'"]+)\1/g;

for (const file of walk(SRC)) {
  let src = fs.readFileSync(file, 'utf8');
  let changed = false;
  src = src.replace(importRe, (_, quote, spec) => {
    const next = toAlias(file, spec);
    if (next !== spec) {
      changed = true;
      return `from ${quote}${next}${quote}`;
    }
    return `from ${quote}${spec}${quote}`;
  });
  if (changed) {
    fs.writeFileSync(file, src);
    console.log(path.relative(process.cwd(), file));
  }
}
