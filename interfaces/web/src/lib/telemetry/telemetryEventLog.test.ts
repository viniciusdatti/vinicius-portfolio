// Libraries
import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

// Types
import {
  SensorReading,
  SensorStatus,
  TELEMETRY_EVENT_LOG_MAX,
  TelemetryEventLogEntry,
  TelemetryEventType,
} from '../../types/telemetry';

// Lib
import {
  appendNominalTickEventLog,
  appendSensorReadingEventLogs,
  buildConnectErrorEventLogEntry,
  buildConnectEventLogEntries,
  buildDisconnectEventLogEntry,
  buildNominalTickEventLogEntry,
  buildReconnectAttemptEventLogEntry,
  createInitialTelemetryEventLog,
  prependTelemetryEventLog,
  trimTelemetryEventLog,
} from './telemetryEventLog';

const translate = (key: string): string => key;

const buildReading = (
  overrides: Partial<SensorReading> = {},
): SensorReading => ({
  id: 'spin_rate',
  label: 'Spin rate',
  unit: 'rpm',
  value: 42,
  threshold_warn: 50,
  threshold_critical: 60,
  status: SensorStatus.Ok,
  ts: 1_700_000_000_000,
  ...overrides,
});

describe('lib/telemetry/telemetryEventLog', (): void => {
  // METHOD: bootstrap / transport logs *******************************

  it('should build initial bootstrap log entries', (): void => {
    const now: number = 10_000;
    const entries: TelemetryEventLogEntry[] = createInitialTelemetryEventLog(now);

    expect(entries).toHaveLength(2);
    expect(entries[0].ts).toBe(now - 1200);
    expect(entries[0].type).toBe(TelemetryEventType.Info);
    expect(entries[1].message).toContain('/telemetry');
  });

  it('should build connect log entries with staggered timestamps', (): void => {
    const now: number = 20_000;
    const entries: TelemetryEventLogEntry[] = buildConnectEventLogEntries(now);

    expect(entries).toHaveLength(3);
    expect(entries[0].ts).toBe(now);
    expect(entries[1].ts).toBe(now - 80);
    expect(entries[2].ts).toBe(now - 160);
    expect(entries[0].message).toContain('WebSocket connected');
  });

  it('should build disconnect, reconnect, and connect error entries', (): void => {
    expect(buildDisconnectEventLogEntry(100).type).toBe(TelemetryEventType.Warn);
    expect(buildReconnectAttemptEventLogEntry(100, 3).message).toContain('#3');
    expect(buildConnectErrorEventLogEntry(100, 'refused').message).toContain('refused');
  });

  // METHOD: prependTelemetryEventLog *******************************

  it('should prepend entries and trim to max length', (): void => {
    const prevLog: TelemetryEventLogEntry[] = Array.from(
      { length: TELEMETRY_EVENT_LOG_MAX },
      (_unused: unknown, index: number): TelemetryEventLogEntry => ({
        ts: index,
        message: `old-${index}`,
        type: TelemetryEventType.Info,
      }),
    );
    const next: TelemetryEventLogEntry[] = prependTelemetryEventLog(prevLog, [{
      ts: 999,
      message: 'new',
      type: TelemetryEventType.Warn,
    }]);

    expect(next).toHaveLength(TELEMETRY_EVENT_LOG_MAX);
    expect(next[0].message).toBe('new');
  });

  // METHOD: appendSensorReadingEventLogs *******************************

  it('should prepend a critical reading log entry', (): void => {
    const reading: SensorReading = buildReading({
      status: SensorStatus.Critical,
      value: 88,
    });
    const nextLog: TelemetryEventLogEntry[] = appendSensorReadingEventLogs(
      [],
      [reading],
      translate,
      (): boolean => false,
    );

    expect(nextLog[0].type).toBe(TelemetryEventType.Critical);
    expect(nextLog[0].message).toContain('CRITICAL');
    expect(nextLog[0].message).toContain('88rpm');
  });

  it('should prepend warn logs only when gate returns true', (): void => {
    const reading: SensorReading = buildReading({
      status: SensorStatus.Warn,
      value: 55,
    });
    const blocked: TelemetryEventLogEntry[] = appendSensorReadingEventLogs(
      [],
      [reading],
      translate,
      (): boolean => false,
    );
    const allowed: TelemetryEventLogEntry[] = appendSensorReadingEventLogs(
      [],
      [reading],
      translate,
      (): boolean => true,
    );

    expect(blocked).toHaveLength(0);
    expect(allowed[0].type).toBe(TelemetryEventType.Warn);
    expect(allowed[0].message).toContain('warning');
  });

  it('should preserve reverse insertion order for multiple critical readings', (): void => {
    const readings: SensorReading[] = [
      buildReading({ id: 'a', status: SensorStatus.Critical, value: 1 }),
      buildReading({ id: 'b', status: SensorStatus.Critical, value: 2 }),
    ];
    const nextLog: TelemetryEventLogEntry[] = appendSensorReadingEventLogs(
      [],
      readings,
      translate,
      (): boolean => false,
    );

    expect(nextLog[0].message).toContain('2rpm');
    expect(nextLog[1].message).toContain('1rpm');
  });

  // METHOD: nominal tick logs *******************************

  it('should return null nominal entry when tick is not divisible by 8', (): void => {
    const entry: TelemetryEventLogEntry | null = buildNominalTickEventLogEntry(
      7,
      [buildReading()],
      translate,
    );

    expect(entry).toBeNull();
  });

  it('should build nominal entry on every 8th tick for stable readings', (): void => {
    const readings: SensorReading[] = [
      buildReading({ id: 'a', value: 10 }),
      buildReading({ id: 'b', value: 20 }),
    ];
    const entry: TelemetryEventLogEntry | null = buildNominalTickEventLogEntry(
      8,
      readings,
      translate,
    );

    expect(entry?.type).toBe(TelemetryEventType.Info);
    expect(entry?.message).toContain('nominal');
    expect(entry?.message).toContain('10rpm');
  });

  it('should prepend nominal entry via appendNominalTickEventLog', (): void => {
    const readings: SensorReading[] = [buildReading({ value: 15 })];
    const nextLog: TelemetryEventLogEntry[] = appendNominalTickEventLog(
      [{ ts: 1, message: 'existing', type: TelemetryEventType.Info }],
      8,
      readings,
      translate,
    );

    expect(nextLog[0].message).toContain('nominal');
    expect(nextLog[1].message).toBe('existing');
  });

  // METHOD: trimTelemetryEventLog *******************************

  it('should trim event log to configured max', (): void => {
    const longLog: TelemetryEventLogEntry[] = Array.from(
      { length: 50 },
      (_unused: unknown, index: number): TelemetryEventLogEntry => ({
        ts: index,
        message: `line-${index}`,
        type: TelemetryEventType.Info,
      }),
    );

    expect(trimTelemetryEventLog(longLog)).toHaveLength(TELEMETRY_EVENT_LOG_MAX);
  });

  it('should call Math.random per warn reading when gate uses default', (): void => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.1);
    const reading: SensorReading = buildReading({ status: SensorStatus.Warn });

    appendSensorReadingEventLogs([], [reading], translate);

    expect(randomSpy).toHaveBeenCalledTimes(1);
    randomSpy.mockRestore();
  });
});
