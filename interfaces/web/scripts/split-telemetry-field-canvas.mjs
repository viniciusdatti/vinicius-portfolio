import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.join(rootDir, '../src/lib/telemetryFieldCanvas.ts');
const dir = path.join(rootDir, '../src/lib/telemetryFieldCanvas');

const src = fs.readFileSync(srcPath, 'utf8');
fs.mkdirSync(dir, { recursive: true });

const types = src.slice(0, src.indexOf('const VOID_COLS'));
fs.writeFileSync(path.join(dir, 'telemetryFieldCanvas.types.ts'), `${types.trim()}\n`);

const constantsBlock = src.slice(
  src.indexOf('const VOID_COLS'),
  src.indexOf('const resolveGridDensity'),
);
const constants = constantsBlock.replace(/^const /gm, 'export const ');
fs.writeFileSync(path.join(dir, 'telemetryFieldCanvas.constants.ts'), `${constants.trim()}\n`);

const helpersStart = src.indexOf('const resolveGridDensity');
const helpersEnd = src.indexOf('const drawVoidVectorCrosshairs');
let helpers = src.slice(helpersStart, helpersEnd);
helpers = helpers.replace(/^const resolveGridDensity/gm, 'export const resolveGridDensity');
helpers = helpers.replace(/^const resolveParticleCount/gm, 'export const resolveParticleCount');
helpers = helpers.replace(/^const isWorkVariant/gm, 'export const isWorkVariant');
helpers = [
  "import { TelemetryFieldVariant } from './telemetryFieldCanvas.types';",
  '',
  'import {',
  '  OBS_COLS,',
  '  OBS_ROWS,',
  '  PARTICLE_COUNT_OBS,',
  '  PARTICLE_COUNT_VOID,',
  '  VOID_COLS,',
  '  VOID_ROWS,',
  "} from './telemetryFieldCanvas.constants';",
  '',
  helpers.trim(),
].join('\n');
fs.writeFileSync(path.join(dir, 'telemetryFieldCanvas.helpers.ts'), `${helpers}\n`);

const drawersStart = src.indexOf('const drawVoidVectorCrosshairs');
const drawersEnd = src.indexOf('export const createConstellationNodes');
let drawers = src.slice(drawersStart, drawersEnd);
drawers = drawers.replace(/^const draw/gm, 'export const draw');
const drawersHeader = [
  '// Types',
  'import {',
  '  ConstellationNodeState,',
  '  TelemetryFieldColors,',
  '  TelemetryFieldPointer,',
  '  TelemetryFieldVariant,',
  "} from './telemetryFieldCanvas.types';",
  '',
  '// Constants',
  'import {',
  '  COBALT_MESH_CURSOR_RGBA,',
  '  COBALT_MESH_RGBA,',
  '  CONSTELLATION_CONNECT_RADIUS,',
  '  CONSTELLATION_CURSOR_RADIUS,',
  '  TOPOLOGICAL_MESH_COLS,',
  '  TOPOLOGICAL_MESH_ROWS,',
  "} from './telemetryFieldCanvas.constants';",
  '',
].join('\n');
fs.writeFileSync(
  path.join(dir, 'telemetryFieldCanvas.drawers.ts'),
  `${drawersHeader}${drawers.trim()}\n`,
);

const constellationStart = src.indexOf('export const createConstellationNodes');
const constellationEnd = src.indexOf('export const drawTelemetryField');
let constellationHelpers = src.slice(constellationStart, constellationEnd);
constellationHelpers = [
  'import {',
  '  ConstellationNodeState,',
  '  TelemetryFieldPointer,',
  "} from './telemetryFieldCanvas.types';",
  '',
  constellationHelpers.trim(),
].join('\n');
fs.appendFileSync(path.join(dir, 'telemetryFieldCanvas.helpers.ts'), `\n${constellationHelpers}\n`);

const renderStart = src.indexOf('export const drawTelemetryField');
let render = src.slice(renderStart);
render = [
  '// Types',
  'import {',
  '  TelemetryFieldDrawOptions,',
  '  TelemetryFieldVariant,',
  "} from './telemetryFieldCanvas.types';",
  '',
  '// Helpers',
  'import {',
  '  isWorkVariant,',
  '  resolveGridDensity,',
  '  resolveParticleCount,',
  "} from './telemetryFieldCanvas.helpers';",
  '',
  '// Drawers',
  'import {',
  '  drawConstellation,',
  '  drawLiveLabStream,',
  '  drawMonitorVectorMatrix,',
  '  drawProjectsWireframe,',
  '  drawTimelineField,',
  '  drawTopologicalMesh,',
  '  drawVoidVectorCrosshairs,',
  '  drawWorkPreview,',
  "} from './telemetryFieldCanvas.drawers';",
  '',
  render.trim(),
].join('\n');
fs.writeFileSync(path.join(dir, 'telemetryFieldCanvas.render.ts'), `${render}\n`);

const index = [
  '// Types',
  "export * from './telemetryFieldCanvas.types';",
  '',
  '// Helpers',
  'export {',
  '  createConstellationNodes,',
  '  stepConstellationNodes,',
  "} from './telemetryFieldCanvas.helpers';",
  '',
  '// Render',
  "export { drawTelemetryField } from './telemetryFieldCanvas.render';",
  '',
].join('\n');
fs.writeFileSync(path.join(dir, 'index.ts'), index);

fs.unlinkSync(srcPath);
console.log('telemetryFieldCanvas split complete');
