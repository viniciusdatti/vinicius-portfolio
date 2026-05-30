// Libraries
import { DefaultTheme } from 'styled-components';

// Types
import { SensorStatus } from '../../types/telemetry';

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
