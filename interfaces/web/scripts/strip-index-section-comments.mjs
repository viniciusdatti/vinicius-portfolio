import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(rootDir, '../src');

/** Section labels before exports/imports in index barrels — not used in index.ts. */
const SECTION_COMMENT = /^\/\/ [A-Za-z][A-Za-z0-9]*$/;

const walkIndexFiles = (dir, files = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkIndexFiles(fullPath, files);
      continue;
    }
    if (entry.name === 'index.ts') {
      files.push(fullPath);
    }
  }
  return files;
};

const stripSectionComments = (content) => {
  const lines = content.split(/\r?\n/);
  const filtered = lines.filter((line) => !SECTION_COMMENT.test(line.trim()));
  const normalized = filtered.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd();
  return normalized.length > 0 ? `${normalized}\n` : '\n';
};

const indexFiles = walkIndexFiles(srcDir);
let changed = 0;

for (const filePath of indexFiles) {
  const original = fs.readFileSync(filePath, 'utf8');
  const next = stripSectionComments(original);
  if (next !== original) {
    fs.writeFileSync(filePath, next, 'utf8');
    changed += 1;
  }
}

console.log(`Updated ${changed} index.ts file(s).`);
