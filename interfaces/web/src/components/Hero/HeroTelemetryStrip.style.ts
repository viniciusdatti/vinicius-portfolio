// Libraries
import styled, { css, DefaultTheme, keyframes } from 'styled-components';

// Types
import { TelemetryStripStatusTone } from '@/components/Hero/HeroTelemetryStrip.types';

// Components
import { glassSurface } from '@/styles/surfaces';

/* *************************************************************************************************
 ********************************************* METHODS *********************************************
 ************************************************************************************************ */

const getStatusColor = (tone: TelemetryStripStatusTone, theme: DefaultTheme): string => {
  if (tone === TelemetryStripStatusTone.Online) {
    return theme.colors.success;
  }
  if (tone === TelemetryStripStatusTone.Offline) {
    return theme.colors.textMuted;
  }
  return theme.colors.warning;
};

const feedReinit = (theme: DefaultTheme) => keyframes`
  0% {
    background-color: ${theme.colors.primarySurface};
    box-shadow: inset 0 0 0 1px ${theme.colors.primaryBorderFaint};
  };
  55% {
    background-color: ${theme.colors.backgroundSecondary};
    box-shadow: inset 0 0 0 1px ${theme.colors.borderLight};
  };
  100% {
    background-color: ${theme.colors.backgroundSecondary};
    box-shadow: inset 0 0 0 1px ${theme.colors.borderSubtle};
  };
`;

const stripScan = (): ReturnType<typeof keyframes> => keyframes`
  0% {
    left: -24%;
    opacity: 0;
  };
  18% {
    opacity: 0.45;
  };
  100% {
    left: 124%;
    opacity: 0;
  };
`;

/* *************************************************************************************************
 ********************************************* STYLES **********************************************
 ************************************************************************************************ */

export const TelemetryStripRoot = styled.div`
  ${glassSurface};
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${({ theme }) => theme.colors.gradientSurfaceRim};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.borderLight};
    pointer-events: none;
    z-index: 0;
  };

  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 22%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.accent}66,
      transparent
    );
    pointer-events: none;
    opacity: 0;
    z-index: 2;
  };

  @media (hover: hover) and (pointer: fine) {
    &:hover::after {
      opacity: 1;
      animation: ${stripScan()} 720ms ${({ theme }) => theme.motion.easeOut}
        both;
    };
  };

  @media (prefers-reduced-motion: reduce) {
    &::after {
      display: none;
    };
  };
`;

export const TelemetryStripHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceGlass};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TelemetryStripBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.sizes.layout.workspaceGap};
  background: ${({ theme }) => theme.colors.borderSubtle};
`;

export const TelemetryCell = styled.div<{ $index: number }>`
  flex: 1 1 min(100%, 9.5rem);
  min-width: 0;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.borderSubtle};
  position: relative;
  z-index: 1;

  @media (hover: hover) and (pointer: fine) {
    ${TelemetryStripRoot}:hover & {
      animation: ${({ theme }) => feedReinit(theme)} 520ms
        ${({ theme }) => theme.motion.easeOut} both;
      animation-delay: ${({ $index }) => $index * 70}ms;
    };
  };

  @media (prefers-reduced-motion: reduce) {
    ${TelemetryStripRoot}:hover & {
      animation: none;
    };
  };
`;

export const TelemetryCellLabel = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
`;

export const TelemetryCellValueRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 0;
`;

export const TelemetryStatusDot = styled.span<{ $tone: TelemetryStripStatusTone }>`
  width: ${({ theme }) => theme.sizes.badge.dotSm};
  height: ${({ theme }) => theme.sizes.badge.dotSm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  flex-shrink: 0;
  background: ${({ $tone, theme }) => getStatusColor($tone, theme)};
`;

export const TelemetryCellValue = styled.span<{ $accent?: boolean }>`
  display: block;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ $accent, theme }) => ($accent ? theme.colors.accent : theme.colors.text)};
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
  letter-spacing: 0.04em;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TelemetryCellMeta = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.06em;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TelemetryHeaderStatus = styled.span<{ $live: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ $live, theme }) => ($live ? theme.colors.success : theme.colors.textMuted)};
  letter-spacing: 0.08em;

  ${({ $live }) => $live && css`
    &::before {
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.85;
    };
  `}
`;
