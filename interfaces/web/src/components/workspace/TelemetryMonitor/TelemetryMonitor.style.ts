// Libraries
import styled, { keyframes, css, DefaultTheme } from 'styled-components';

// Types
import { SensorStatus } from '@/types/telemetry';

const getSensorStatusColor = (status: SensorStatus, theme: DefaultTheme): string => {
  if (status === SensorStatus.Critical) return theme.colors.error;
  if (status === SensorStatus.Warn) return theme.colors.warning;
  return theme.colors.success;
};

const getSensorValueColor = (status: SensorStatus, theme: DefaultTheme): string => {
  if (status === SensorStatus.Critical) return theme.colors.error;
  if (status === SensorStatus.Warn) return theme.colors.warning;
  return theme.colors.text;
};

const getThresholdFillColor = (status: SensorStatus, theme: DefaultTheme): string => {
  if (status === SensorStatus.Critical) return theme.colors.error;
  if (status === SensorStatus.Warn) return theme.colors.warning;
  return theme.colors.accent;
};

const getThresholdStatusColor = (status: SensorStatus, theme: DefaultTheme): string => {
  if (status === SensorStatus.Critical) return theme.colors.error;
  if (status === SensorStatus.Warn) return theme.colors.warning;
  return theme.colors.textMuted;
};

type EventLogType = 'info' | 'warn' | 'critical';

const getEventLogLineColor = (type: EventLogType, theme: DefaultTheme): string => {
  if (type === 'critical') return theme.colors.error;
  if (type === 'warn') return theme.colors.warning;
  return theme.colors.textMuted;
};

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`;

/**
 * Subtle flash that plays when a sensor value updates.
 * Applied by re-mounting the element via React key change.
 */
const valueFlash = keyframes`
  0%   { opacity: 0.45; transform: scale(0.97); }
  40%  { opacity: 1;    transform: scale(1.02); }
  100% { opacity: 1;    transform: scale(1); }
`;

const ambientPulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
`;

export const MonitorRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 60% 40% at 10% 0%, ${({ theme }) => theme.colors.primary}10, transparent 50%),
      radial-gradient(ellipse 50% 35% at 90% 100%, ${({ theme }) => theme.colors.accent}08, transparent 45%);
    animation: ${ambientPulse} 6s ease-in-out infinite;
    z-index: 0;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

export const MonitorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

export const MonitorTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const MonitorStatus = styled.div<{ $connected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ $connected, theme }) => ($connected ? theme.colors.success : theme.colors.textMuted)};
  letter-spacing: 0.08em;
`;

export const StatusDot = styled.span<{ $connected: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $connected, theme }) => ($connected ? theme.colors.success : theme.colors.textMuted)};
  ${({ $connected }) => $connected
    && css`animation: ${blink} 2s ease-in-out infinite;`};
`;

export const MonitorBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: row;
  };
`;

export const MonitorChartPane = styled.div`
  flex: 1;
  min-height: 220px;
  min-width: 0;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    border-bottom: none;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    min-height: 0;
  };
`;

export const MonitorSensorsPane = styled.div`
  flex-shrink: 0;
  min-width: 0;
  overflow-y: auto;
  max-height: 42vh;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: min(420px, 38vw);
    max-height: none;
  };
`;

export const MonitorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  background: ${({ theme }) => theme.colors.border};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  };
`;

const sensorSweep = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  15% { opacity: 0.6; }
  100% { transform: translateX(200%); opacity: 0; }
`;

export const SensorCard = styled.div<{ $status: SensorStatus }>`
  background: ${({ theme }) => theme.colors.surfaceElevated};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  box-shadow:
    inset 0 1px 0 ${({ theme }) => theme.colors.borderLight},
    ${({ theme }) => theme.elevation.sm};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ $status, theme }) => getSensorStatusColor($status, theme)};
    transition: background ${({ theme }) => theme.transitions.normal};
    box-shadow: 0 0 12px ${({ $status, theme }) => getSensorStatusColor($status, theme)}55;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 42%,
      ${({ theme }) => theme.colors.primary}06 50%,
      transparent 58%
    );
    animation: ${sensorSweep} 5s ease-in-out infinite;
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

export const SensorValueCell = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3.5rem;
  padding: 2px ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.borderSubtle};
`;

export const SensorLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const SensorValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const SensorValue = styled.span<{ $status: SensorStatus }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: -0.02em;
  line-height: 1;
  color: ${({ $status, theme }) => getSensorValueColor($status, theme)};
  transition: color ${({ theme }) => theme.transitions.normal};
  font-variant-numeric: tabular-nums;
  display: inline-block;
  animation: ${valueFlash} 260ms ${({ theme }) => theme.motion.easeOut} both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  };
`;

export const SensorUnit = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ThresholdBar = styled.div`
  height: 2px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 1px;
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const ThresholdFill = styled.div<{
  $pct: number;
  $status: SensorStatus;
}>`
  height: 100%;
  width: ${({ $pct }) => Math.min($pct, 100)}%;
  background: ${({ $status, theme }) => getThresholdFillColor($status, theme)};
  transition: width 0.5s ${({ theme }) => theme.motion.easeOut},
              background ${({ theme }) => theme.transitions.fast};
`;

export const ThresholdMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const ThresholdStatus = styled.span<{ $status: SensorStatus }>`
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $status, theme }) => getThresholdStatusColor($status, theme)};
`;

export const ThresholdLimit = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: 0.6;
`;

export const EventLogRoot = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  max-height: min(28vh, 220px);
  min-height: 140px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  box-shadow: inset 0 8px 24px -12px rgba(0, 0, 0, 0.35);
`;

export const EventLogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  flex-shrink: 0;
`;

export const EventLogTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const EventLogTick = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const EventLogScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  &::-webkit-scrollbar { width: 4px; };
  &::-webkit-scrollbar-track { background: transparent; };
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
  };
`;

export const EventLogLine = styled.div<{ $type: 'info' | 'warn' | 'critical' }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  animation: ${slideIn} 0.2s ease-out;
  color: ${({ $type, theme }) => getEventLogLineColor($type, theme)};
`;

export const EventLogTime = styled.span`
  flex-shrink: 0;
  opacity: ${({ theme }) => theme.effects.opacity.subtle};
  min-width: ${({ theme }) => theme.spacing.xxl};
`;

export const ConnectingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;
