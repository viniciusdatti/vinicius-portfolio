// Libraries
import { css, keyframes } from 'styled-components';

export const shimmerAnimation = keyframes`
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
`;

export const SkeletonBase = css`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border} 25%,
    ${({ theme }) => theme.colors.surface} 50%,
    ${({ theme }) => theme.colors.border} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmerAnimation} 1.5s ease-in-out infinite;
  border-radius: 4px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background: ${({ theme }) => theme.colors.border};
  }
`;
