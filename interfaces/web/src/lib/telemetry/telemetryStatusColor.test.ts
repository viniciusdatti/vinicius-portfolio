// Libraries
import {
  describe,
  expect,
  it,
} from 'vitest';

// Styles
import { darkTheme } from '../../styles/theme';

// Types
import { SensorStatus } from '../../types/telemetry';

// Telemetry
import {
  getTelemetryStatusColor,
  getTelemetryStatusSurface,
} from './telemetryStatusColor';

describe('lib/telemetry', (): void => {
  // METHOD: getTelemetryStatusColor *******************************

  it('should map SensorStatus enum values to theme colors', (): void => {
    expect(getTelemetryStatusColor(SensorStatus.Critical, darkTheme)).toBe(
      darkTheme.colors.error,
    );
    expect(getTelemetryStatusColor(SensorStatus.Warn, darkTheme)).toBe(
      darkTheme.colors.warning,
    );
    expect(getTelemetryStatusColor(SensorStatus.Ok, darkTheme)).toBe(
      darkTheme.colors.success,
    );
  });

  // METHOD: getTelemetryStatusSurface *******************************

  it('should map SensorStatus enum values to theme surfaces', (): void => {
    expect(getTelemetryStatusSurface(SensorStatus.Critical, darkTheme)).toBe(
      darkTheme.colors.errorSurface,
    );
    expect(getTelemetryStatusSurface(SensorStatus.Warn, darkTheme)).toBe(
      darkTheme.colors.warningSurface,
    );
    expect(getTelemetryStatusSurface(SensorStatus.Ok, darkTheme)).toBe(
      darkTheme.colors.successSurface,
    );
  });
});
