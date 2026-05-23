// Core
import React from 'react';

// Components
import { SpinnerContainer } from '@/components/common/Spinner/Spinner.style';
import type { SpinnerProps } from '@/components/common/Spinner/Spinner.types';

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
