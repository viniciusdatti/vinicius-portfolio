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
const valueFlash = (theme: DefaultTheme) => keyframes`
  0%   { background-color: ${theme.colors.primarySurface}; }
  100% { background-color: transparent; }
`;

const ambientPulse = keyframes`
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.55; }
`;

const headerScan = keyframes`
  0% { left: -30%; opacity: 0; }
  12% { opacity: 0.5; }
  100% { left: 130%; opacity: 0; }
`;

const cursorBlink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
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
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.surfaceGlass};
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.glass};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 28%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.accent}88,
      transparent
    );
    animation: ${headerScan} 8s ease-in-out infinite;
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
      display: none;
    }
  }
`;

export const MonitorHeaderGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  min-width: 0;
`;

export const MonitorToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const ToolbarSep = styled.span`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.colors.borderSubtle};
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
    && css`animation: ${blink} 2.2s ease-in-out infinite;`};
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
  min-height: 200px;
  min-width: 0;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.backgroundSecondary};

  @media (max-height: 800px) {
    min-height: 160px;
  };

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    border-bottom: none;
    border-right: 1px solid ${({ theme }) => theme.colors.borderSubtle};
    min-height: 0;
  }
`;

export const MonitorSensorsPane = styled.div`
  flex: 1;
  flex-shrink: 1;
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 42vh;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: 1 1 auto;
    width: min(340px, 34vw);
    max-height: none;
    min-height: 0;
  }
`;

export const MonitorGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 0;
`;

const sensorSweep = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  15% { opacity: 0.6; }
  100% { transform: translateX(200%); opacity: 0; }
`;

export const SensorCard = styled.div<{ $status: SensorStatus; $sweepDelay?: number }>`
  background: ${({ theme }) => theme.colors.surfaceGlass};
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.glass};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow:
    inset 0 1px 0 ${({ theme }) => theme.colors.borderLight},
    ${({ theme }) => theme.elevation.md};
  transition:
    box-shadow ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    box-shadow: ${({ theme }) => theme.elevation.lg};
    border-color: ${({ theme }) => theme.colors.primaryBorderFaint};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ $status, theme }) => getSensorStatusColor($status, theme)};
    transition: background ${({ theme }) => theme.transitions.normal};
    opacity: 0.9;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 42%,
      ${({ theme }) => theme.colors.primary}05 50%,
      transparent 58%
    );
    animation: ${sensorSweep} 7s ease-in-out infinite;
    animation-delay: ${({ $sweepDelay }) => ($sweepDelay ?? 0)}s;
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

export const SensorCardInner = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
`;

export const SensorHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SensorStatusBadge = styled.span<{ $status: SensorStatus }>`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ $status, theme }) => getSensorStatusColor($status, theme)}55;
  color: ${({ $status, theme }) => getSensorStatusColor($status, theme)};
  background: ${({ $status, theme }) => getSensorStatusColor($status, theme)}14;
`;

export const SensorLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.3;
  min-width: 0;
`;

export const SensorValueRow = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SensorValue = styled.span<{ $status: SensorStatus }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: ${({ $status, theme }) => getSensorValueColor($status, theme)};
  transition: color ${({ theme }) => theme.transitions.normal};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 2px 4px;
  margin: -2px -4px;
  animation: ${({ theme }) => valueFlash(theme)} 320ms ${({ theme }) => theme.motion.easeOut} both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const SensorUnit = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ThresholdBar = styled.div`
  position: relative;
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: visible;
`;

export const ThresholdFill = styled.div<{
  $pct: number;
  $status: SensorStatus;
}>`
  height: 100%;
  width: ${({ $pct }) => Math.min($pct, 100)}%;
  border-radius: inherit;
  background: ${({ $status, theme }) => getThresholdFillColor($status, theme)};
  transition: width 0.55s ${({ theme }) => theme.motion.easeOut},
              background ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ $status, theme }) => ($status === SensorStatus.Critical
    ? `0 0 8px ${theme.colors.error}44`
    : 'none')};
`;

export const ThresholdCritMarker = styled.span<{ $pct: number }>`
  position: absolute;
  top: -2px;
  bottom: -2px;
  left: ${({ $pct }) => `${Math.min($pct, 100)}%`};
  width: 2px;
  transform: translateX(-1px);
  background: ${({ theme }) => theme.colors.error};
  border-radius: 1px;
  opacity: 0.65;
  pointer-events: none;
`;

export const ThresholdLimit = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
`;

export const EventLogRoot = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  max-height: min(32vh, 240px);
  min-height: 152px;

  @media (max-height: 800px) {
    max-height: min(24vh, 180px);
    min-height: 120px;
  };
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: inset 0 1px 0 ${({ theme }) => theme.colors.borderLight};
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
  overflow-x: hidden;
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

export const EventLogLine = styled.div<{ $type: 'info' | 'warn' | 'critical'; $isLatest?: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: flex-start;
  min-width: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  animation: ${slideIn} 0.24s ${({ theme }) => theme.motion.easeOut} both;
  color: ${({ $type, theme }) => getEventLogLineColor($type, theme)};
  padding: ${({ theme }) => theme.spacing.xs} 0;
  border-left: 2px solid ${({ $type, theme }) => getEventLogLineColor($type, theme)}44;
  padding-left: ${({ theme }) => theme.spacing.sm};
  margin-left: 1px;

  ${({ $isLatest }) => $isLatest && css`
    &::after {
      content: '▋';
      margin-left: 2px;
      font-size: 0.85em;
      opacity: 0.7;
      animation: ${cursorBlink} 1.1s step-end infinite;

      @media (prefers-reduced-motion: reduce) {
        display: none;
      }
    }
  `}
`;

export const EventLogPrefix = styled.span<{ $type: 'info' | 'warn' | 'critical' }>`
  flex-shrink: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: 0.06em;
  color: ${({ $type, theme }) => getEventLogLineColor($type, theme)};
  min-width: 2.75rem;
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
