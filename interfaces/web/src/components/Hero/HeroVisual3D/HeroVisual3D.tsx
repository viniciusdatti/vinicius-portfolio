// Core
import React, { lazy, Suspense } from 'react';

// Hooks
import { useMotionLifecycle } from '../../../hooks/useMotionLifecycle';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { useWebGLAvailable } from '../../../hooks/useWebGLAvailable';

// Types
import { HeroVisual3DProps } from './HeroVisual3D.types';
import { HeroVisual3DSceneProps } from './HeroVisual3DScene/HeroVisual3DScene.types';

const HeroVisual3DScene = lazy(
  async (): Promise<{ default: React.FC<HeroVisual3DSceneProps> }> => {
    const module = await import('./HeroVisual3DScene');
    return { default: module.HeroVisual3DScene };
  },
);

export const HeroVisual3D: React.FC<HeroVisual3DProps> = ({
  containerRef,
}): React.ReactElement | null => {
  const reduced: boolean = usePrefersReducedMotion();
  const webglAvailable: boolean = useWebGLAvailable();
  const { isActive } = useMotionLifecycle(containerRef, {
    observeIntersection: true,
  });

  if (!webglAvailable) {
    return null;
  }

  const motionEnabled: boolean = !reduced;
  const loopActive: boolean = isActive && !reduced;

  return (
    <Suspense fallback={null}>
      <HeroVisual3DScene
        containerRef={containerRef}
        motionEnabled={motionEnabled}
        loopActive={loopActive}
      />
    </Suspense>
  );
};
