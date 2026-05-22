/** Fixed-width section dividers for source files (100 columns, centered label). */

export const SECTION_COMMENT_WIDTH = 100 as const;

const PREFIX = '// ';

/**
 * Builds the three-line section header block.
 * @param label - Section name (uppercased); max length ~90 characters.
 */
export const formatSectionHeader = (label: string): string => {
  const normalized = label.trim().toUpperCase();
  const border = `${PREFIX}${'='.repeat(SECTION_COMMENT_WIDTH - PREFIX.length)}`;
  const innerWidth = SECTION_COMMENT_WIDTH - PREFIX.length;
  const text = ` ${normalized} `;

  if (text.length > innerWidth) {
    throw new Error(`Section label "${label}" exceeds ${innerWidth - 2} characters.`);
  }

  const pad = innerWidth - text.length;
  const left = Math.floor(pad / 2);
  const right = pad - left;
  const middle = `${PREFIX}${'='.repeat(left)}${text}${'='.repeat(right)}`;

  return `${border}\n${middle}\n${border}`;
};

/** Pre-built headers for common regions (copy into files or codegen). */
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
