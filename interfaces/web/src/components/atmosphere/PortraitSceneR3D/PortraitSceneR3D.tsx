// Core
import React, { Suspense, lazy } from 'react';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useWebGLAvailable } from '@/hooks/useWebGLAvailable';

// Types
import type { PortraitSceneR3DProps } from '@/components/atmosphere/PortraitSceneR3D/PortraitSceneR3D.types';

// Components
import {
  PortraitFallbackImage,
  PortraitSceneRoot,
} from '@/components/atmosphere/PortraitSceneR3D/PortraitSceneR3D.style';

// =================================================================================================
// ============================================= CONSTANTS =========================================
// =================================================================================================

const PortraitSceneR3DInner = lazy(
  async (): Promise<{ default: React.ComponentType<PortraitSceneR3DProps> }> => {
    const module = await import(
      '@/components/atmosphere/PortraitSceneR3D/PortraitSceneR3DInner'
    );
    return { default: module.PortraitSceneR3DInner };
  },
);

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

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
