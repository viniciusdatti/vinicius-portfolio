// Core
import React from 'react';

// Component
import { SpinnerContainer } from './Spinner.style';
import type { SpinnerProps } from './Spinner.types';

export const Spinner = ({
  size = 'md',
  className,
  testId,
}: SpinnerProps): React.ReactElement => (
  <SpinnerContainer
    $size={size}
    className={className}
    data-testid={testId}
    role="status"
    aria-live="polite"
  />
);
