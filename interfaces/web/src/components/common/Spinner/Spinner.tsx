// Core
import React from 'react';

// Components
import { SpinnerContainer } from './Spinner.style';
import type { SpinnerProps } from './Spinner.types';

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className,
}) => {
  return <SpinnerContainer $size={size} className={className} />;
};
