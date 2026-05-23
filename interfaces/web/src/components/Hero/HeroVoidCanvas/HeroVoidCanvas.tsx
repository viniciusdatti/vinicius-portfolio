// Core
import React from 'react';

// Hooks
import { useCanvasTelemetryField } from '@/hooks/useCanvasTelemetryField';

// Types
import type { HeroVoidCanvasProps } from '@/components/Hero/HeroVoidCanvas/HeroVoidCanvas.types';
import { TelemetryFieldVariant } from '@/lib/telemetryFieldCanvas';

// Components
import {
  HeroVoidCanvasElement,
  HeroVoidCanvasLayer,
} from '@/components/Hero/HeroVoidCanvas/HeroVoidCanvas.style';

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * Void terminal — Canvas2D telemetry field driven by parent pointer (mouse or touch drift).
 */
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
