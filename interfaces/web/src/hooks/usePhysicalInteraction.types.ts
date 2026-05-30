// Core
import { CSSProperties, RefCallback } from 'react';

// Libraries
import { TargetAndTransition, Transition } from 'framer-motion';

// Hooks
import { PointerPosition } from './usePointerPosition';

export interface UsePhysicalInteractionOptions {
  disabled?: boolean;
  enableTilt?: boolean;
  enableLift?: boolean;
  enableSpotlight?: boolean;
  maxTiltDeg?: number;
  liftPx?: number;
}

export interface PhysicalInteractionMotionProps {
  style?: CSSProperties;
  animate?: TargetAndTransition;
  transition?: Transition;
  whileTap?: TargetAndTransition;
}

export interface UsePhysicalInteractionResult<T extends HTMLElement = HTMLDivElement> {
  ref: RefCallback<T>;
  isPointerActive: boolean;
  motionProps: PhysicalInteractionMotionProps;
}

export interface UsePointerPositionHookResult<T extends HTMLElement = HTMLDivElement> {
  ref: RefCallback<T>;
  position: PointerPosition;
  isActive: boolean;
  element: T | null;
}

export type UsePhysicalInteractionHook = <T extends HTMLElement = HTMLDivElement>(
  options?: UsePhysicalInteractionOptions,
) => UsePhysicalInteractionResult<T>;

export type BuildPhysicalMotionPropsFn = () => PhysicalInteractionMotionProps;
