/**
 * @fileoverview Types for the Live Lab telemetry trend chart (Recharts).
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Types
import type { SensorReading } from '../../../../types/telemetry';

export interface TelemetryTrendChartProps {
  readings: SensorReading[];
  history: Record<string, number[]>;
  title: string;
}

export interface TelemetryTrendChartPoint {
  index: number;
  [sensorId: string]: number;
}

export interface TelemetryTrendChartPalette {
  accent: string;
  warning: string;
  error: string;
  success: string;
}

export interface TelemetryTrendChartMargin {
  top: number;
  right: number;
  left: number;
  bottom: number;
}
