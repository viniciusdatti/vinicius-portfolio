import fs from 'node:fs';
import path from 'node:path';

const themePath = path.resolve('src/styles/theme.ts');
const s = fs.readFileSync(themePath, 'utf8');
const i1 = s.indexOf('export interface ThemeColors');
const i2 = s.indexOf('const sharedTheme');
const i3 = s.indexOf('const darkEffects');
const i4 = s.indexOf('export const darkTheme');
const outDir = path.resolve('src/styles/theme');
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  path.join(outDir, 'types.ts'),
  '/* *************************************************************************************************\n * Theme type contracts\n ************************************************************************************************* */\n\n'
    + s.slice(i1, i2),
);

const sharedBody = s.slice(i2 + 'const sharedTheme = '.length, i3);
fs.writeFileSync(
  path.join(outDir, 'shared.ts'),
  '/* Shared tokens (mode-agnostic) */\n\nexport const sharedTheme = '
    + sharedBody,
);

fs.writeFileSync(path.join(outDir, 'effects.ts'), s.slice(i3, i4));

const header = `/* *************************************************************************************************
 * Theme — dark & light mode token values
 ************************************************************************************************* */

export * from './theme/types';
export type { Theme as ThemeType } from './theme/types';

import type { Theme } from './theme/types';
import { sharedTheme } from './theme/shared';
import { darkEffects, lightEffects } from './theme/effects';

`;

fs.writeFileSync(themePath, header + s.slice(i4));
console.log('Theme split complete.');
