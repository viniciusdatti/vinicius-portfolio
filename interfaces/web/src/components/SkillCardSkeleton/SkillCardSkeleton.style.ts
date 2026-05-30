// Libraries
import styled from 'styled-components';

// Styles
import { SkeletonBase } from '../../styles/skeleton';

export const SkeletonCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

interface SkeletonElementStyleProps {
  $width?: string;
  $height?: string;
}

export const SkeletonElement = styled.div<SkeletonElementStyleProps>`
  ${SkeletonBase};
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '1rem'};
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
