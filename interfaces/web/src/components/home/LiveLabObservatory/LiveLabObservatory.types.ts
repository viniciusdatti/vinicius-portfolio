/**
 * @fileoverview Types for the home Live Lab observatory preview panel.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Types
import { SensorStatus } from '@/types/telemetry';

/* *************************************************************************************************
 ********************************************** TYPES **********************************************
 ************************************************************************************************ */

export interface LiveLabObservatorySensorDef {
  id: string;
  label: string;
  unit: string;
  base: number;
  variance: number;
  status: SensorStatus;
}

export interface LiveLabObservatoryLogLine {
  time: string;
  msg: string;
  type?: 'info' | 'warn';
}

export interface LiveLabObservatorySparklineProps {
  seed: number;
  strokeColor: string;
}

export interface LiveLabObservatoryAnimatedValueProps {
  base: number;
  variance: number;
  unit: string;
  status: SensorStatus;
}
