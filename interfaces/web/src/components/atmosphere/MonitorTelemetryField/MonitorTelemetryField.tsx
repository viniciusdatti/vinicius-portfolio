// Core
import React, { useMemo } from 'react';

// Hooks
import { useCanvasTelemetryField } from '../../../hooks/useCanvasTelemetryField';
import { useSocketThrottledValue } from '../../../hooks/useSocketThrottledValue';

// Styles
import {
  MonitorFieldCanvas,
  MonitorFieldLayer,
} from './MonitorTelemetryField.style';

// Lib
import { TelemetryFieldVariant } from '../../../lib/telemetryFieldCanvas';

// Workspace
import { useTelemetry } from '../../workspace/TelemetryProvider';

const SOCKET_FIELD_THROTTLE_MS: number = 100;

export const MonitorTelemetryField = (): React.ReactElement => {
  const { tickCount, connected } = useTelemetry();
  const throttledTick: number = useSocketThrottledValue(tickCount, {
    intervalMs: SOCKET_FIELD_THROTTLE_MS,
  });

  const pulse: number = useMemo((): number => {
    if (!connected) {
      return 0;
    }
    return 0.35 + (throttledTick % 10) * 0.065;
  }, [connected, throttledTick]);

  const { canvasRef, bindContainerRef } = useCanvasTelemetryField({
    variant: TelemetryFieldVariant.Monitor,
    pulse,
  });

  return (
    <MonitorFieldLayer
      ref={bindContainerRef}
      data-telemetry-field
      aria-hidden
    >
      <MonitorFieldCanvas ref={canvasRef} />
    </MonitorFieldLayer>
  );
};
