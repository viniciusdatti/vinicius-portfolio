// Libraries
import styled, { keyframes } from 'styled-components';

// Types
import type { SpinnerContainerProps } from '@/components/common/Spinner/Spinner.types';

/* *************************************************************************************************
 **************************************** SPINNER ANIMATION ****************************************
 ************************************************************************************************ */

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const sizes: Record<SpinnerContainerProps['$size'], string> = {
  sm: '16px',
  md: '24px',
  lg: '40px',
};

export const SpinnerContainer = styled.div<SpinnerContainerProps>`
  width: ${({ $size }) => sizes[$size]};
  height: ${({ $size }) => sizes[$size]};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
