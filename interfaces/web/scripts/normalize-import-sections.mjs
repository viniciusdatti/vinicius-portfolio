/**
 * Normalizes import blocks with fixed + dynamically derived section banners.
 *
 * Fixed: Core, Libraries, Api, Hooks, Layout, Components, Icons, Styles, Types
 * Dynamic: folder name of the imported module (e.g. // Store, // Utils, // Config)
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

const FIXED_SECTION_ORDER = [
  'Core',
  'Libraries',
  'Api',
  'Hooks',
  'Layout',
  'Components',
  'Icons',
  'Styles',
  'Types',
];

const FIXED_SECTION_SET = new Set(FIXED_SECTION_ORDER);

const CORE_PACKAGES = new Set(['react', 'react-dom']);

const STYLE_TOKEN_MODULES = new Set([
  'animations',
  'motionPresets',
  'surfaces',
  'sectionRhythm',
  'skeleton',
  'GlobalStyles',
  'theme',
]);

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

const normalizePath = (specifier) => specifier.replace(/\\/g, '/');

const isCoreSpecifier = (specifier) => (
  CORE_PACKAGES.has(specifier) || specifier.startsWith('react/')
);

const pathHasSegment = (specifier, segment) => {
  const normalized = normalizePath(specifier);
  return new RegExp(`(?:^|/)(?:\\.\\./)*(?:[^/]+/)*${segment}(?:/|$)`).test(normalized);
};

const basename = (specifier) => {
  const normalized = normalizePath(specifier);
  const parts = normalized.split('/');
  return parts[parts.length - 1] ?? normalized;
};

const capitalizeSection = (value) => {
  if (!value || value.length === 0) {
    return 'Components';
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const resolveSpecifierDirectory = (specifier, importerFilePath) => {
  const normalized = normalizePath(specifier);
  if (!normalized.startsWith('.')) {
    return null;
  }

  let resolved = path.dirname(importerFilePath);
  for (const segment of normalized.split('/')) {
    if (segment === '' || segment === '.') {
      continue;
    }
    if (segment === '..') {
      resolved = path.dirname(resolved);
      continue;
    }
    resolved = path.join(resolved, segment);
  }

  return path.dirname(resolved);
};

const deriveDynamicSection = (specifier, importerFilePath) => {
  const targetDir = resolveSpecifierDirectory(specifier, importerFilePath);
  if (targetDir === null) {
    return 'Components';
  }

  const folderName = path.basename(targetDir);
  if (folderName === 'src' || folderName === '.') {
    return 'Components';
  }

  return capitalizeSection(folderName);
};

const isLayoutModule = (specifier) => {
  const normalized = normalizePath(specifier);
  return (
    normalized.includes('pageLayout.style')
    || normalized.includes('/layout/')
    || normalized.includes('WorkspaceShell')
    || normalized.includes('SystemBar')
    || normalized.includes('PageSectionReveal')
    || normalized.includes('HomeSectionReveal')
  );
};

const isIconModule = (specifier) => {
  const normalized = normalizePath(specifier);
  const base = basename(normalized).replace(/\.[^.]+$/, '');
  if (normalized.includes('/icons/')) {
    return true;
  }
  if (/Icons$/.test(base)) {
    return true;
  }
  if (/^[A-Z][A-Za-z0-9]*Icon$/.test(base)) {
    return true;
  }
  return false;
};

const isStyleModule = (specifier) => {
  const normalized = normalizePath(specifier);
  if (isLayoutModule(specifier)) {
    return false;
  }
  const base = basename(normalized).replace(/\.(tsx?|jsx?)$/, '');
  if (STYLE_TOKEN_MODULES.has(base)) {
    return true;
  }
  return (
    normalized.includes('/styles/')
    || normalized.endsWith('.style')
    || /\.style(\.|$)/.test(normalized)
  );
};

const isTypesModule = (specifier) => {
  const normalized = normalizePath(specifier);
  if (normalized.endsWith('.types') || normalized.endsWith('.schema')) {
    return true;
  }
  return (
    pathHasSegment(normalized, 'types')
    || pathHasSegment(normalized, 'domain')
    || pathHasSegment(normalized, 'data')
  );
};

const classifySpecifier = (specifier, importerFilePath) => {
  if (!specifier.startsWith('.')) {
    return isCoreSpecifier(specifier) ? 'Core' : 'Libraries';
  }

  const normalized = normalizePath(specifier);

  if (pathHasSegment(normalized, 'api')) {
    return 'Api';
  }

  if (pathHasSegment(normalized, 'hooks')) {
    return 'Hooks';
  }

  if (isTypesModule(normalized)) {
    return 'Types';
  }

  if (isLayoutModule(normalized)) {
    return 'Layout';
  }

  if (isIconModule(normalized)) {
    return 'Icons';
  }

  if (isStyleModule(normalized)) {
    return 'Styles';
  }

  if (pathHasSegment(normalized, 'components')) {
    return 'Components';
  }

  return deriveDynamicSection(specifier, importerFilePath);
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

const SECTION_LINE = /^\/\/ [A-Za-z][A-Za-z0-9]*\s*$/;

const collectLeadingPreamble = (content, firstImportPos) => {
  const preamble = content.slice(0, firstImportPos);
  const lines = preamble.split('\n');
  const kept = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (SECTION_LINE.test(trimmed) || /^\/\/ --- .+ ---\s*$/.test(trimmed)) {
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

const collectTopImportNodes = (sourceFile) => {
  const nodes = [];
  for (const statement of sourceFile.statements) {
    if (isTopLevelImportOrExport(statement)) {
      nodes.push(statement);
      continue;
    }
    break;
  }
  return nodes;
};

const mergeBucketImports = (entries) => {
  const bySpecifier = new Map();
  const order = [];

  for (const entry of entries) {
    const sourceFile = ts.createSourceFile(
      'merge.ts',
      entry,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    const statement = sourceFile.statements[0];
    const specifier = getModuleSpecifier(sourceFile, statement);
    const key = specifier ?? entry;
    if (!bySpecifier.has(key)) {
      bySpecifier.set(key, []);
      order.push(key);
    }
    bySpecifier.get(key).push({ statement, sourceFile });
  }

  const merged = [];
  for (const key of order) {
    const statements = bySpecifier.get(key);
    if (statements.length === 1) {
      const { statement, sourceFile } = statements[0];
      merged.push(statement.getText(sourceFile).trimEnd());
      continue;
    }

    const importStatements = statements.filter(({ statement }) => ts.isImportDeclaration(statement));
    const exportStatements = statements.filter(
      ({ statement }) => ts.isExportDeclaration(statement) && statement.exportClause !== undefined,
    );

    if (importStatements.length > 1) {
      const spec = key;
      const defaultImport = importStatements.find(
        ({ statement }) => statement.importClause?.name !== undefined,
      );
      const namedSets = importStatements.flatMap(({ statement, sourceFile: sf }) => {
        const elements = statement.importClause?.namedBindings;
        if (elements === undefined) {
          return [];
        }
        if (ts.isNamespaceImport(elements)) {
          return [elements.name.text];
        }
        return elements.elements.map((el) => el.getText(sf));
      });
      const uniqueNamed = [...new Set(namedSets)];
      const parts = [];
      if (defaultImport?.statement.importClause?.name) {
        parts.push(defaultImport.statement.importClause.name.text);
      }
      if (uniqueNamed.length > 0) {
        parts.push(`{ ${uniqueNamed.join(', ')} }`);
      }
      merged.push(`import ${parts.join(', ')} from '${spec}';`);
      exportStatements.forEach(({ statement, sourceFile: sf }) => {
        merged.push(statement.getText(sf).trimEnd());
      });
      continue;
    }

    statements.forEach(({ statement, sourceFile: sf }) => {
      merged.push(statement.getText(sf).trimEnd());
    });
  }

  return merged.map((line) => (line.endsWith(';') ? line : `${line};`));
};

const buildImportsRegion = (buckets) => {
  const dynamicSections = [...buckets.keys()]
    .filter((section) => !FIXED_SECTION_SET.has(section))
    .sort((left, right) => left.localeCompare(right));

  const orderedSections = [
    ...FIXED_SECTION_ORDER.filter((section) => buckets.has(section)),
    ...dynamicSections,
  ];

  const chunks = [];
  for (const section of orderedSections) {
    const imports = buckets.get(section);
    if (imports === undefined || imports.length === 0) {
      continue;
    }
    const mergedImports = mergeBucketImports(imports);
    chunks.push(`// ${section}\n${mergedImports.join('\n')}`);
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

  const importNodes = collectTopImportNodes(sourceFile);
  if (importNodes.length === 0) {
    return null;
  }

  const firstImportPos = importNodes[0].getStart(sourceFile);
  const lastImportEnd = importNodes[importNodes.length - 1].getEnd();
  const tailStart = lastImportEnd;

  const buckets = new Map();
  for (const node of importNodes) {
    const specifier = getModuleSpecifier(sourceFile, node);
    const section = specifier === null
      ? 'Components'
      : classifySpecifier(specifier, filePath);
    const text = node.getText(sourceFile).trimEnd();
    const list = buckets.get(section) ?? [];
    list.push(text.endsWith(';') ? text : `${text};`);
    buckets.set(section, list);
  }

  const preamble = collectLeadingPreamble(content, firstImportPos);
  const importsRegion = buildImportsRegion(buckets);
  let tail = content.slice(tailStart).replace(/^\n+/, '');
  tail = tail.replace(/^(?:(?:\/\/ --- .+ ---|\/\/ [A-Za-z][A-Za-z0-9]*)\s*\n)+/m, '');

  const parts = [];
  if (preamble.length > 0) {
    parts.push(preamble);
  }
  parts.push(importsRegion.replace(/\n$/, ''));
  if (tail.length > 0) {
    parts.push(tail);
  }

  let next = `${parts.join('\n\n')}\n`;
  next = next.replace(/\n+$/, '\n');
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
