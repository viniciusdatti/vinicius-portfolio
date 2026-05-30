// Core
import React from 'react';

// Types
import { SensorReading, TelemetryEventLogEntry } from '../../../types/telemetry';

export enum TelemetryEventLogPlacement {
  Embedded = 'embedded',
  Flow = 'flow',
  None = 'none',
}

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
  compact?: boolean;
}
