// Core
import type React from 'react';

export interface HomeSectionRevealProps {
  children: React.ReactNode;
  /** Stagger container — children should use `item` variants from `useScrollMotion`. */
  stagger?: boolean;
  className?: string;
  id?: string;
  'aria-label'?: string;
}
