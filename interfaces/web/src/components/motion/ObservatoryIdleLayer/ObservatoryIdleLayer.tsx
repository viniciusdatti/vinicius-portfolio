// Core
import React, { useEffect } from 'react';

// Types
import type {
  IdleImplFn,
  MotionPausedEffectCleanup,
  ObservatoryIdleLayerComponent,
} from '@/components/motion/ObservatoryIdleLayer/ObservatoryIdleLayer.types';
import type { UseMotionLifecycleResult } from '@/hooks/useMotionLifecycle.types';

// Hooks
import { useMotionLifecycle } from '@/hooks/useMotionLifecycle';

// Components
import { ScanlineTrack } from '@/components/motion/ObservatoryIdleLayer/ObservatoryIdleLayer.style';

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

const IdleLayerImpl: IdleImplFn = function ObservatoryIdleLayer(): React.ReactElement | null {
  const {
    isActive,
    prefersReducedMotion,
  }: UseMotionLifecycleResult = useMotionLifecycle(undefined, {
    observeIntersection: false,
  });

  useEffect((): MotionPausedEffectCleanup => {
    document.documentElement.dataset.motionPaused = isActive ? 'false' : 'true';
    return (): void => {
      delete document.documentElement.dataset.motionPaused;
    };
  }, [isActive]);

  if (prefersReducedMotion) {
    return null;
  }

  return <ScanlineTrack aria-hidden data-testid="observatory-idle-scanline" />;
};

/**
 * Global idle telemetry — scanline sweep + grid pulse gate via data-motion-paused on html.
 */
export const ObservatoryIdleLayer: ObservatoryIdleLayerComponent = IdleLayerImpl;
