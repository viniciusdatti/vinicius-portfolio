// Core
import React from 'react';

// Hooks
import { useCanvasTelemetryField } from '@/hooks/useCanvasTelemetryField';

// Types
import { TelemetryFieldVariant } from '@/lib/telemetryFieldCanvas';

// Components
import {
  TimelineCanvasElement,
  TimelineCanvasLayer,
} from '@/components/Atmosphere/AboutTimelineCanvas/AboutTimelineCanvas.style';

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * Animated timeline rail behind About experience section.
 */
export const AboutTimelineCanvas = (): React.ReactElement => {
  const { canvasRef, containerRef } = useCanvasTelemetryField({
    variant: TelemetryFieldVariant.Timeline,
    pulse: 0.35,
  });

  return (
    <TimelineCanvasLayer ref={containerRef} aria-hidden>
      <TimelineCanvasElement ref={canvasRef} />
    </TimelineCanvasLayer>
  );
};
