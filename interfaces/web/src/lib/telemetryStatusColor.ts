// Libraries
import type { DefaultTheme } from 'styled-components';

// Types
import { SensorStatus } from '@/types/telemetry';

/**
 * Operational status color for Live Lab telemetry (distinct from brand amber).
 */
export const getTelemetryStatusColor = (
  status: SensorStatus,
  theme: DefaultTheme,
): string => {
  if (status === SensorStatus.Critical) {
    return theme.colors.error;
  }
  if (status === SensorStatus.Warn) {
    return theme.colors.warning;
  }
  return theme.colors.success;
};

/**
 * Surface tint for sparklines and badge backgrounds.
 */
export const getTelemetryStatusSurface = (
  status: SensorStatus,
  theme: DefaultTheme,
): string => {
  if (status === SensorStatus.Critical) {
    return theme.colors.errorSurface;
  }
  if (status === SensorStatus.Warn) {
    return theme.colors.warningSurface;
  }
  return theme.colors.successSurface;
};
