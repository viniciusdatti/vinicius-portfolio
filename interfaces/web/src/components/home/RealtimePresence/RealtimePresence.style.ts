// Libraries
import styled, { DefaultTheme } from 'styled-components';
import { Link } from 'react-router-dom';

type PresenceTone = 'ok' | 'warn' | 'idle';

const getPresenceBorderColor = (tone: PresenceTone, theme: DefaultTheme): string => {
  if (tone === 'ok') return theme.colors.success;
  if (tone === 'warn') return theme.colors.warning;
  return theme.colors.borderSubtle;
};

const getPresenceTextColor = (tone: PresenceTone, theme: DefaultTheme): string => {
  if (tone === 'ok') return theme.colors.success;
  if (tone === 'warn') return theme.colors.warning;
  return theme.colors.textMuted;
};

const getPresenceBackground = (tone: PresenceTone, theme: DefaultTheme): string => {
  if (tone === 'ok') return theme.colors.successSurface;
  return theme.colors.mutedSurface;
};

export const PresenceStrip = styled.div`
  max-width: ${({ theme }) => theme.layout.contentWide};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.pageX};
`;

export const PresenceInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceElevated};
`;

export const PresenceLead = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: ${({ theme }) => theme.layout.prose};
`;

export const PresencePills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PresencePill = styled.span<{ $tone: 'ok' | 'idle' | 'warn' }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  padding: 4px ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid
    ${({ $tone, theme }) => getPresenceBorderColor($tone, theme)};
  color: ${({ $tone, theme }) => getPresenceTextColor($tone, theme)};
  background: ${({ $tone, theme }) => getPresenceBackground($tone, theme)};
`;

export const PresenceMicro = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
`;

export const PresenceMicroDot = styled.span<{ $live: boolean }>`
  width: ${({ theme }) => theme.sizes.badge.dotSm};
  height: ${({ theme }) => theme.sizes.badge.dotSm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ $live, theme }) => ($live ? theme.colors.success : theme.colors.textMuted)};
`;

export const PresenceLink = styled(Link)`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  padding: 4px ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.primaryBorderFaint};
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primarySurface};
  text-decoration: none;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  };
`;
