/**
 * @fileoverview Sparkline and sensor seed helpers for the home observatory preview.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Types
import { SensorStatus } from '@/types/telemetry';
import type { LiveLabObservatorySensorDef } from '@/components/home/LiveLabObservatory/LiveLabObservatory.types';

/* *************************************************************************************************
 ******************************************** CONSTANTS ********************************************
 ************************************************************************************************ */

export const LOG_MESSAGE_KEYS: readonly string[] = [
  'home.liveLabPreview.log.tick',
  'home.liveLabPreview.log.heartbeat',
  'home.liveLabPreview.log.threshold',
  'home.liveLabPreview.log.buffer',
  'home.liveLabPreview.log.sync',
];

/* *************************************************************************************************
 ********************************************* METHODS *********************************************
 ************************************************************************************************ */

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
