// Core
import React from 'react';

// Hooks
import { useCanvasTelemetryField } from '@/hooks/useCanvasTelemetryField';

// Types
import { TelemetryFieldVariant } from '@/lib/telemetryFieldCanvas';

// Components
import {
  ObservatoryCanvasElement,
  ObservatoryCanvasLayer,
} from '@/components/atmosphere/ObservatoryCanvas2D/ObservatoryCanvas2D.style';

/* *************************************************************************************************
 ******************************************** COMPONENT ********************************************
 ************************************************************************************************ */

/**
 * Canvas2D telemetry field behind the home Live Lab observatory preview.
 */
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
