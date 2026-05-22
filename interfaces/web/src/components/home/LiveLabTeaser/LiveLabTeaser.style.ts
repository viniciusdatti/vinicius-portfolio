// Libraries
import styled, { keyframes, DefaultTheme } from 'styled-components';

const activityPulse = (theme: DefaultTheme) => keyframes`
  0%, 100% {
    opacity: 1;
  };
  50% {
    opacity: ${theme.effects.opacity.pulseMid};
  };
`;

export const TeaserRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`;

export const TeaserActivity = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TeaserActivityDot = styled.span<{ $live: boolean }>`
  width: ${({ theme }) => theme.sizes.badge.dotSm};
  height: ${({ theme }) => theme.sizes.badge.dotSm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ $live, theme }) => ($live ? theme.colors.success : theme.colors.textMuted)};
  animation: ${({ $live, theme }) => ($live ? activityPulse(theme) : 'none')} 2s
    ease-in-out infinite;
`;

export const TeaserMetrics = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const TeaserMetric = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.mutedSurface};
`;

export const TeaserMetricValue = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

export const TeaserMetricLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const TeaserContextList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TeaserContextItem = styled.li`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  padding-left: ${({ theme }) => theme.spacing.md};
  border-left: 2px solid ${({ theme }) => theme.colors.primaryBorderFaint};
`;
