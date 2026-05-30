/**
 * Breaks dense single-line imports, exports, and destructuring
 * into vertical lists when they contain 3 or more elements (project standard).
 *
 * Usage: node scripts/normalize-vertical-breaks.mjs [--write]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const WEB_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_ROOT = path.join(WEB_ROOT, 'src');
const WRITE = process.argv.includes('--write');
const MIN_ELEMENTS = 3;

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

const collectTargetFiles = () => {
  const files = walk(SRC_ROOT);
  for (const configFile of ['vite.config.ts', 'vitest.config.ts']) {
    const full = path.join(WEB_ROOT, configFile);
    if (fs.existsSync(full)) {
      files.push(full);
    }
  }
  return files;
};

const getLineIndent = (sourceFile, position) => {
  const { line } = sourceFile.getLineAndCharacterOfPosition(position);
  const lines = sourceFile.getFullText().split(/\r?\n/);
  const lineText = lines[line] ?? '';
  const match = lineText.match(/^(\s*)/);
  return match ? match[1] : '';
};

const isSingleLineNode = (node, sourceFile) => !node.getText(sourceFile).includes('\n');

const formatNamedElementsBlock = (elements, sourceFile, innerIndent) => {
  const lines = elements.map((element) => `${innerIndent}${element.getText(sourceFile)},`);
  const closingIndent = innerIndent.slice(0, Math.max(0, innerIndent.length - 2));
  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

const endsWithSemicolon = (node, sourceFile) => (
  node.getText(sourceFile).trimEnd().endsWith(';')
);

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

  const formatNamedExports = (node, namedExports) => {
    const elements = namedExports.elements;
    if (elements.length < MIN_ELEMENTS || !isSingleLineNode(namedExports, sourceFile)) {
      return;
    }

    const baseIndent = getLineIndent(sourceFile, node.getStart(sourceFile));
    const innerIndent = `${baseIndent}  `;
    const block = formatNamedElementsBlock(elements, sourceFile, innerIndent);
    const moduleSpec = node.moduleSpecifier?.getText(sourceFile);
    const fromClause = moduleSpec ? ` from ${moduleSpec}` : '';
    let text = `export ${block}${fromClause}`;
    if (endsWithSemicolon(node, sourceFile)) {
      text += ';';
    }
    pushReplacement(node, text);
  };

  const formatImportDeclaration = (node) => {
    const clause = node.importClause;
    if (clause === undefined) {
      return;
    }

    const namedBindings = clause.namedBindings;
    if (namedBindings === undefined || !ts.isNamedImports(namedBindings)) {
      return;
    }

    const elements = namedBindings.elements;
    if (elements.length < MIN_ELEMENTS || !isSingleLineNode(namedBindings, sourceFile)) {
      return;
    }

    const baseIndent = getLineIndent(sourceFile, node.getStart(sourceFile));
    const innerIndent = `${baseIndent}  `;
    const block = formatNamedElementsBlock(elements, sourceFile, innerIndent);

    let text = 'import ';
    if (clause.isTypeOnly) {
      text = 'import type ';
    }

    if (clause.name !== undefined) {
      text += `${clause.name.text}, `;
    }

    text += `${block} from ${node.moduleSpecifier.getText(sourceFile)}`;
    if (endsWithSemicolon(node, sourceFile)) {
      text += ';';
    }
    pushReplacement(node, text);
  };

  const formatObjectBindingPattern = (pattern) => {
    if (isInsideTemplateExpression(pattern)) {
      return;
    }

    const elements = pattern.elements;
    if (elements.length < MIN_ELEMENTS || !isSingleLineNode(pattern, sourceFile)) {
      return;
    }

    const baseIndent = getLineIndent(sourceFile, pattern.getStart(sourceFile));
    const innerIndent = `${baseIndent}  `;
    const block = formatNamedElementsBlock(elements, sourceFile, innerIndent);
    pushReplacement(pattern, block);
  };

  const visit = (node) => {
    if (ts.isImportDeclaration(node)) {
      formatImportDeclaration(node);
    }

    if (ts.isExportDeclaration(node) && node.exportClause !== undefined) {
      if (ts.isNamedExports(node.exportClause)) {
        formatNamedExports(node, node.exportClause);
      }
    }

    if (ts.isVariableDeclaration(node) && ts.isObjectBindingPattern(node.name)) {
      formatObjectBindingPattern(node.name);
    }

    if (ts.isParameter(node) && ts.isObjectBindingPattern(node.name)) {
      formatObjectBindingPattern(node.name);
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

const normalizeFile = (filePath, content) => {
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

for (const filePath of collectTargetFiles()) {
  const original = fs.readFileSync(filePath, 'utf8');
  const next = normalizeFile(filePath, original);
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
  console.log(`Would update ${changedFiles} file(s). Re-run with --write to apply.`);
} else {
  console.log(`Updated ${changedFiles} file(s).`);
}
