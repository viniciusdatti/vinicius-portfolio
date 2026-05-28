/**
 * @fileoverview Types for the Live Lab operational KPI strip.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Types
import type { SensorReading } from '../../../../types/telemetry';

export interface OperationalKpiStripProps {
  readings: SensorReading[];
  tickCount: number;
  connected: boolean;
}
