// Core
import React, { useMemo } from 'react';

// Hooks
import { useCanvasTelemetryField } from '@/hooks/useCanvasTelemetryField';

// Types
import type { WorkCanvasPreviewProps } from '@/components/home/WorkCanvasPreview/WorkCanvasPreview.types';
import { mapProjectCanvasTone } from '@/lib/mapProjectCanvasTone';

// Components
import {
  WorkPreviewCanvas,
  WorkPreviewLayer,
} from '@/components/home/WorkCanvasPreview/WorkCanvasPreview.style';

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * Generative Canvas2D signal preview for the home work runway.
 */
export function WorkCanvasPreview({
  tone,
  active,
}: WorkCanvasPreviewProps): React.ReactElement {
  const pulse: number = useMemo(
    (): number => (active ? 0.72 : 0.28),
    [active],
  );

  const { canvasRef, containerRef } = useCanvasTelemetryField({
    variant: mapProjectCanvasTone(tone),
    pulse,
  });

  return (
    <WorkPreviewLayer ref={containerRef} aria-hidden>
      <WorkPreviewCanvas ref={canvasRef} />
    </WorkPreviewLayer>
  );
}
