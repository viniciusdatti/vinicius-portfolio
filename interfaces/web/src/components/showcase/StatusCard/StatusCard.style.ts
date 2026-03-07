/**
 * Styled components for StatusCard (HighlightCard-style).
 * Status colors from theme; no inline styles.
 */

// Libraries
import styled from 'styled-components';

// Types
import { HighlightCardStatus } from '../../../types';

const statusColorMap = (theme: { colors: { success: string; error: string; textMuted: string } }): Record<
  HighlightCardStatus,
  string
> => ({
  [HighlightCardStatus.Success]: theme.colors.success,
  [HighlightCardStatus.Error]: theme.colors.error,
  [HighlightCardStatus.Neutral]: theme.colors.textMuted,
});

export interface StyledStatusCardProps {
  $status: HighlightCardStatus;
}

export const StyledStatusCard = styled.div<StyledStatusCardProps>`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme, $status }) => statusColorMap(theme)[$status]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.xl};
  transition: box-shadow ${({ theme }) => theme.transitions.fast};

  &::before {
    content: '';
    position: absolute;
    left: ${({ theme }) => theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme, $status }) => statusColorMap(theme)[$status]};
  };

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  };
`;

export const StatusCardTitle = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const StatusCardValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

export const StatusCardUnit = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: ${({ theme }) => theme.spacing.xs};
`;
