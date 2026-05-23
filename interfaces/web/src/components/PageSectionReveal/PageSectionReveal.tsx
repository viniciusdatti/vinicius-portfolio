/**
 * @fileoverview Viewport-driven kinetic reveal shell for public pages (P0 motion contract).
 */

// Core
import React, { useMemo } from 'react';

// Hooks
import { useScrollMotion } from '@/hooks/useScrollMotion';

// Types
import {
  PageSectionRevealMode,
  type PageSectionRevealProps,
} from '@/components/PageSectionReveal/PageSectionReveal.types';

// Components
import { PageSectionRevealRoot } from '@/components/PageSectionReveal/PageSectionReveal.style';

// =================================================================================================
// ========================================== COMPONENT ============================================
// =================================================================================================

/**
 * Wraps page blocks with `whileInView` orchestration (`once`, amount 0.18).
 * Children in stagger modes should use `variants={item}` from `useScrollMotion`.
 */
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
