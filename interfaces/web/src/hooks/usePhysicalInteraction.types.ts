// Core
import type { CSSProperties, RefObject } from 'react';

// Libraries
import type { TargetAndTransition, Transition } from 'framer-motion';

// Types
import type { PointerPosition } from '@/hooks/usePointerPosition';

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

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
  ref: RefObject<T | null>;
  isPointerActive: boolean;
  motionProps: PhysicalInteractionMotionProps;
}

export interface UsePointerPositionHookResult<T extends HTMLElement = HTMLDivElement> {
  ref: RefObject<T | null>;
  position: PointerPosition;
  isActive: boolean;
}

export type UsePhysicalInteractionHook = <T extends HTMLElement = HTMLDivElement>(
  options?: UsePhysicalInteractionOptions,
) => UsePhysicalInteractionResult<T>;

export type BuildPhysicalMotionPropsFn = () => PhysicalInteractionMotionProps;
