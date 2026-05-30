import fs from 'node:fs';
import path from 'node:path';

const SRC_ROOT = path.resolve('src');

const IMPORT_SECTION_LABELS = new Set([
  'Core',
  'Libraries',
  'Types',
  'Theme',
  'Components',
  'Component',
  'Hooks',
  'Domain',
]);

const walkFiles = (dir, files = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules') {
        walkFiles(fullPath, files);
      }
      continue;
    }
    if (/\.(tsx?)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
};

const stripLeadingFileoverview = (content) => (
  content.replace(/^\/\*\*[\s\S]*?\*\/\s*\r?\n/, '')
);

const stripAsteriskSectionHeaders = (content) => {
  const blockPattern = /(?:^|\r?\n)\/\* \*+\r?\n [^\n]+\r?\n \*+ \*\/\r?\n/g;
  return content.replace(blockPattern, (match) => (match.startsWith('\n') ? '\n' : ''));
};

const stripImportSectionComments = (content) => {
  const lines = content.split(/\r?\n/);
  return lines.filter((line) => {
    const match = line.match(/^\/\/ ([A-Za-z]+)\s*$/);
    if (!match) {
      return true;
    }
    return !IMPORT_SECTION_LABELS.has(match[1]);
  }).join('\n');
};

const stripExportJSDocBlocks = (content) => (
  content.replace(/\r?\n\/\*\*[\s\S]*?\*\/\r?\n(?=\s*(export|const|interface|enum|type)\s)/g, '\n')
);

const normalizeImportType = (content) => {
  const lines = content.split(/\r?\n/);
  return lines.map((line) => {
    if (!line.startsWith('import ')) {
      return line;
    }
    let next = line;
    next = next.replace(/^import type (\{[^}]+\}) from (.+);$/, 'import $1 from $2;');
    next = next.replace(/^import type (\w+) from (.+);$/, 'import $1 from $2;');
    next = next.replace(/import \{\s*type /, 'import { ');
    next = next.replace(/,\s*type /g, ', ');
    return next;
  }).join('\n');
};

const collapseBlankLines = (content) => (
  content.replace(/\n{3,}/g, '\n\n').replace(/^\n+/, '')
);

const stripInlineJSDoc = (content) => (
  content.replace(/\s+\/\*\*[\s\S]*?\*\//g, '')
);

const stripStandaloneJSDocBlocks = (content) => (
  content.replace(/\n\/\*\*[\s\S]*?\*\/\n/g, '\n')
);

const cleanFile = (filePath) => {
  const original = fs.readFileSync(filePath, 'utf8');
  let content = original;
  content = stripLeadingFileoverview(content);
  content = stripAsteriskSectionHeaders(content);
  content = stripImportSectionComments(content);
  content = stripExportJSDocBlocks(content);
  content = stripStandaloneJSDocBlocks(content);
  content = stripInlineJSDoc(content);
  content = normalizeImportType(content);
  content = collapseBlankLines(content);
  if (content !== original) {
    fs.writeFileSync(filePath, content.endsWith('\n') ? content : `${content}\n`);
    return true;
  }
  return false;
};

const files = walkFiles(SRC_ROOT);
let changed = 0;

for (const filePath of files) {
  if (cleanFile(filePath)) {
    changed += 1;
  }
}

console.log(`Cleaned ${changed} of ${files.length} files.`);
