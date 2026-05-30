// Types
import {
  SensorStatus,
  TelemetryEventType,
} from '../../../types/telemetry';

export enum ObservatoryDataMode {
  Simulated = 'simulated',
  Live = 'live',
}

export interface LiveLabObservatorySensorDef {
  id: string;
  label: string;
  unit: string;
  base: number;
  variance: number;
  status: SensorStatus;
  liveValue?: number;
  sparklineValues?: number[];
}

export interface LiveLabObservatoryLogLine {
  time: string;
  msg: string;
  type?: TelemetryEventType;
}

export interface LiveLabObservatorySparklineProps {
  seed: number;
  strokeColor: string;
  values?: number[];
}

export interface LiveLabObservatoryAnimatedValueProps {
  base: number;
  variance: number;
  unit: string;
  status: SensorStatus;
  liveValue?: number;
}

export interface LiveLabObservatoryViewProps {
  dataMode: ObservatoryDataMode;
  apiLabel: string;
  isApiLive: boolean;
  isTransportLive: boolean;
  transportModeLabel: string;
  sensors: LiveLabObservatorySensorDef[];
  logs: LiveLabObservatoryLogLine[];
  tick: number;
  aggregateSpark: number[];
}
