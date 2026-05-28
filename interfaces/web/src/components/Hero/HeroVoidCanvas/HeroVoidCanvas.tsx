// Core
import React from 'react';

// Libraries
import { TelemetryFieldVariant } from '../../../lib/telemetryFieldCanvas';

// Hooks
import { useCanvasTelemetryField } from '../../../hooks/useCanvasTelemetryField';

// Component
import type { HeroVoidCanvasProps } from './HeroVoidCanvas.types';
import {
  HeroVoidCanvasElement,
  HeroVoidCanvasLayer,
} from './HeroVoidCanvas.style';

export const HeroVoidCanvas: React.FC<HeroVoidCanvasProps> = ({
  pointer,
}): React.ReactElement => {
  const { canvasRef, bindContainerRef } = useCanvasTelemetryField({
    variant: TelemetryFieldVariant.Void,
    pointer: {
      x: pointer.x,
      y: pointer.y,
      active: pointer.active,
    },
    pulse: pointer.pulse,
    maxDevicePixelRatio: 1.5,
  });

  return (
    <HeroVoidCanvasLayer ref={bindContainerRef} aria-hidden>
      <HeroVoidCanvasElement ref={canvasRef} />
    </HeroVoidCanvasLayer>
  );
};
