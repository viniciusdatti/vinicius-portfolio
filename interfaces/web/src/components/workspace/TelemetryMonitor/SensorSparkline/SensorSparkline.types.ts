/**
 * @fileoverview Types for the telemetry sensor sparkline mini-chart.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Types
import { SensorStatus } from '@/types/telemetry';

/* *************************************************************************************************
 ********************************************** TYPES **********************************************
 ************************************************************************************************ */

export interface SensorSparklineProps {
  values: number[];
  status: SensorStatus;
}

export interface SensorSparklineSvgProps {
  $status: SensorStatus;
}

export interface SensorSparklinePoint {
  x: number;
  y: number;
}

export interface SensorSparklinePaths {
  line: string;
  area: string;
  last: SensorSparklinePoint;
}
