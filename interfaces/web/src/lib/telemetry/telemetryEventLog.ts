// Types
import {
  SensorReading,
  SensorStatus,
  TELEMETRY_EVENT_LOG_MAX,
  TelemetryEventLogEntry,
  TelemetryEventType,
} from '../../types/telemetry';

// Lib
import { resolveTelemetrySensorLabel } from './telemetrySensorDisplay';

export type TelemetryWarnLogGate = () => boolean;

export const createInitialTelemetryEventLog = (
  now: number = Date.now(),
): TelemetryEventLogEntry[] => [
  {
    ts: now - 1200,
    message: 'Initializing telemetry client…',
    type: TelemetryEventType.Info,
  },
  {
    ts: now - 600,
    message: 'Opening socket · namespace /telemetry',
    type: TelemetryEventType.Info,
  },
];

export const prependTelemetryEventLog = (
  prevLog: TelemetryEventLogEntry[],
  entries: TelemetryEventLogEntry[],
  max: number = TELEMETRY_EVENT_LOG_MAX,
): TelemetryEventLogEntry[] => [...entries, ...prevLog].slice(0, max);

export const buildConnectEventLogEntries = (
  now: number,
): TelemetryEventLogEntry[] => [
  {
    ts: now,
    message: 'WebSocket connected · namespace /telemetry',
    type: TelemetryEventType.Info,
  },
  {
    ts: now - 80,
    message: 'Handshake complete · awaiting telemetry',
    type: TelemetryEventType.Info,
  },
  {
    ts: now - 160,
    message: 'Sensor scan started · 2s interval',
    type: TelemetryEventType.Info,
  },
];

export const buildDisconnectEventLogEntry = (
  now: number,
): TelemetryEventLogEntry => ({
  ts: now,
  message: 'Transport disconnected — awaiting reconnection',
  type: TelemetryEventType.Warn,
});

export const buildReconnectAttemptEventLogEntry = (
  now: number,
  attempt: number,
): TelemetryEventLogEntry => ({
  ts: now,
  message: `Reconnection attempt #${attempt}…`,
  type: TelemetryEventType.Warn,
});

export const buildConnectErrorEventLogEntry = (
  now: number,
  errorMessage: string,
): TelemetryEventLogEntry => ({
  ts: now,
  message: `Transport failure · ${errorMessage}`,
  type: TelemetryEventType.Warn,
});

export const appendSensorReadingEventLogs = (
  eventLog: TelemetryEventLogEntry[],
  readings: SensorReading[],
  translate: (key: string) => string,
  shouldAppendWarnLog: TelemetryWarnLogGate = (): boolean => Math.random() < 0.3,
): TelemetryEventLogEntry[] => {
  const nextLog: TelemetryEventLogEntry[] = [...eventLog];

  readings.forEach((reading: SensorReading): void => {
    const channelLabel: string = resolveTelemetrySensorLabel(reading, translate);

    if (reading.status === SensorStatus.Critical) {
      nextLog.unshift({
        ts: reading.ts,
        message: `${channelLabel} CRITICAL · ${reading.value}${reading.unit} (limit: ${reading.threshold_critical}${reading.unit})`,
        type: TelemetryEventType.Critical,
      });
      return;
    }

    if (reading.status === SensorStatus.Warn && shouldAppendWarnLog()) {
      nextLog.unshift({
        ts: reading.ts,
        message: `${channelLabel} warning · ${reading.value}${reading.unit}`,
        type: TelemetryEventType.Warn,
      });
    }
  });

  return nextLog;
};

export const buildNominalTickEventLogEntry = (
  nextTick: number,
  readings: SensorReading[],
  translate: (key: string) => string,
): TelemetryEventLogEntry | null => {
  if (nextTick % 8 !== 0) {
    return null;
  }

  const stable: SensorReading[] = readings.filter(
    (reading: SensorReading) => reading.status === SensorStatus.Ok,
  );

  if (stable.length === 0) {
    return null;
  }

  const pick: SensorReading = stable[nextTick % stable.length];
  const channelLabel: string = resolveTelemetrySensorLabel(pick, translate);

  return {
    ts: pick.ts,
    message: `${channelLabel} nominal · ${pick.value}${pick.unit}`,
    type: TelemetryEventType.Info,
  };
};

export const appendNominalTickEventLog = (
  eventLog: TelemetryEventLogEntry[],
  nextTick: number,
  readings: SensorReading[],
  translate: (key: string) => string,
): TelemetryEventLogEntry[] => {
  const nominalEntry: TelemetryEventLogEntry | null = buildNominalTickEventLogEntry(
    nextTick,
    readings,
    translate,
  );

  if (!nominalEntry) {
    return eventLog;
  }

  const nextLog: TelemetryEventLogEntry[] = [...eventLog];
  nextLog.unshift(nominalEntry);
  return nextLog;
};

export const trimTelemetryEventLog = (
  eventLog: TelemetryEventLogEntry[],
  max: number = TELEMETRY_EVENT_LOG_MAX,
): TelemetryEventLogEntry[] => eventLog.slice(0, max);
