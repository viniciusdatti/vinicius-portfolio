/**
 * @fileoverview Viewport-driven scroll reveal shell for Home sections below the fold.
 */

// Core
import React from 'react';

// Hooks
import { useScrollMotion } from '../../../hooks/useScrollMotion';

// Component
import type { HomeSectionRevealProps } from './HomeSectionReveal.types';
import { HomeSectionRevealRoot } from './HomeSectionReveal.style';

export const HomeSectionReveal: React.FC<HomeSectionRevealProps> = ({
  children,
  stagger = false,
  className,
  id,
  'aria-label': ariaLabel,
}): React.ReactElement => {
  const { stagger: staggerVariants, viewport } = useScrollMotion();

  if (!stagger) {
    return (
      <HomeSectionRevealRoot
        id={id}
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </HomeSectionRevealRoot>
    );
  }

  return (
    <HomeSectionRevealRoot
      id={id}
      className={className}
      aria-label={ariaLabel}
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </HomeSectionRevealRoot>
  );
};
