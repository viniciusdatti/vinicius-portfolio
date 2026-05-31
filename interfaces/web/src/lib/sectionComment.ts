export const SECTION_COMMENT_WIDTH = 100 as const;

const PREFIX = '// ';

export const formatAsteriskSectionHeader = (label: string): string => {
  const normalized: string = label.trim().toUpperCase();
  const line1: string = `/* ${'*'.repeat(SECTION_COMMENT_WIDTH - 3)}`;
  const text: string = ` ${normalized} `;
  const line2Width: number = SECTION_COMMENT_WIDTH - 1;

  if (text.length > line2Width) {
    throw new Error(`Section label "${label}" exceeds ${line2Width - 2} characters.`);
  }

  const pad: number = line2Width - text.length;
  const left: number = Math.floor(pad / 2);
  const right: number = pad - left;
  const line2: string = ` ${'*'.repeat(left)}${text}${'*'.repeat(right)}`;
  const line3Suffix: string = ' */';
  const line3: string = ` ${'*'.repeat(SECTION_COMMENT_WIDTH - 1 - line3Suffix.length)}${line3Suffix}`;

  return `${line1}\n${line2}\n${line3}`;
};

export const formatSectionHeader = (label: string): string => {
  const normalized: string = label.trim().toUpperCase();
  const border: string = `${PREFIX}${'='.repeat(SECTION_COMMENT_WIDTH - PREFIX.length)}`;
  const innerWidth: number = SECTION_COMMENT_WIDTH - PREFIX.length;
  const text: string = ` ${normalized} `;

  if (text.length > innerWidth) {
    throw new Error(`Section label "${label}" exceeds ${innerWidth - 2} characters.`);
  }

  const pad: number = innerWidth - text.length;
  const left: number = Math.floor(pad / 2);
  const right: number = pad - left;
  const middle: string = `${PREFIX}${'='.repeat(left)}${text}${'='.repeat(right)}`;

  return `${border}\n${middle}\n${border}`;
};

export const ASTERISK_SECTION = {
  imports: formatAsteriskSectionHeader('IMPORTS'),
  enums: formatAsteriskSectionHeader('ENUMS'),
  types: formatAsteriskSectionHeader('TYPES'),
  constants: formatAsteriskSectionHeader('CONSTANTS'),
  methods: formatAsteriskSectionHeader('METHODS'),
  styles: formatAsteriskSectionHeader('STYLES'),
  componentHandling: formatAsteriskSectionHeader('COMPONENT HANDLING'),
  hooks: formatAsteriskSectionHeader('HOOKS'),
  exports: formatAsteriskSectionHeader('EXPORTS'),
  store: formatAsteriskSectionHeader('STORE'),
  config: formatAsteriskSectionHeader('CONFIG'),
} as const;

export const SECTION = {
  types: formatSectionHeader('TYPES'),
  constants: formatSectionHeader('CONSTANTS'),
  styles: formatSectionHeader('STYLES'),
  methods: formatSectionHeader('METHODS'),
  component: formatSectionHeader('COMPONENT'),
  hooks: formatSectionHeader('HOOKS'),
  exports: formatSectionHeader('EXPORTS'),
  imports: formatSectionHeader('IMPORTS'),
  store: formatSectionHeader('STORE'),
  config: formatSectionHeader('CONFIG'),
} as const;
