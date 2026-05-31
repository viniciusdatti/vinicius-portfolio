// Core
import React from 'react';

// Hooks
import { useScrollMotion } from '../../../hooks/useScrollMotion';

// Layout
import { HomeSectionRevealRoot } from './HomeSectionReveal.style';

// Types
import { HomeSectionRevealProps } from './HomeSectionReveal.types';

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
