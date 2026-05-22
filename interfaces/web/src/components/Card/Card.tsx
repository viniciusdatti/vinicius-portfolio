// Core
import React from 'react';

// Hooks
import { usePointerPosition } from '@/hooks/usePointerPosition';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Types
import { CardVariant, type CardProps } from '@/components/Card/Card.types';

// Components
import { StyledCard } from '@/components/Card/Card.style';

export function Card({
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
}: CardProps): React.ReactElement {
  const reduced = usePrefersReducedMotion();
  const useSpotlight = interactive
    && (variant === CardVariant.MarketingGlass || variant === CardVariant.StatSignal);
  const { ref, position } = usePointerPosition<HTMLDivElement>(!useSpotlight || reduced);

  const pointerStyle = useSpotlight && !reduced
    ? ({
      '--spot-x': `${position.x * 100}%`,
      '--spot-y': `${position.y * 100}%`,
    } as React.CSSProperties)
    : undefined;

  return (
    <StyledCard
      ref={ref}
      className={className}
      id={id}
      style={{ ...pointerStyle, ...style }}
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
    >
      {children}
    </StyledCard>
  );
}
