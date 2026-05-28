/**
 * Normalizes import section comments across src/.
 *
 * Section order: Core → Libraries → Store → Types → Config → Domain → Hooks → Components → Component
 *
 * Usage: node scripts/normalize-import-sections.mjs [--write]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const WEB_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_ROOT = path.join(WEB_ROOT, 'src');
const WRITE = process.argv.includes('--write');

const SECTION_ORDER = [
  'Core',
  'Libraries',
  'Store',
  'Types',
  'Config',
  'Domain',
  'Hooks',
  'Components',
  'Component',
];

const CORE_PACKAGES = new Set(['react', 'react-dom']);

const walk = (dir, out = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (/\.test\.tsx?$/.test(entry.name)) {
      continue;
    } else if (/\.tsx?$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
};

const isCoreSpecifier = (specifier) => (
  CORE_PACKAGES.has(specifier) || specifier.startsWith('react/')
);

const isRelativeLib = (specifier) => (
  /(?:^|\/)(?:\.\.\/)*lib(?:\/|$)/.test(specifier.replace(/\\/g, '/'))
);

const isTypesModule = (specifier) => {
  const normalized = specifier.replace(/\\/g, '/');
  if (normalized.endsWith('.types')) {
    return false;
  }
  return /(?:^|\/)(\.\.\/)*types(?:\/|$)/.test(normalized);
};

const pathSegment = (specifier, segment) => {
  const normalized = specifier.replace(/\\/g, '/');
  return new RegExp(`(?:^|/)(?:\\.\\./)*(?:[^/]+/)*${segment}(?:/|$)`).test(normalized);
};

const classifySpecifier = (specifier) => {
  if (!specifier.startsWith('.')) {
    return isCoreSpecifier(specifier) ? 'Core' : 'Libraries';
  }

  if (specifier.startsWith('./')) {
    return 'Component';
  }

  const normalized = specifier.replace(/\\/g, '/');

  if (isRelativeLib(normalized)) {
    return 'Libraries';
  }
  if (pathSegment(normalized, 'store')) {
    return 'Store';
  }
  if (pathSegment(normalized, 'domain')) {
    return 'Domain';
  }
  if (pathSegment(normalized, 'hooks')) {
    return 'Hooks';
  }
  if (pathSegment(normalized, 'config')) {
    return 'Config';
  }
  if (isTypesModule(normalized)) {
    return 'Types';
  }

  return 'Components';
};

const getModuleSpecifier = (sourceFile, node) => {
  if (!ts.isImportDeclaration(node) && !ts.isExportDeclaration(node)) {
    return null;
  }
  const clause = node.moduleSpecifier;
  if (clause === undefined || !ts.isStringLiteral(clause)) {
    return null;
  }
  return clause.text;
};

const isTopLevelImportOrExport = (node) => (
  (ts.isImportDeclaration(node) || ts.isExportDeclaration(node))
  && node.moduleSpecifier !== undefined
);

const SECTION_COMMENT = /^\/\/ (?:Core|Libraries|Store|Types|Config|Domain|Hooks|Components|Component|API|Style|Styles|Theme|View|Plugins)\s*$/;

const collectLeadingPreamble = (content, firstImportPos) => {
  const preamble = content.slice(0, firstImportPos);
  const lines = preamble.split('\n');
  const kept = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (SECTION_COMMENT.test(trimmed)) {
      continue;
    }
    if (
      trimmed.length === 0
      || trimmed.startsWith('/**')
      || trimmed.startsWith('*')
      || trimmed.startsWith('*/')
      || trimmed.startsWith('@fileoverview')
      || trimmed.startsWith('/*')
    ) {
      kept.push(line);
      continue;
    }
    if (trimmed.length > 0) {
      break;
    }
    kept.push(line);
  }
  return kept.join('\n').replace(/\n+$/, '');
};

const findBodyStart = (sourceFile) => {
  let bodyStart = sourceFile.end;
  const visit = (node) => {
    if (isTopLevelImportOrExport(node)) {
      return;
    }
    if (
      ts.isFunctionDeclaration(node)
      || ts.isClassDeclaration(node)
      || ts.isInterfaceDeclaration(node)
      || ts.isEnumDeclaration(node)
      || ts.isTypeAliasDeclaration(node)
      || (ts.isVariableStatement(node)
        && node.declarationList.declarations.some((decl) => {
          const name = decl.name;
          return ts.isIdentifier(name) && /^[A-Z]/.test(name.text) === false
            ? false
            : true;
        }))
    ) {
      if (node.getStart(sourceFile) < bodyStart) {
        bodyStart = node.getStart(sourceFile);
      }
      return;
    }
    if (ts.isVariableStatement(node)) {
      if (node.getStart(sourceFile) < bodyStart) {
        bodyStart = node.getStart(sourceFile);
      }
      return;
    }
    if (ts.isExportAssignment(node) || ts.isModuleDeclaration(node)) {
      if (node.getStart(sourceFile) < bodyStart) {
        bodyStart = node.getStart(sourceFile);
      }
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return bodyStart;
};

const buildImportsRegion = (buckets) => {
  const chunks = [];
  for (const section of SECTION_ORDER) {
    const imports = buckets.get(section);
    if (imports === undefined || imports.length === 0) {
      continue;
    }
    chunks.push(`// ${section}\n${imports.join('\n')}`);
  }
  return chunks.length > 0 ? `${chunks.join('\n\n')}\n` : '';
};

const normalizeFile = (filePath, content) => {
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

  const importNodes = [];
  for (const statement of sourceFile.statements) {
    if (isTopLevelImportOrExport(statement)) {
      importNodes.push(statement);
    }
  }

  if (importNodes.length === 0) {
    return null;
  }

  const firstImportPos = importNodes[0].getStart(sourceFile);
  const lastImportEnd = importNodes[importNodes.length - 1].getEnd();
  const bodyStart = findBodyStart(sourceFile);
  const tailStart = Math.max(lastImportEnd, bodyStart);

  const buckets = new Map();
  for (const node of importNodes) {
    const specifier = getModuleSpecifier(sourceFile, node);
    const section = specifier === null ? 'Components' : classifySpecifier(specifier);
    const text = node.getText(sourceFile).trimEnd();
    const list = buckets.get(section) ?? [];
    list.push(text.endsWith(';') ? text : `${text};`);
    buckets.set(section, list);
  }

  const preamble = collectLeadingPreamble(content, firstImportPos);
  const importsRegion = buildImportsRegion(buckets);
  let tail = content.slice(tailStart).replace(/^\n+/, '');
  tail = tail.replace(/^(?:\/\/ [A-Za-z]+\s*\n)+/m, '');

  const parts = [];
  if (preamble.length > 0) {
    parts.push(preamble);
  }
  parts.push(importsRegion.replace(/\n$/, ''));
  if (tail.length > 0) {
    parts.push(tail);
  }

  const next = `${parts.join('\n\n')}\n`;
  return next === content ? null : next;
};

let changedFiles = 0;

const shouldSkipFile = (filePath) => {
  const rel = path.relative(SRC_ROOT, filePath).replace(/\\/g, '/');
  if (rel === 'types/index.ts') {
    return true;
  }
  return false;
};

for (const filePath of walk(SRC_ROOT)) {
  if (shouldSkipFile(filePath)) {
    continue;
  }
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
