/**
 * @fileoverview Viewport-driven kinetic reveal shell for public pages (P0 motion contract).
 */

// Core
import React, { useMemo } from 'react';

// Hooks
import { useScrollMotion } from '../../hooks/useScrollMotion';

// Component
import {
  PageSectionRevealMode,
  type PageSectionRevealProps,
} from './PageSectionReveal.types';
import { PageSectionRevealRoot } from './PageSectionReveal.style';

export const PageSectionReveal: React.FC<PageSectionRevealProps> = ({
  children,
  mode = PageSectionRevealMode.Section,
  className,
  id,
  'aria-label': ariaLabel,
}): React.ReactElement => {
  const {
    section,
    stagger,
    depth,
    rowStagger,
    viewport,
  } = useScrollMotion();

  const variants = useMemo(() => {
    if (mode === PageSectionRevealMode.Stagger) {
      return stagger;
    }
    if (mode === PageSectionRevealMode.Depth) {
      return depth;
    }
    if (mode === PageSectionRevealMode.RowStagger) {
      return rowStagger;
    }
    return section;
  }, [mode, section, stagger, depth, rowStagger]);

  return (
    <PageSectionRevealRoot
      id={id}
      className={className}
      aria-label={ariaLabel}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </PageSectionRevealRoot>
  );
};
