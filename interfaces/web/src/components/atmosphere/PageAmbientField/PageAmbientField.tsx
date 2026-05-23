// Core
import React from 'react';

// Hooks
import { useCanvasTelemetryField } from '@/hooks/useCanvasTelemetryField';

// Types
import {
  resolveAmbientVariant,
  type PageAmbientFieldProps,
} from '@/components/Atmosphere/PageAmbientField/PageAmbientField.types';

// Components
import {
  PageAmbientCanvas,
  PageAmbientLayer,
} from '@/components/Atmosphere/PageAmbientField/PageAmbientField.style';

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * Full-page Canvas2D ambient field — topological mesh, constellation, or wireframe.
 */
export const PageAmbientField: React.FC<PageAmbientFieldProps> = ({
  kind,
  pulse = 0,
  scrollOffset = 0,
}): React.ReactElement => {
  const trackPointer: boolean = true;

  const { canvasRef, bindContainerRef } = useCanvasTelemetryField({
    variant: resolveAmbientVariant(kind),
    pulse,
    scrollOffset,
    trackPointer,
    fixedViewport: true,
    maxDevicePixelRatio: 1.5,
  });

  return (
    <PageAmbientLayer ref={bindContainerRef} aria-hidden data-ambient-field={kind}>
      <PageAmbientCanvas ref={canvasRef} />
    </PageAmbientLayer>
  );
};
