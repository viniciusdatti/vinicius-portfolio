// Core
import React from 'react';

// Types
import type { ButtonProps } from './Button.types';

// Components
import { StyledButton } from './Button.style';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  ...props
}) => {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};
