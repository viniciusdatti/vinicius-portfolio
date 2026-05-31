// Types
import {
  SensorReading,
  TELEMETRY_EVENT_LOG_MAX,
  TelemetryEventLogEntry,
  TelemetryTick,
} from '../../types/telemetry';

// Lib
import {
  appendNominalTickEventLog,
  appendSensorReadingEventLogs,
  TelemetryWarnLogGate,
  trimTelemetryEventLog,
} from './telemetryEventLog';
import {
  appendTickReadingsToHistory,
  TELEMETRY_HISTORY_MAX,
} from './telemetryHistory';

export interface TelemetryTickSlice {
  readings: SensorReading[];
  history: Record<string, number[]>;
  eventLog: TelemetryEventLogEntry[];
  tickCount: number;
}

export interface ProcessTelemetryTickOptions {
  translate: (key: string) => string;
  shouldAppendWarnLog?: TelemetryWarnLogGate;
  maxHistory?: number;
  maxEventLog?: number;
}

export const processTelemetryTick = (
  prev: TelemetryTickSlice,
  tick: TelemetryTick,
  options: ProcessTelemetryTickOptions,
): TelemetryTickSlice => {
  const {
    translate,
    shouldAppendWarnLog,
    maxHistory = TELEMETRY_HISTORY_MAX,
    maxEventLog = TELEMETRY_EVENT_LOG_MAX,
  } = options;

  const nextTick: number = prev.tickCount + 1;
  const localReadings: SensorReading[] = tick.readings;
  const nextHistory: Record<string, number[]> = appendTickReadingsToHistory(
    prev.history,
    localReadings,
    maxHistory,
  );

  let nextLog: TelemetryEventLogEntry[] = appendSensorReadingEventLogs(
    prev.eventLog,
    localReadings,
    translate,
    shouldAppendWarnLog,
  );

  nextLog = appendNominalTickEventLog(
    nextLog,
    nextTick,
    localReadings,
    translate,
  );

  return {
    readings: localReadings,
    history: nextHistory,
    eventLog: trimTelemetryEventLog(nextLog, maxEventLog),
    tickCount: nextTick,
  };
};
