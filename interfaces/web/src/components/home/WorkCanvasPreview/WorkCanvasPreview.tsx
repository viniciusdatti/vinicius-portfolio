// Core
import React, { useMemo } from 'react';

// Hooks
import { useCanvasTelemetryField } from '../../../hooks/useCanvasTelemetryField';

// Styles
import {
  WorkPreviewCanvas,
  WorkPreviewLayer,
} from './WorkCanvasPreview.style';

// Types
import { WorkCanvasPreviewProps } from './WorkCanvasPreview.types';

// Lib
import { mapProjectCanvasTone } from '../../../lib/projects';

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
