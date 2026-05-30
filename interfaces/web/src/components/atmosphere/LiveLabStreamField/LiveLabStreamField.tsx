// Core
import React, { useMemo } from 'react';

// Hooks
import { useCanvasTelemetryField } from '../../../hooks/useCanvasTelemetryField';
import { useSocketThrottledValue } from '../../../hooks/useSocketThrottledValue';

// Styles
import {
  LiveLabStreamCanvas,
  LiveLabStreamLayer,
} from './LiveLabStreamField.style';

// Lib
import { TelemetryFieldVariant } from '../../../lib/telemetryFieldCanvas';

// Workspace
import { useTelemetry } from '../../workspace/TelemetryProvider';

const STREAM_TICK_THROTTLE_MS: number = 80;

export const LiveLabStreamField: React.FC = (): React.ReactElement => {
  const { tickCount, connected } = useTelemetry();
  const throttledTick: number = useSocketThrottledValue(tickCount, {
    intervalMs: STREAM_TICK_THROTTLE_MS,
  });

  const pulse: number = useMemo((): number => {
    if (!connected) {
      return 0;
    }
    return 0.25 + (throttledTick % 12) * 0.08;
  }, [connected, throttledTick]);

  const { canvasRef, bindContainerRef } = useCanvasTelemetryField({
    variant: TelemetryFieldVariant.LiveLabStream,
    pulse,
    maxDevicePixelRatio: 1.5,
  });

  return (
    <LiveLabStreamLayer
      ref={bindContainerRef}
      data-telemetry-stream
      aria-hidden
    >
      <LiveLabStreamCanvas ref={canvasRef} />
    </LiveLabStreamLayer>
  );
};
