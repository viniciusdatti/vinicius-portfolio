// Core
import React, { useMemo } from 'react';

// Libraries
import styled, { keyframes } from 'styled-components';

// Types
import { SensorStatus } from '@/types/telemetry';

const drawLine = keyframes`
  from { stroke-dashoffset: 120; }
  to { stroke-dashoffset: 0; }
`;

const dotPulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

const SparklineWrap = styled.div`
  width: 100%;
  height: 32px;
  margin-top: ${({ theme }) => theme.spacing.xs};
  opacity: 0.9;
`;

const SparklineSvg = styled.svg<{ $status: SensorStatus }>`
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;

  .spark-fill {
    fill: ${({ $status, theme }) => {
    if ($status === SensorStatus.Critical) return `${theme.colors.error}14`;
    if ($status === SensorStatus.Warn) return `${theme.colors.warning}10`;
    return `${theme.colors.primary}10`;
  }};
  }

  .spark-stroke {
    fill: none;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: ${({ $status, theme }) => {
    if ($status === SensorStatus.Critical) return theme.colors.error;
    if ($status === SensorStatus.Warn) return theme.colors.warning;
    return theme.colors.accent;
  }};
    stroke-dasharray: 120;
    animation: ${drawLine} 1s ${({ theme }) => theme.motion.easeOut} both;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      stroke-dasharray: none;
    }
  }

  .spark-dot {
    fill: ${({ $status, theme }) => {
    if ($status === SensorStatus.Critical) return theme.colors.error;
    if ($status === SensorStatus.Warn) return theme.colors.warning;
    return theme.colors.accent;
  }};
    animation: ${dotPulse} 2.2s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

interface SensorSparklineProps {
  values: number[];
  status: SensorStatus;
}

export function SensorSparkline({
  values,
  status,
}: SensorSparklineProps): React.ReactElement | null {
  const paths = useMemo(() => {
    const samples = values.length > 1 ? values.slice(-24) : [];
    if (samples.length < 2) {
      return null;
    }
    const min = Math.min(...samples);
    const max = Math.max(...samples);
    const range = max - min || 1;
    const w = 100;
    const h = 28;
    const step = w / (samples.length - 1);

    const points = samples.map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return { x, y };
    });

    const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
    const area = `${line} L ${w},${h} L 0,${h} Z`;
    const last = points[points.length - 1];
    return { line, area, last };
  }, [values]);

  if (!paths) {
    return null;
  }

  return (
    <SparklineWrap aria-hidden>
      <SparklineSvg
        viewBox="0 0 100 32"
        preserveAspectRatio="none"
        $status={status}
      >
        <path className="spark-fill" d={paths.area} />
        <path className="spark-stroke" d={paths.line} />
        <circle
          className="spark-dot"
          cx={paths.last.x}
          cy={paths.last.y}
          r={2.5}
        />
      </SparklineSvg>
    </SparklineWrap>
  );
}
