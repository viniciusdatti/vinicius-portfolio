// Core
import type { RefObject } from 'react';

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

export interface UseMotionLifecycleOptions {
  /** When false, intersection is treated as always visible (global ambient layers). */
  observeIntersection?: boolean;
  /** IntersectionObserver threshold — default 0.05. */
  threshold?: number;
}

export interface UseMotionLifecycleResult {
  /** Element is on-screen and tab is visible — safe to run loops / rAF. */
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
