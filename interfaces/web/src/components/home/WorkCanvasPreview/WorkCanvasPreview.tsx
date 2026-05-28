// Core
import React, { useMemo } from 'react';

// Libraries
import { mapProjectCanvasTone } from '../../../lib/mapProjectCanvasTone';

// Hooks
import { useCanvasTelemetryField } from '../../../hooks/useCanvasTelemetryField';

// Component
import type { WorkCanvasPreviewProps } from './WorkCanvasPreview.types';
import {
  WorkPreviewCanvas,
  WorkPreviewLayer,
} from './WorkCanvasPreview.style';

export const WorkCanvasPreview = ({
  tone,
  active,
}: WorkCanvasPreviewProps): React.ReactElement => {
  const pulse: number = useMemo(
    (): number => (active ? 0.72 : 0.28),
    [active],
  );

  const { canvasRef, bindContainerRef } = useCanvasTelemetryField({
    variant: mapProjectCanvasTone(tone),
    pulse,
  });

  return (
    <WorkPreviewLayer ref={bindContainerRef} aria-hidden>
      <WorkPreviewCanvas ref={canvasRef} />
    </WorkPreviewLayer>
  );
};
