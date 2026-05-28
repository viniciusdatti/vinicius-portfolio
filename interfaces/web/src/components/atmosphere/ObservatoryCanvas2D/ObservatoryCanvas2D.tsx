// Core
import React from 'react';

// Libraries
import { TelemetryFieldVariant } from '../../../lib/telemetryFieldCanvas';

// Hooks
import { useCanvasTelemetryField } from '../../../hooks/useCanvasTelemetryField';

// Component
import {
  ObservatoryCanvasElement,
  ObservatoryCanvasLayer,
} from './ObservatoryCanvas2D.style';

export const ObservatoryCanvas2D = (): React.ReactElement => {
  const { canvasRef, bindContainerRef } = useCanvasTelemetryField({
    variant: TelemetryFieldVariant.Observatory,
  });

  return (
    <ObservatoryCanvasLayer ref={bindContainerRef} aria-hidden>
      <ObservatoryCanvasElement ref={canvasRef} />
    </ObservatoryCanvasLayer>
  );
};
