// Types
import type { SensorReading } from '@/types/telemetry';

// Components
import { resolveI18nKeyOrFallback } from '@/lib/i18nDisplay';

/** Legacy API ids from older telemetry demos — map to current generic i18n keys. */
const LEGACY_SENSOR_I18N_ID: Record<string, string> = {
  crusher_rpm: 'spin_rate',
  motor_temp: 'thermal',
  feed_pressure: 'pressure',
};

/**
 * Normalizes sensor id for `liveLab.monitor.sensors.*` (ignores domain-specific legacy ids).
 */
export const resolveTelemetrySensorI18nId = (sensorId: string): string => (
  LEGACY_SENSOR_I18N_ID[sensorId] ?? sensorId
);

/**
 * Display label for telemetry cards and chart legend (never shows legacy Crusher/Motor/Feed copy).
 */
export const resolveTelemetrySensorLabel = (
  reading: SensorReading,
  translate: (key: string) => string,
): string => {
  const i18nId: string = resolveTelemetrySensorI18nId(reading.id);
  const key: string = `liveLab.monitor.sensors.${i18nId}`;
  const genericFallback: string = translate('liveLab.monitor.sensors.unknown');
  return resolveI18nKeyOrFallback(key, genericFallback, translate);
};
