/**
 * Styled components for FilterBar (horizontal filter chips).
 */

// Libraries
import styled from 'styled-components';

export const FilterBarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export interface FilterChipProps {
  $active: boolean;
}

export const FilterChip = styled.button<FilterChipProps>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  background-color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.surface)};
  color: ${({ $active, theme }) => ($active ? theme.colors.onPrimary : theme.colors.textSecondary)};
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ $active, theme }) => ($active ? 'white' : theme.colors.primary)};
  };
`;

export const FilterCount = styled.span`
  margin-left: ${({ theme }) => theme.spacing.xs};
  opacity: 0.9;
`;
