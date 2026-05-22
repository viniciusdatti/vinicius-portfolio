/**
 * Styles for SkillCardSkeleton component.
 */

import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  };
  100% {
    background-position: 200% 0;
  };
`;

export const SkeletonCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const SkeletonElement = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '1rem'};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border} 25%,
    ${({ theme }) => theme.colors.surface} 50%,
    ${({ theme }) => theme.colors.border} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: 4px;
  flex-shrink: 0;
`;

export const SkeletonIcon = styled(SkeletonElement)`
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const SkeletonInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
`;

export const SkeletonName = styled(SkeletonElement)`
  height: 1rem;
  width: 70%;
`;

export const SkeletonCategory = styled(SkeletonElement)`
  height: 0.75rem;
  width: 45%;
`;
