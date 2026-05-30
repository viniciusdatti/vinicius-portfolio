// Core
import React from 'react';

// Hooks
import { useCanvasTelemetryField } from '../../../hooks/useCanvasTelemetryField';

// Styles
import {
  PageAmbientCanvas,
  PageAmbientLayer,
} from './PageAmbientField.style';

// Types
import {
  resolveAmbientVariant, PageAmbientFieldProps,
} from './PageAmbientField.types';

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
    maxDevicePixelRatio: 1.5,
  });

  return (
    <PageAmbientLayer
      ref={bindContainerRef}
      aria-hidden
      data-ambient-field={kind}
    >
      <PageAmbientCanvas ref={canvasRef} />
    </PageAmbientLayer>
  );
};
