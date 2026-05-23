/* *************************************************************************************************
 ********************************************* SECTION *********************************************
 ************************************************************************************************ */

export enum SensorStatus {
  Ok = 'ok',
  Warn = 'warn',
  Critical = 'critical',
}

export enum TelemetryEventType {
  Info = 'info',
  Warn = 'warn',
  Critical = 'critical',
}

export interface SensorReading {
  id: string;
  label: string;
  unit: string;
  value: number;
  threshold_warn: number;
  threshold_critical: number;
  status: SensorStatus;
  ts: number;
}

export interface TelemetryTick {
  readings: SensorReading[];
  ts: number;
}

export interface TelemetryEventLogEntry {
  ts: number;
  message: string;
  type: TelemetryEventType;
}

export interface TelemetryState {
  connected: boolean;
  readings: SensorReading[];
  history: Record<string, number[]>;
  eventLog: TelemetryEventLogEntry[];
  tickCount: number;
}

/** Max event-log lines kept in memory and rendered (oldest dropped). */
export const TELEMETRY_EVENT_LOG_MAX: number = 40;
