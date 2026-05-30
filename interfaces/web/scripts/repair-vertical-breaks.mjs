/**
 * Repairs over-expanded intrinsic JSX and styled-components destructuring.
 *
 * Usage: node scripts/repair-vertical-breaks.mjs [--write]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const WEB_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_ROOT = path.join(WEB_ROOT, 'src');
const WRITE = process.argv.includes('--write');
const MAX_LINE = 100;

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

const isInsideTemplateExpression = (node) => {
  let current = node.parent;
  while (current !== undefined) {
    if (ts.isTemplateExpression(current) || ts.isTemplateSpan(current)) {
      return true;
    }
    current = current.parent;
  }
  return false;
};

const isIntrinsicJsxTag = (tagName) => {
  if (ts.isIdentifier(tagName)) {
    return tagName.text === tagName.text.toLowerCase();
  }
  return false;
};

const collectReplacements = (sourceFile) => {
  /** @type {{ start: number; end: number; text: string }[]} */
  const replacements = [];

  const pushReplacement = (node, text) => {
    replacements.push({
      start: node.getStart(sourceFile),
      end: node.getEnd(),
      text,
    });
  };

  const collapseIntrinsicJsxAttributes = (attributes) => {
    if (attributes === undefined || isSingleLineNode(attributes, sourceFile)) {
      return;
    }

    const properties = attributes.properties.filter((property) => (
      ts.isJsxAttribute(property) || ts.isJsxSpreadAttribute(property)
    ));

    if (properties.length === 0) {
      return;
    }

    const inline = properties.map((property) => property.getText(sourceFile)).join(' ');
    pushReplacement(attributes, ` ${inline}`);
  };

  const collapseTemplateBindingPattern = (pattern) => {
    if (!isInsideTemplateExpression(pattern) || isSingleLineNode(pattern, sourceFile)) {
      return;
    }

    const inline = pattern.elements
      .map((element) => element.getText(sourceFile))
      .join(', ');
    pushReplacement(pattern, `{ ${inline} }`);
  };

  const isSingleLineNode = (node, sf) => !node.getText(sf).includes('\n');

  const visit = (node) => {
    if (ts.isJsxSelfClosingElement(node) && isIntrinsicJsxTag(node.tagName)) {
      collapseIntrinsicJsxAttributes(node.attributes);
    }

    if (ts.isJsxOpeningElement(node) && isIntrinsicJsxTag(node.tagName)) {
      collapseIntrinsicJsxAttributes(node.attributes);
    }

    if (ts.isObjectBindingPattern(node)) {
      collapseTemplateBindingPattern(node);
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return replacements;
};

const applyReplacements = (content, replacements) => {
  const sorted = [...replacements].sort((left, right) => right.start - left.start);
  let next = content;
  for (const replacement of sorted) {
    next = `${next.slice(0, replacement.start)}${replacement.text}${next.slice(replacement.end)}`;
  }
  return next;
};

const repairFile = (filePath, content) => {
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

  const replacements = collectReplacements(sourceFile);
  if (replacements.length === 0) {
    return null;
  }

  const next = applyReplacements(content, replacements);
  return next === content ? null : next;
};

let changedFiles = 0;

for (const filePath of walk(SRC_ROOT)) {
  const original = fs.readFileSync(filePath, 'utf8');
  const next = repairFile(filePath, original);
  if (next === null) {
    continue;
  }
  changedFiles += 1;
  if (WRITE) {
    fs.writeFileSync(filePath, next);
  } else {
    console.log(path.relative(WEB_ROOT, filePath));
  }
}

if (!WRITE) {
  console.log(`Would repair ${changedFiles} file(s). Re-run with --write to apply.`);
} else {
  console.log(`Repaired ${changedFiles} file(s).`);
}
