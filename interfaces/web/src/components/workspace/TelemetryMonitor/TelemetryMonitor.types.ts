/**
 * @fileoverview Types for the Live Lab telemetry monitor dashboard.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Core
import type React from 'react';

// Types
import type { SensorReading, TelemetryEventLogEntry } from '@/types/telemetry';

/* *************************************************************************************************
 ********************************************** ENUMS **********************************************
 ************************************************************************************************ */

export enum TelemetryEventLogPlacement {
  Embedded = 'embedded',
  Flow = 'flow',
  None = 'none',
}

/* *************************************************************************************************
 ********************************************** TYPES **********************************************
 ************************************************************************************************ */

export interface TelemetryMonitorProps {
  eventLogPlacement?: TelemetryEventLogPlacement;
}

export interface OperationalEventLogProps {
  logRef: React.RefObject<HTMLDivElement | null>;
  connected: boolean;
  eventLog: TelemetryEventLogEntry[];
  tickCount: number;
}

export interface SensorProps {
  reading: SensorReading;
  index: number;
}
