/**
 * @fileoverview Viewport-driven scroll reveal shell for Home sections below the fold.
 */

// Core
import React from 'react';

// Hooks
import { useScrollMotion } from '@/hooks/useScrollMotion';

// Types
import type { HomeSectionRevealProps } from '@/components/Home/HomeSectionReveal/HomeSectionReveal.types';

// Components
import { HomeSectionRevealRoot } from '@/components/Home/HomeSectionReveal/HomeSectionReveal.style';

// =================================================================================================
// ========================================== COMPONENT ============================================
// =================================================================================================

/**
 * Wraps structural Home blocks with `whileInView` orchestration (once per mount, 12% viewport).
 * Use `stagger` when children carry `variants={item}` from `useScrollMotion`.
 */
export const HomeSectionReveal: React.FC<HomeSectionRevealProps> = ({
  children,
  stagger = false,
  className,
  id,
  'aria-label': ariaLabel,
}): React.ReactElement => {
  const { section, stagger: staggerVariants, viewport } = useScrollMotion();
  const variants = stagger ? staggerVariants : section;

  return (
    <HomeSectionRevealRoot
      id={id}
      className={className}
      aria-label={ariaLabel}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </HomeSectionRevealRoot>
  );
};
