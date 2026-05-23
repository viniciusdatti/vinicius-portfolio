/**
 * @fileoverview Home Live Lab observatory panel styles.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Libraries
import styled, { css, keyframes, DefaultTheme } from 'styled-components';

// Types
import { SensorStatus } from '@/types/telemetry';

// Components
import { getTelemetryStatusColor } from '@/lib/telemetryStatusColor';

/* *************************************************************************************************
 ********************************************* STYLES **********************************************
 ************************************************************************************************ */

const statusColor = (
  status: SensorStatus,
  theme: DefaultTheme,
): string => getTelemetryStatusColor(status, theme);

const sweep = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
`;

const pulseRing = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.35); opacity: 0; }
`;

const logFade = keyframes`
  from { opacity: 0; transform: translateX(-6px); }
  to { opacity: 1; transform: translateX(0); }
`;

export const ObservatoryRoot = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: inset 0 1px 0 ${({ theme }) => theme.colors.borderLight};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 80% 60% at 70% 0%,
      ${({ theme }) => theme.colors.primary}12,
      transparent 55%
    );
    pointer-events: none;
    z-index: 0;
  }
`;

export const ObservatoryChrome = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceGlass};
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.glass};
  position: relative;
  z-index: 1;
`;

export const ObservatoryTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ObservatoryLive = styled.span<{ $live?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ $live, theme }) => ($live ? theme.colors.success : theme.colors.textMuted)};
  letter-spacing: 0.08em;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ $live, theme }) => ($live ? theme.colors.success : theme.colors.textMuted)};
    outline: ${({ $live, theme }) => ($live ? `1px solid ${theme.colors.success}55` : 'none')};
    ${({ $live }) => $live && css`
      animation: ${pulseRing} 2.2s ease-out infinite;
    `}
  }
`;

export const ObservatoryBody = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  background: ${({ theme }) => theme.colors.borderSubtle};
  position: relative;
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1.15fr 0.85fr;
  }
`;

export const SensorPanel = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: ${({ theme }) => theme.colors.borderSubtle};
`;

export const SensorTile = styled.div<{ $status: SensorStatus }>`
  position: relative;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ $status, theme }) => statusColor($status, theme)};
    opacity: 0.85;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 40%,
      ${({ theme }) => theme.colors.primary}08 50%,
      transparent 60%
    );
    animation: ${sweep} 4.5s ease-in-out infinite;
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

export const SensorTileLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const SensorTileValue = styled.div<{ $status: SensorStatus }>`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: ${({ $status, theme }) => statusColor($status, theme)};
  letter-spacing: -0.02em;
`;

export const SparklineSvg = styled.svg`
  display: block;
  width: 100%;
  height: 28px;
  margin-top: ${({ theme }) => theme.spacing.sm};
  overflow: visible;
`;

export const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 200px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

export const ChartPane = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  min-height: 120px;
`;

export const ChartLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const LogPane = styled.div`
  flex: 0 0 auto;
  max-height: 140px;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
`;

export const LogLine = styled.div<{ $type?: 'info' | 'warn' }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  line-height: 1.5;
  color: ${({ $type, theme }) => ($type === 'warn' ? theme.colors.warning : theme.colors.textMuted)};
  animation: ${logFade} 0.35s ease-out both;

  time {
    flex-shrink: 0;
    opacity: 0.55;
  }
`;

export const ObservatoryFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.06em;
  position: relative;
  z-index: 1;
`;

export const OpsMetric = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  strong {
    color: ${({ theme }) => theme.colors.accent};
    font-weight: 600;
  }
`;
