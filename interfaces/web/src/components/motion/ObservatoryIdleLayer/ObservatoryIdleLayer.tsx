// Core
import React, { useEffect } from 'react';

// Hooks
import type { UseMotionLifecycleResult } from '../../../hooks/useMotionLifecycle.types';
import { useMotionLifecycle } from '../../../hooks/useMotionLifecycle';

// Component
import type {
  IdleImplFn,
  MotionPausedEffectCleanup,
  ObservatoryIdleLayerComponent,
} from './ObservatoryIdleLayer.types';
import { ScanlineTrack } from './ObservatoryIdleLayer.style';

const IdleLayerImpl: IdleImplFn = (): React.ReactElement | null => {
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
