// Core
import React, { useEffect } from 'react';

// Hooks
import { UseMotionLifecycleResult } from '../../../hooks/useMotionLifecycle.types';
import { useMotionLifecycle } from '../../../hooks/useMotionLifecycle';

// Styles
import { ScanlineTrack } from './ObservatoryIdleLayer.style';

// Types
import {
  IdleImplFn,
  MotionPausedEffectCleanup,
  ObservatoryIdleLayerComponent,
} from './ObservatoryIdleLayer.types';

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

export const ObservatoryIdleLayer: ObservatoryIdleLayerComponent = IdleLayerImpl;
