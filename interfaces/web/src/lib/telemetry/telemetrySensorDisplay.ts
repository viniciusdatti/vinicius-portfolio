// Types
import { SensorReading } from '../../types/telemetry';

// I18n
import { resolveI18nKeyOrFallback } from '../i18n/i18nDisplay';

const LEGACY_SENSOR_I18N_ID: Record<string, string> = {
  crusher_rpm: 'spin_rate',
  motor_temp: 'thermal',
  feed_pressure: 'pressure',
};

export const resolveTelemetrySensorI18nId = (sensorId: string): string => (
  LEGACY_SENSOR_I18N_ID[sensorId] ?? sensorId
);

export const resolveTelemetrySensorLabel = (
  reading: SensorReading,
  translate: (key: string) => string,
): string => {
  const i18nId: string = resolveTelemetrySensorI18nId(reading.id);
  const key: string = `liveLab.monitor.sensors.${i18nId}`;
  const genericFallback: string = translate('liveLab.monitor.sensors.unknown');
  return resolveI18nKeyOrFallback(key, genericFallback, translate);
};
