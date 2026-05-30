// Types
import { SensorReading } from '../../../../types/telemetry';

export interface OperationalKpiStripProps {
  readings: SensorReading[];
  tickCount: number;
  connected: boolean;
}
