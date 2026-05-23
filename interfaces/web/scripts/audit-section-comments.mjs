import fs from 'node:fs';
import path from 'node:path';

const WIDTH = 100;
const bad = [];

const walk = (dir) => {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory() && !['node_modules', 'dist'].includes(ent.name)) {
      walk(full);
    } else if (/\.(ts|tsx)$/.test(ent.name)) {
      const lines = fs.readFileSync(full, 'utf8').split(/\r?\n/);
      let index = 0;
      while (index < lines.length) {
        if (/^\/\* \*+$/.test(lines[index] ?? '')) {
          const block = [lines[index], lines[index + 1], lines[index + 2]];
          if (!block[2] || !/^ +\*+ \*\/$/.test(block[2])) {
            bad.push({ file: full, line: index + 1, reason: 'malformed block' });
            index += 1;
            continue;
          }
          block.forEach((line, offset) => {
            if (line.length !== WIDTH) {
              bad.push({ file: full, line: index + offset + 1, len: line.length });
            }
          });
          index += 3;
          continue;
        }
        index += 1;
      }
    }
  }
};

walk(path.join(process.cwd(), 'src'));
console.log(`Section blocks not ${WIDTH} chars: ${bad.length}`);
if (bad.length > 0) {
  console.log(bad.slice(0, 15));
}
