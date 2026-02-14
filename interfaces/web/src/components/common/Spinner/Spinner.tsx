// Core
import React from 'react';

// Libraries
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface SpinnerContainerProps {
  $size: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: '16px',
  md: '24px',
  lg: '40px',
};

const SpinnerContainer = styled.div<SpinnerContainerProps>`
  width: ${({ $size }) => sizes[$size]};
  height: ${({ $size }) => sizes[$size]};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className }) => {
  return <SpinnerContainer $size={size} className={className} />;
};
