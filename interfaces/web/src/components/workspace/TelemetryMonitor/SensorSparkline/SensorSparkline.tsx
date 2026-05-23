/**
 * @fileoverview Inline sensor sparkline for telemetry KPI strips.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Core
import React, { useMemo } from 'react';

// Types
import type {
  SensorSparklinePaths,
  SensorSparklinePoint,
  SensorSparklineProps,
} from '@/components/workspace/TelemetryMonitor/SensorSparkline/SensorSparkline.types';

// Components
import {
  SparklineSvg,
  SparklineWrap,
} from '@/components/workspace/TelemetryMonitor/SensorSparkline/SensorSparkline.style';

/* *************************************************************************************************
 ********************************************* METHODS *********************************************
 ************************************************************************************************ */

const buildSparklinePaths = (values: number[]): SensorSparklinePaths | null => {
  const samples: number[] = values.length > 1 ? values.slice(-24) : [];
  if (samples.length < 2) {
    return null;
  }
  const min: number = Math.min(...samples);
  const max: number = Math.max(...samples);
  const range: number = max - min || 1;
  const w: number = 100;
  const h: number = 28;
  const step: number = w / (samples.length - 1);

  const points: SensorSparklinePoint[] = samples.map((v: number, i: number) => {
    const x: number = i * step;
    const y: number = h - ((v - min) / range) * (h - 4) - 2;
    return { x, y };
  });

  const line: string = points
    .map((p: SensorSparklinePoint, i: number) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`)
    .join(' ');
  const area: string = `${line} L ${w},${h} L 0,${h} Z`;
  const last: SensorSparklinePoint = points[points.length - 1];
  return { line, area, last };
};

/* *************************************************************************************************
 *************************************** COMPONENT HANDLING ****************************************
 ************************************************************************************************ */

export const SensorSparkline: React.FC<SensorSparklineProps> = ({
  values,
  status,
}): React.ReactElement | null => {
  const paths: SensorSparklinePaths | null = useMemo(
    (): SensorSparklinePaths | null => buildSparklinePaths(values),
    [values],
  );

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
};
