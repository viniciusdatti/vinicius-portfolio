// Core
import React from 'react';

// Hooks
import { useCanvasTelemetryField } from '../../../hooks/useCanvasTelemetryField';

// Styles
import {
  ObservatoryCanvasElement,
  ObservatoryCanvasLayer,
} from './ObservatoryCanvas2D.style';

// Lib
import { TelemetryFieldVariant } from '../../../lib/telemetryFieldCanvas/index';

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
