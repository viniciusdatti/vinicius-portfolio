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
  TELEMETRY_EVENT_LOG_MAX,
} from '../../types/telemetry';

// Lib
import {
  appendReadingToHistory,
  appendTickReadingsToHistory,
  TELEMETRY_HISTORY_MAX,
} from './telemetryHistory';

const buildReading = (
  id: string,
  value: number,
): SensorReading => ({
  id,
  label: id,
  unit: 'u',
  value,
  threshold_warn: 50,
  threshold_critical: 60,
  status: SensorStatus.Ok,
  ts: 1_700_000_000_000,
});

describe('lib/telemetry/telemetryHistory', (): void => {
  // METHOD: appendReadingToHistory *******************************

  it('should append a reading value to an empty history channel', (): void => {
    const reading: SensorReading = buildReading('temp-01', 42);
    const history: Record<string, number[]> = appendReadingToHistory({}, reading);

    expect(history['temp-01']).toEqual([42]);
  });

  it('should append to an existing channel and trim to max history', (): void => {
    const existing: number[] = Array.from(
      { length: TELEMETRY_HISTORY_MAX },
      (_unused: unknown, index: number): number => index,
    );
    const reading: SensorReading = buildReading('temp-01', 99);
    const history: Record<string, number[]> = appendReadingToHistory(
      { 'temp-01': existing },
      reading,
    );

    expect(history['temp-01']).toHaveLength(TELEMETRY_HISTORY_MAX);
    expect(history['temp-01'][TELEMETRY_HISTORY_MAX - 1]).toBe(99);
    expect(history['temp-01'][0]).toBe(1);
  });

  // METHOD: appendTickReadingsToHistory *******************************

  it('should append all tick readings across channels', (): void => {
    const readings: SensorReading[] = [
      buildReading('temp-01', 10),
      buildReading('press-01', 20),
    ];
    const history: Record<string, number[]> = appendTickReadingsToHistory({}, readings);

    expect(history['temp-01']).toEqual([10]);
    expect(history['press-01']).toEqual([20]);
  });
});

describe('lib/telemetry/telemetryHistory constants', (): void => {
  it('should expose TELEMETRY_HISTORY_MAX aligned with hook usage', (): void => {
    expect(TELEMETRY_HISTORY_MAX).toBe(30);
    expect(TELEMETRY_EVENT_LOG_MAX).toBe(40);
  });
});
