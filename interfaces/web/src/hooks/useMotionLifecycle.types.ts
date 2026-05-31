// Core
import { RefObject } from 'react';

export interface UseMotionLifecycleOptions {
  observeIntersection?: boolean;
  threshold?: number;
}

export interface UseMotionLifecycleResult {
  isActive: boolean;
  isIntersecting: boolean;
  isTabVisible: boolean;
  prefersReducedMotion: boolean;
}

export type MotionLifecycleTarget =
  | RefObject<Element | null>
  | Element
  | null
  | undefined;

export type UseMotionLifecycleHook = (
  target?: MotionLifecycleTarget,
  options?: UseMotionLifecycleOptions,
) => UseMotionLifecycleResult;

export type VisibilityChangeHandler = () => void;

export type VisibilityChangeCleanup = () => void;

export type IntersectionObserverCallbackFn = (
  entries: IntersectionObserverEntry[],
) => void;

export type IntersectionObserverCleanup = () => void;

export type TabVisibilityInitializer = () => boolean;
