/**
 * Styles for ProjectCardSkeleton component.
 */

import styled from 'styled-components';
import { SkeletonBase } from '@/styles/skeleton';

export const SkeletonCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const SkeletonElement = styled.div<{ width?: string; height?: string }>`
  ${SkeletonBase};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '1rem'};
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
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: 1rem;
`;

export const SkeletonButton = styled(SkeletonElement)`
  width: 100px;
  height: 2.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;
