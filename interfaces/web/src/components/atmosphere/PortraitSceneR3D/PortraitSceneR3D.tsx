// Core
import React, { Suspense, lazy } from 'react';

// Hooks
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { useWebGLAvailable } from '../../../hooks/useWebGLAvailable';

// Component
import type { PortraitSceneR3DProps } from './PortraitSceneR3D.types';
import {
  PortraitFallbackImage,
  PortraitSceneRoot,
} from './PortraitSceneR3D.style';

const PortraitSceneR3DInner = lazy(
  async (): Promise<{ default: React.ComponentType<PortraitSceneR3DProps> }> => {
    const module = await import(
      './PortraitSceneR3DInner'
    );
    return { default: module.PortraitSceneR3DInner };
  },
);

/* *************************************************************************************************
 ******************************************** COMPONENT ********************************************
 ************************************************************************************************ */

/**
 * Lit portrait — WebGL when available, static image fallback otherwise.
 */
export const PortraitSceneR3D = ({
  imageSrc,
  pointer,
  className,
}: PortraitSceneR3DProps): React.ReactElement => {
  const reduced: boolean = usePrefersReducedMotion();
  const webglAvailable: boolean = useWebGLAvailable();

  if (!reduced && webglAvailable) {
    return (
      <PortraitSceneRoot className={className}>
        <Suspense
          fallback={(
            <PortraitFallbackImage
              src={imageSrc}
              alt=""
              aria-hidden
            />
          )}
        >
          <PortraitSceneR3DInner imageSrc={imageSrc} pointer={pointer} />
        </Suspense>
      </PortraitSceneRoot>
    );
  }

  return (
    <PortraitSceneRoot className={className}>
      <PortraitFallbackImage src={imageSrc} alt="" aria-hidden />
    </PortraitSceneRoot>
  );
};
