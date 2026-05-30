// Core
import React from 'react';

export enum PageSectionRevealMode {
  Section = 'section',
  Stagger = 'stagger',
  Depth = 'depth',
  RowStagger = 'row_stagger',
}

export interface PageSectionRevealProps {
  children: React.ReactNode;
  mode?: PageSectionRevealMode;
  className?: string;
  id?: string;
  'aria-label'?: string;
}
