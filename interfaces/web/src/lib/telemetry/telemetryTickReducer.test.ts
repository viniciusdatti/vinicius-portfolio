// Libraries
import {
  describe,
  expect,
  it,
} from 'vitest';

// Types
import {
  SensorReading,
  SensorStatus,
  TelemetryEventLogEntry,
  TelemetryEventType,
  TelemetryTick,
} from '../../types/telemetry';

// Lib
import { processTelemetryTick, TelemetryTickSlice } from './telemetryTickReducer';

const translate = (key: string): string => key;

const buildReading = (
  overrides: Partial<SensorReading> = {},
): SensorReading => ({
  id: 'temp-01',
  label: 'temperature',
  unit: '°C',
  value: 42,
  threshold_warn: 50,
  threshold_critical: 60,
  status: SensorStatus.Ok,
  ts: 1_700_000_000_000,
  ...overrides,
});

const buildTick = (readings: SensorReading[]): TelemetryTick => ({
  ts: Date.now(),
  readings,
});

const buildPrev = (overrides: Partial<TelemetryTickSlice> = {}): TelemetryTickSlice => ({
  readings: [],
  history: {},
  eventLog: [{ ts: 1, message: 'seed', type: TelemetryEventType.Info }],
  tickCount: 0,
  ...overrides,
});

describe('lib/telemetry/telemetryTickReducer', (): void => {
  // METHOD: processTelemetryTick *******************************

  it('should increment tick count and store readings', (): void => {
    const tick: TelemetryTick = buildTick([buildReading()]);
    const next = processTelemetryTick(buildPrev(), tick, {
      translate,
      shouldAppendWarnLog: (): boolean => false,
    });

    expect(next.tickCount).toBe(1);
    expect(next.readings).toEqual(tick.readings);
  });

  it('should append reading values to history', (): void => {
    const tick: TelemetryTick = buildTick([buildReading({ value: 42 })]);
    const next = processTelemetryTick(buildPrev(), tick, {
      translate,
      shouldAppendWarnLog: (): boolean => false,
    });

    expect(next.history['temp-01']).toEqual([42]);
  });

  it('should append critical logs and trim event log length', (): void => {
    const eventLog: TelemetryEventLogEntry[] = Array.from(
      { length: 40 },
      (_unused: unknown, index: number): TelemetryEventLogEntry => ({
        ts: index,
        message: `line-${index}`,
        type: TelemetryEventType.Info,
      }),
    );
    const tick: TelemetryTick = buildTick([
      buildReading({ status: SensorStatus.Critical, value: 88 }),
    ]);
    const next = processTelemetryTick(buildPrev({ eventLog }), tick, {
      translate,
      shouldAppendWarnLog: (): boolean => false,
    });

    expect(next.eventLog[0].type).toBe(TelemetryEventType.Critical);
    expect(next.eventLog).toHaveLength(40);
  });

  it('should append nominal log on the 8th tick', (): void => {
    const tick: TelemetryTick = buildTick([buildReading({ value: 33 })]);
    const next = processTelemetryTick(buildPrev({ tickCount: 7 }), tick, {
      translate,
      shouldAppendWarnLog: (): boolean => false,
    });

    expect(next.tickCount).toBe(8);
    expect(next.eventLog[0].message).toContain('nominal');
  });

  it('should preserve prior event log entries after tick processing', (): void => {
    const tick: TelemetryTick = buildTick([buildReading()]);
    const next = processTelemetryTick(buildPrev(), tick, {
      translate,
      shouldAppendWarnLog: (): boolean => false,
    });

    expect(next.eventLog.some((entry: TelemetryEventLogEntry) => entry.message === 'seed')).toBe(
      true,
    );
  });

  it('should append warn logs when gate returns true', (): void => {
    const tick: TelemetryTick = buildTick([
      buildReading({ status: SensorStatus.Warn, value: 55 }),
    ]);
    const next = processTelemetryTick(buildPrev(), tick, {
      translate,
      shouldAppendWarnLog: (): boolean => true,
    });

    expect(next.eventLog[0].type).toBe(TelemetryEventType.Warn);
  });
});
