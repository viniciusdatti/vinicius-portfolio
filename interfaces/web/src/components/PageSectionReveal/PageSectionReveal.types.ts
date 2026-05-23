// Core
import type React from 'react';

export enum PageSectionRevealMode {
  Section = 'section',
  Stagger = 'stagger',
  Depth = 'depth',
  RowStagger = 'row_stagger',
}

export interface PageSectionRevealProps {
  children: React.ReactNode;
  /** Kinetic contract variant — default section reveal. */
  mode?: PageSectionRevealMode;
  className?: string;
  id?: string;
  'aria-label'?: string;
}
