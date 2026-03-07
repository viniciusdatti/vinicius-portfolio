/**
 * Styles for ProjectCardSkeleton component.
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
  border-radius: 12px;
  padding: 1.5rem;
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
`;

export const SkeletonTitle = styled(SkeletonElement)`
  height: 1.5rem;
  width: 70%;
  margin-bottom: 0.75rem;
`;

export const SkeletonDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const SkeletonLine = styled(SkeletonElement)<{ width?: string }>`
  height: 0.875rem;
`;

export const SkeletonTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

export const SkeletonTag = styled(SkeletonElement)`
  width: 70px;
  height: 1.5rem;
  border-radius: 6px;
`;

export const SkeletonLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing?.sm ?? '0.5rem'};
  margin-top: 1rem;
`;

export const SkeletonButton = styled(SkeletonElement)`
  width: 100px;
  height: 2.25rem;
  border-radius: ${({ theme }) => theme.borderRadius?.md ?? '8px'};
`;
