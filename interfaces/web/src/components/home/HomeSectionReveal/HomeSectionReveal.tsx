/**
 * @fileoverview Viewport-driven scroll reveal shell for Home sections below the fold.
 */

// Core
import React from 'react';

// Hooks
import { useScrollMotion } from '@/hooks/useScrollMotion';

// Types
import type { HomeSectionRevealProps } from '@/components/home/HomeSectionReveal/HomeSectionReveal.types';

// Components
import { HomeSectionRevealRoot } from '@/components/home/HomeSectionReveal/HomeSectionReveal.style';

/* *************************************************************************************************
 ******************************************** COMPONENT ********************************************
 ************************************************************************************************ */

/**
 * Stagger shell for nested Home blocks — children carry `variants={item}` from `useScrollMotion`.
 * Section-level opacity gates live inside each Home block; avoid wrapping whole sections here.
 */
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
