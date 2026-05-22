// Core
import React from 'react';

// Libraries
import { motion } from 'framer-motion';

// Hooks
import { usePhysicalInteraction } from '@/hooks/usePhysicalInteraction';

// Types
import {
  CardVariant,
  type CardComponent,
} from '@/components/Card/Card.types';
import type { UsePhysicalInteractionResult } from '@/hooks/usePhysicalInteraction.types';

// Components
import { StyledCard } from '@/components/Card/Card.style';

const MotionStyledCard = motion.create(StyledCard);

export const Card: CardComponent = function Card({
  children,
  className,
  id,
  style,
  role,
  onClick,
  onKeyDown,
  tabIndex,
  testId,
  variant = CardVariant.MarketingGlass,
  interactive = true,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
}): React.ReactElement {
  const usePhysical: boolean = interactive
    && (variant === CardVariant.MarketingGlass || variant === CardVariant.StatSignal);

  const {
    ref,
    motionProps,
  }: UsePhysicalInteractionResult<HTMLDivElement> = usePhysicalInteraction({
    disabled: !usePhysical,
    enableSpotlight: variant === CardVariant.MarketingGlass,
  });

  return (
    <MotionStyledCard
      ref={ref}
      className={className}
      id={id}
      style={{ ...motionProps.style, ...style }}
      role={role}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      data-testid={testId}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      $variant={variant}
      $interactive={interactive}
      animate={motionProps.animate}
      transition={motionProps.transition}
      whileTap={motionProps.whileTap}
    >
      {children}
    </MotionStyledCard>
  );
};
