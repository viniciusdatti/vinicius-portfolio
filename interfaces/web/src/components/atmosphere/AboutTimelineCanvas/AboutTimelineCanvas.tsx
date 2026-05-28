// Core
import React from 'react';

// Libraries
import { TelemetryFieldVariant } from '../../../lib/telemetryFieldCanvas';

// Hooks
import { useCanvasTelemetryField } from '../../../hooks/useCanvasTelemetryField';

// Component
import {
  TimelineCanvasElement,
  TimelineCanvasLayer,
} from './AboutTimelineCanvas.style';

export const AboutTimelineCanvas = (): React.ReactElement => {
  const { canvasRef, bindContainerRef } = useCanvasTelemetryField({
    variant: TelemetryFieldVariant.Timeline,
    pulse: 0.35,
  });

  return (
    <TimelineCanvasLayer ref={bindContainerRef} aria-hidden>
      <TimelineCanvasElement ref={canvasRef} />
    </TimelineCanvasLayer>
  );
};
