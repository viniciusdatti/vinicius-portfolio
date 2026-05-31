/**
 * Live Lab home preview telemetry helpers.
 *
 * Data modes:
 * - Simulated — API offline; deterministic demo values for portfolio storytelling.
 * - Live — API online; WebSocket ticks from useTelemetrySocket when connected.
 */
// Libraries
import { TFunction } from 'i18next';

// Types
import {
  SensorReading,
  SensorStatus,
  TelemetryEventLogEntry,
  TelemetryEventType,
} from '../../../types/telemetry';
import {
  LiveLabObservatoryLogLine,
  LiveLabObservatorySensorDef,
  ObservatoryDataMode,
} from './LiveLabObservatory.types';

// Lib
import { formatClockTime } from '../../../lib/i18n';
import { resolveTelemetrySensorLabel } from '../../../lib/telemetry';

export const LOG_MESSAGE_KEYS: readonly string[] = [
  'home.liveLabPreview.log.tick',
  'home.liveLabPreview.log.heartbeat',
  'home.liveLabPreview.log.threshold',
  'home.liveLabPreview.log.buffer',
  'home.liveLabPreview.log.sync',
];

export const getObservatorySensors = (
  t: (key: string) => string,
): LiveLabObservatorySensorDef[] => [
  {
    id: 'temp',
    label: t('home.liveLabPreview.sensors.temp'),
    unit: '°C',
    base: 72.4,
    variance: 1.2,
    status: SensorStatus.Ok,
  },
  {
    id: 'vib',
    label: t('home.liveLabPreview.sensors.vib'),
    unit: 'mm/s',
    base: 8.1,
    variance: 0.4,
    status: SensorStatus.Warn,
  },
  {
    id: 'press',
    label: t('home.liveLabPreview.sensors.press'),
    unit: 'bar',
    base: 3.2,
    variance: 0.08,
    status: SensorStatus.Ok,
  },
  {
    id: 'amp',
    label: t('home.liveLabPreview.sensors.amp'),
    unit: 'A',
    base: 14.8,
    variance: 0.6,
    status: SensorStatus.Ok,
  },
];

export const buildObservatorySparkline = (seed: number, len: number): number[] => {
  const out: number[] = [];
  let v: number = seed;
  for (let i: number = 0; i < len; i += 1) {
    v += (Math.sin(i * 0.7 + seed) * 0.08 + (Math.random() - 0.5) * 0.06);
    out.push(v);
  }
  return out;
};

export const sparkPathFromValues = (values: number[], w: number, h: number): string => {
  if (values.length === 0) {
    return '';
  }
  if (values.length === 1) {
    const y: number = h / 2;
    return `M0,${y.toFixed(1)} L${w.toFixed(1)},${y.toFixed(1)}`;
  }

  const min: number = Math.min(...values);
  const max: number = Math.max(...values);
  const range: number = max - min || 1;
  return values
    .map((v: number, i: number) => {
      const x: number = (i / (values.length - 1)) * w;
      const y: number = h - ((v - min) / range) * (h - 4) - 2;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
};

export const mapTelemetryReadingsToSensors = (
  readings: SensorReading[],
  history: Record<string, number[]>,
  t: TFunction,
  fallback: LiveLabObservatorySensorDef[],
): LiveLabObservatorySensorDef[] => {
  if (readings.length === 0) {
    return fallback;
  }

  return readings.slice(0, 4).map((reading: SensorReading): LiveLabObservatorySensorDef => ({
    id: reading.id,
    label: resolveTelemetrySensorLabel(reading, t),
    unit: reading.unit,
    base: reading.value,
    variance: 0,
    status: reading.status,
    liveValue: reading.value,
    sparklineValues: history[reading.id],
  }));
};

export const mapTelemetryLogEntries = (
  entries: TelemetryEventLogEntry[],
  language: string,
  limit: number = 4,
): LiveLabObservatoryLogLine[] => (
  entries.slice(0, limit).map((entry: TelemetryEventLogEntry): LiveLabObservatoryLogLine => ({
    time: formatClockTime(entry.ts, language),
    msg: entry.message,
    type: entry.type,
  }))
);

export const buildAggregateSparkFromHistory = (
  history: Record<string, number[]>,
  seed: number,
  len: number = 32,
): number[] => {
  const series: number[][] = Object.values(history).filter((values: number[]) => values.length > 0);
  if (series.length === 0) {
    return buildObservatorySparkline(seed, len);
  }

  const maxLen: number = Math.max(...series.map((values: number[]) => values.length));
  const out: number[] = [];
  for (let i: number = 0; i < maxLen; i += 1) {
    let sum: number = 0;
    let count: number = 0;
    series.forEach((values: number[]) => {
      const value: number | undefined = values[i];
      if (typeof value === 'number') {
        sum += value;
        count += 1;
      }
    });
    out.push(count > 0 ? sum / count : seed);
  }
  return out.length >= 2 ? out : buildObservatorySparkline(seed, len);
};

export const resolveObservatoryTransportLabel = (
  dataMode: ObservatoryDataMode,
  isTransportLive: boolean,
  t: TFunction,
): string => {
  if (dataMode === ObservatoryDataMode.Simulated) {
    return t('home.liveLabPreview.footer.modeSimulated');
  }
  if (isTransportLive) {
    return t('home.liveLabPreview.footer.modeLive');
  }
  return t('home.liveLabPreview.metrics.transportSync');
};

export const resolveLogTypeFromMessageKey = (
  messageKey: string,
): TelemetryEventType => (
  messageKey.includes('threshold')
    ? TelemetryEventType.Warn
    : TelemetryEventType.Info
);
