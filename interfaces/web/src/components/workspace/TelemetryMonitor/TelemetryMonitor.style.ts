// Libraries
import styled, { keyframes, css, DefaultTheme } from 'styled-components';
import { motion } from 'framer-motion';

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

const valueFlash = keyframes`
  0% {
    background-color: ${({ theme }) => theme.colors.primarySurface};
  }
  100% {
    background-color: transparent;
  }
`;

export const ValueFlashWrap = styled.span<{ $flashing: boolean }>`
  display: inline-block;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 2px 4px;
  margin: -2px -4px;
  font-variant-numeric: tabular-nums;

  ${({ $flashing }) => $flashing && css`
    animation: ${valueFlash} 380ms ${({ theme }) => theme.motion.easeOut} both;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `}
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

const operationalMono = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-variant-numeric: tabular-nums;
`;

export const MonitorRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background: transparent;
  ${operationalMono};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 70% 50% at 12% 0%, ${({ theme }) => theme.colors.primary}12, transparent 52%),
      radial-gradient(ellipse 55% 40% at 92% 100%, ${({ theme }) => theme.colors.accent}0a, transparent 48%),
      linear-gradient(180deg, rgba(11, 13, 16, 0.72) 0%, rgba(7, 8, 10, 0.92) 100%);
    animation: ${ambientPulse} 6s ease-in-out infinite;
    z-index: 0;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  & > *:not([data-telemetry-field]) {
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
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
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
  ${operationalMono};
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
  ${operationalMono};
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

/** Row 1 + row 2 shell — terminal is never a grid child of the monitors row. */
export const MonitorDashboard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  min-width: 0;
  overflow: visible;
`;

/** Row 1 — strict 12-column monitors grid (chart 4 / sensors 8 on desktop). */
export const MonitorMonitorsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  min-width: 0;
  flex-shrink: 0;
  align-content: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
  };
`;

/** Row 2 — full-width terminal band below the monitors grid. */
export const MonitorTerminalRow = styled.div`
  flex: 0 0 auto;
  width: 100%;
  min-width: 0;
  isolation: isolate;
  contain: layout style;
`;

/** Placeholder while Recharts chunk loads — keeps layout stable on Live Lab mount. */
export const ChartPaneFallback = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 220px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.surface};
  opacity: ${({ theme }) => theme.effects.opacity.subtle};
`;

export const MonitorChartPane = styled.div`
  grid-column: 1 / -1;
  min-width: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: rgba(11, 13, 16, 0.82);
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  isolation: isolate;
  contain: layout style;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: span 4;
    border-bottom: none;
    border-right: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  };
`;

export const MonitorSensorsPane = styled.div`
  grid-column: 1 / -1;
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${({ theme }) => theme.spacing.xs};
  background: rgba(11, 13, 16, 0.78);
  backdrop-filter: blur(4px);
  isolation: isolate;
  contain: layout style;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: span 8;
    padding: ${({ theme }) => theme.spacing.sm};
  };
`;

export const MonitorGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
  height: 100%;
  align-content: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing.sm};
  };
`;

const sensorSweep = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  15% { opacity: 0.6; }
  100% { transform: translateX(200%); opacity: 0; }
`;

export const SensorCard = styled.div<{ $status: SensorStatus; $sweepDelay?: number }>`
  background: ${({ theme }) => theme.colors.surfaceGlass};
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.glass};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: inset 0 1px 0 ${({ theme }) => theme.colors.borderLight};
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
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
  gap: ${({ theme }) => theme.spacing.xs};
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
  ${operationalMono};
`;

export const SensorValueRow = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SensorValue = styled.span<{ $status: SensorStatus }>`
  display: inline-block;
  ${operationalMono};
  font-size: clamp(1.05rem, 2.2vw, 1.25rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: ${({ $status, theme }) => getSensorValueColor($status, theme)};
  transition: color ${({ theme }) => theme.transitions.normal};
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 2px 4px;
  margin: -2px -4px;
`;

export const SensorUnit = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  ${operationalMono};
`;

export const ThresholdBar = styled.div`
  position: relative;
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: visible;
`;

export const ThresholdFill = styled(motion.div)<{
  $status: SensorStatus;
}>`
  height: 100%;
  border-radius: inherit;
  background: ${({ $status, theme }) => getThresholdFillColor($status, theme)};
  transition: background ${({ theme }) => theme.transitions.fast};
  outline: ${({ $status, theme }) => ($status === SensorStatus.Critical
    ? `1px solid ${theme.colors.error}55`
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
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: min(32vh, 240px);
  min-height: 140px;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  box-shadow:
    inset 0 1px 0 ${({ theme }) => theme.colors.borderLight},
    ${({ theme }) => theme.elevation.sm};
  overflow: hidden;
  ${operationalMono};

  @media (max-height: 800px) {
    max-height: min(24vh, 180px);
    min-height: 120px;
  };

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-height: min(28vh, 220px);
  };
`;

export const EventLogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.lg};
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
  ${operationalMono};
`;

export const EventLogScroll = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.lg};
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
  ${operationalMono};
  animation: ${slideIn} 0.28s ${({ theme }) => theme.motion.easeOut} both;
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
  grid-column: 1 / -1;
  ${operationalMono};
`;
