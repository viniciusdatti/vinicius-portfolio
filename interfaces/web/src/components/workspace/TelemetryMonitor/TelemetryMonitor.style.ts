// Libraries
import styled, { keyframes, css } from 'styled-components';

// Types
import type { SensorStatus } from '../../../hooks/useTelemetry';

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

export const MonitorRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
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
  color: ${({ $connected, theme }) =>
    $connected ? theme.colors.success : theme.colors.textMuted};
  letter-spacing: 0.08em;
`;

export const StatusDot = styled.span<{ $connected: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $connected, theme }) =>
    $connected ? theme.colors.success : theme.colors.textMuted};
  ${({ $connected }) =>
    $connected &&
    css`animation: ${blink} 2s ease-in-out infinite;`};
`;

export const MonitorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  background: ${({ theme }) => theme.colors.border};
  flex-shrink: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  };
`;

export const SensorCard = styled.div<{ $status: 'ok' | 'warn' | 'critical' }>`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: ${({ $status, theme }) =>
      $status === 'critical'
        ? theme.colors.error
        : $status === 'warn'
          ? theme.colors.warning
          : theme.colors.success};
    transition: background ${({ theme }) => theme.transitions.normal};
  };
`;

export const SensorLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const SensorValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const SensorValue = styled.span<{ $status: SensorStatus }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
  color: ${({ $status, theme }) =>
    $status === 'critical'
      ? theme.colors.error
      : $status === 'warn'
        ? theme.colors.warning
        : theme.colors.text};
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
  background: ${({ $status, theme }) =>
    $status === 'critical'
      ? theme.colors.error
      : $status === 'warn'
        ? theme.colors.warning
        : theme.colors.accent};
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
  color: ${({ $status, theme }) =>
    $status === 'critical'
      ? theme.colors.error
      : $status === 'warn'
        ? theme.colors.warning
        : theme.colors.textMuted};
`;

export const ThresholdLimit = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: 0.6;
`;

export const EventLogRoot = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
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
  color: ${({ $type, theme }) =>
    $type === 'critical'
      ? theme.colors.error
      : $type === 'warn'
        ? theme.colors.warning
        : theme.colors.textMuted};
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
