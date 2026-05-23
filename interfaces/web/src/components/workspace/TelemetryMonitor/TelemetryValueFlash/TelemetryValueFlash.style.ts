/**
 * @fileoverview Flash animation styles for telemetry value cells.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Libraries
import styled, { css, keyframes } from 'styled-components';

// Types
import type { TelemetryValueFlashWrapProps } from '@/components/Workspace/TelemetryMonitor/TelemetryValueFlash/TelemetryValueFlash.types';

/* *************************************************************************************************
 ********************************************* STYLES **********************************************
 ************************************************************************************************ */

const valueFlash = keyframes`
  0% {
    background-color: ${({ theme }) => theme.colors.primarySurface};
  }
  100% {
    background-color: transparent;
  }
`;

export const ValueFlashWrap = styled.span<TelemetryValueFlashWrapProps>`
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
