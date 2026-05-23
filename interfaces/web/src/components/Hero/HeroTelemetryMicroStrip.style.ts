// Libraries
import styled, { keyframes } from 'styled-components';

/* *************************************************************************************************
 ********************************************* STYLES **********************************************
 ************************************************************************************************ */

const terminalCursorBlink = keyframes`
  0%, 49% {
    opacity: 1;
  };
  50%, 100% {
    opacity: 0;
  };
`;

export const TelemetryMicroRoot = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 2rem;
  margin-bottom: auto;
  margin-top: 0;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.surfaceGlass};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  gap: ${({ theme }) => theme.spacing.sm};
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  };

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  };
`;

export const TelemetryMicroSegment = styled.span<{ $accent?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-shrink: 0;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
  color: ${({ $accent, theme }) => ($accent ? theme.colors.accent : 'inherit')};
`;

export const TelemetryMicroDivider = styled.span`
  flex-shrink: 0;
  opacity: 0.35;
  user-select: none;
`;

export const TelemetryMicroDot = styled.span<{ $live: boolean }>`
  width: 5px;
  height: 5px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  flex-shrink: 0;
  background: ${({ $live, theme }) => ($live ? theme.colors.success : theme.colors.textMuted)};
`;

export const TelemetryMicroCursor = styled.span`
  display: inline-block;
  width: 0.45em;
  height: 0.95em;
  margin-left: 1px;
  vertical-align: -0.05em;
  background: ${({ theme }) => theme.colors.accent};
  opacity: 0.85;
  animation: ${terminalCursorBlink} 1.05s step-end infinite;
  will-change: opacity;

  html[data-motion-paused='true'] & {
    animation-play-state: paused;
  };

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.65;
  };
`;
