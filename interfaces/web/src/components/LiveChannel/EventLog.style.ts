// Libraries
import styled, { DefaultTheme } from 'styled-components';

type EventLogLevel = 'info' | 'success' | 'warning' | 'error';

const getEventLogItemColor = (level: EventLogLevel, theme: DefaultTheme): string => {
  if (level === 'success') return theme.colors.success;
  if (level === 'warning') return theme.colors.warning;
  if (level === 'error') return theme.colors.error;
  return theme.colors.textMuted;
};

export const EventLogPanel = styled.aside`
  flex-shrink: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  max-height: 140px;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const EventLogHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const EventLogList = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const EventLogItem = styled.li<{ $level: 'info' | 'success' | 'warning' | 'error' }>`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: baseline;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ $level, theme }) => getEventLogItemColor($level, theme)};
`;

export const EventLogTime = styled.span`
  opacity: ${({ theme }) => theme.effects.opacity.mutedText};
  white-space: nowrap;
`;

export const EventLogMessage = styled.span`
  min-width: 0;
`;
