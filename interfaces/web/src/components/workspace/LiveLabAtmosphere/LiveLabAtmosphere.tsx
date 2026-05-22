// Core
import React, { Suspense, lazy } from 'react';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useWebGLAvailable } from '@/hooks/useWebGLAvailable';

// Components
import { LiveLabAtmosphereCss } from '@/components/workspace/LiveLabAtmosphere/LiveLabAtmosphereCss';

// =================================================================================================
// ============================================= CONSTANTS =========================================
// =================================================================================================

const LiveLabAtmosphereGL = lazy(
  async (): Promise<{ default: React.ComponentType }> => {
    const module = await import(
      '@/components/workspace/LiveLabAtmosphere/LiveLabAtmosphereGL'
    );
    return { default: module.LiveLabAtmosphereGL };
  },
);

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * Live Lab atmosphere — WebGL grid when supported, CSS 3D fallback otherwise.
 */
export function LiveLabAtmosphere(): React.ReactElement {
  const reduced: boolean = usePrefersReducedMotion();
  const webglAvailable: boolean = useWebGLAvailable();

  if (!reduced && webglAvailable) {
    return (
      <Suspense fallback={<LiveLabAtmosphereCss />}>
        <LiveLabAtmosphereGL />
      </Suspense>
    );
  }

  return <LiveLabAtmosphereCss />;
}
