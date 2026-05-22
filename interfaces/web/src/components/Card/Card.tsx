// Core
import React from 'react';

// Types
import type { CardProps } from '@/components/Card/Card.types';

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
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
}: CardProps): React.ReactElement {
  return (
    <StyledCard
      className={className}
      id={id}
      style={style}
      role={role}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      data-testid={testId}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
    >
      {children}
    </StyledCard>
  );
}
