/**
 * @fileoverview Styled sparkline chart for telemetry KPI sensor strips.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Libraries
import styled, { keyframes } from 'styled-components';

// Types
import type { SensorSparklineSvgProps } from '@/components/Workspace/TelemetryMonitor/SensorSparkline/SensorSparkline.types';
import { SensorStatus } from '@/types/telemetry';

// Components
import { getTelemetryStatusColor } from '@/lib/telemetryStatusColor';

/* *************************************************************************************************
 ********************************************* STYLES **********************************************
 ************************************************************************************************ */

const drawLine = keyframes`
  from { stroke-dashoffset: 120; }
  to { stroke-dashoffset: 0; }
`;

const dotPulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

export const SparklineWrap = styled.div`
  width: 100%;
  height: 32px;
  margin-top: ${({ theme }) => theme.spacing.xs};
  opacity: 0.9;
`;

export const SparklineSvg = styled.svg<SensorSparklineSvgProps>`
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;

  .spark-fill {
    fill: ${({ $status, theme }) => {
    if ($status === SensorStatus.Critical) return `${theme.colors.error}18`;
    if ($status === SensorStatus.Warn) return `${theme.colors.warning}14`;
    return `${theme.colors.success}12`;
  }};
  }

  .spark-stroke {
    fill: none;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: ${({ $status, theme }) => getTelemetryStatusColor($status, theme)};
    stroke-dasharray: 120;
    animation: ${drawLine} 1s ${({ theme }) => theme.motion.easeOut} both;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      stroke-dasharray: none;
    }
  }

  .spark-dot {
    fill: ${({ $status, theme }) => getTelemetryStatusColor($status, theme)};
    animation: ${dotPulse} 2.2s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;
