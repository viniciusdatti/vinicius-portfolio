// Core
import {
  useMemo,
  type CSSProperties,
} from 'react';

// Libraries
import type { Transition } from 'framer-motion';

// Types
import type { PhysicalTiltResult } from '@/lib/motionPhysics.types';
import type {
  BuildPhysicalMotionPropsFn,
  PhysicalInteractionMotionProps,
  UsePhysicalInteractionHook,
  UsePhysicalInteractionOptions,
  UsePhysicalInteractionResult,
  UsePointerPositionHookResult,
} from '@/hooks/usePhysicalInteraction.types';
import type { UseMotionLifecycleResult } from '@/hooks/useMotionLifecycle.types';

// Hooks
import { useMotionLifecycle } from '@/hooks/useMotionLifecycle';
import { usePointerPosition } from '@/hooks/usePointerPosition';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Components
import {
  PHYSICAL_LIFT_PX,
  PHYSICAL_MAX_TILT_DEG,
  PHYSICAL_PERSPECTIVE_PX,
  PHYSICAL_TAP_SCALE,
  resolvePhysicalTilt,
} from '@/lib/motionPhysics';
import { motionPresets } from '@/styles/motionPresets';

// =================================================================================================
// ============================================= HOOK ==============================================
// =================================================================================================

/**
 * Spring-driven tilt, lift, spotlight vars, and tap scale for interactive surfaces.
 */
export const usePhysicalInteraction: UsePhysicalInteractionHook = <
  T extends HTMLElement = HTMLDivElement,
>(
    options: UsePhysicalInteractionOptions = {},
  ): UsePhysicalInteractionResult<T> => {
  const {
    disabled = false,
    enableTilt = true,
    enableLift = true,
    enableSpotlight = true,
    maxTiltDeg = PHYSICAL_MAX_TILT_DEG,
    liftPx = PHYSICAL_LIFT_PX,
  }: UsePhysicalInteractionOptions = options;

  const reduced: boolean = usePrefersReducedMotion();
  const isDisabled: boolean = disabled || reduced;

  const {
    ref,
    position,
    isActive: isPointerActive,
    element,
  }: UsePointerPositionHookResult<T> = usePointerPosition<T>(isDisabled);

  const { isActive: lifecycleActive }: Pick<UseMotionLifecycleResult, 'isActive'> = (
    useMotionLifecycle(element)
  );

  const spring: Transition = motionPresets.spring.physical;

  const buildMotionProps: BuildPhysicalMotionPropsFn = (): PhysicalInteractionMotionProps => {
    if (isDisabled) {
      return {};
    }

    const { rotateX, rotateY }: PhysicalTiltResult = resolvePhysicalTilt(
      position.x,
      position.y,
      maxTiltDeg,
    );

    const spotlightOpacity: number = enableSpotlight && isPointerActive && lifecycleActive
      ? 1
      : 0;

    const style: CSSProperties = {
      perspective: `${PHYSICAL_PERSPECTIVE_PX}px`,
      transformStyle: 'preserve-3d',
      ...(enableSpotlight
        ? ({
          '--spot-x': `${position.x * 100}%`,
          '--spot-y': `${position.y * 100}%`,
          '--spot-opacity': String(spotlightOpacity),
        } as CSSProperties)
        : {}),
    };

    const shouldAnimate: boolean = isPointerActive;

    const motionPropsResult: PhysicalInteractionMotionProps = {
      style,
      animate: {
        rotateX: shouldAnimate && enableTilt ? rotateX : 0,
        rotateY: shouldAnimate && enableTilt ? rotateY : 0,
        y: shouldAnimate && enableLift ? -liftPx : 0,
      },
      transition: spring,
      whileTap: {
        scale: PHYSICAL_TAP_SCALE,
        transition: spring,
      },
    };

    return motionPropsResult;
  };

  const motionProps: PhysicalInteractionMotionProps = useMemo(
    buildMotionProps,
    [
      enableLift,
      enableSpotlight,
      enableTilt,
      isDisabled,
      isPointerActive,
      lifecycleActive,
      liftPx,
      maxTiltDeg,
      position.x,
      position.y,
      spring,
    ],
  );

  const result: UsePhysicalInteractionResult<T> = {
    ref,
    isPointerActive,
    motionProps,
  };

  return result;
};
