// Core
import {
  useMemo, CSSProperties,
} from 'react';

// Libraries
import { Transition } from 'framer-motion';

// Hooks
import { useMotionLifecycle } from './useMotionLifecycle';
import { usePointerPosition } from './usePointerPosition';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

// Styles
import { motionPresets } from '../styles/motionPresets';

// Types
import {
  BuildPhysicalMotionPropsFn,
  PhysicalInteractionMotionProps,
  UsePhysicalInteractionHook,
  UsePhysicalInteractionOptions,
  UsePhysicalInteractionResult,
  UsePointerPositionHookResult,
} from './usePhysicalInteraction.types';
import { UseMotionLifecycleResult } from './useMotionLifecycle.types';

// Lib
import {
  PHYSICAL_LIFT_PX,
  PHYSICAL_MAX_TILT_DEG,
  PHYSICAL_PERSPECTIVE_PX,
  PHYSICAL_TAP_SCALE,
  PhysicalTiltResult,
  resolvePhysicalTilt,
} from '../lib/motion';

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
