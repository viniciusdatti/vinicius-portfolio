// Core
import {
  useEffect,
  useState,
  type RefObject,
} from 'react';

// Types
import type {
  IntersectionObserverCallbackFn,
  IntersectionObserverCleanup,
  MotionLifecycleTarget,
  TabVisibilityInitializer,
  UseMotionLifecycleHook,
  UseMotionLifecycleOptions,
  UseMotionLifecycleResult,
  VisibilityChangeCleanup,
  VisibilityChangeHandler,
} from '@/hooks/useMotionLifecycle.types';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// =================================================================================================
// ============================================= METHODS ===========================================
// =================================================================================================

const resolveMotionTarget = (target?: MotionLifecycleTarget): Element | null => {
  if (!target) {
    return null;
  }
  if (typeof Element !== 'undefined' && target instanceof Element) {
    return target;
  }
  const refTarget: RefObject<Element | null> = target as RefObject<Element | null>;
  return refTarget.current;
};

// =================================================================================================
// ============================================= HOOK ==============================================
// =================================================================================================

/**
 * Gates motion loops by viewport visibility, tab focus, and reduced-motion preference.
 */
export const useMotionLifecycle: UseMotionLifecycleHook = (
  target?: MotionLifecycleTarget,
  options: UseMotionLifecycleOptions = {},
): UseMotionLifecycleResult => {
  const {
    observeIntersection = Boolean(target),
    threshold = 0.05,
  }: UseMotionLifecycleOptions = options;

  const prefersReducedMotion: boolean = usePrefersReducedMotion();
  const [isIntersecting, setIsIntersecting] = useState<boolean>(true);
  const [isTabVisible, setIsTabVisible] = useState<boolean>(() => {
    const initializeTabVisibility: TabVisibilityInitializer = (): boolean => {
      if (typeof document === 'undefined') {
        return true;
      }
      return !document.hidden;
    };

    return initializeTabVisibility();
  });

  const observedElement: Element | null = resolveMotionTarget(target);

  useEffect((): VisibilityChangeCleanup | undefined => {
    const onVisibilityChange: VisibilityChangeHandler = (): void => {
      setIsTabVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    return (): void => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  useEffect((): IntersectionObserverCleanup | undefined => {
    if (!observeIntersection || !observedElement) {
      return undefined;
    }

    const onIntersect: IntersectionObserverCallbackFn = (
      entries: IntersectionObserverEntry[],
    ): void => {
      const entry: IntersectionObserverEntry | undefined = entries[0];
      setIsIntersecting(Boolean(entry?.isIntersecting));
    };

    const observer: IntersectionObserver = new IntersectionObserver(
      onIntersect,
      { threshold },
    );

    observer.observe(observedElement);

    return (): void => {
      observer.disconnect();
    };
  }, [observeIntersection, observedElement, threshold]);

  const isActive: boolean = !prefersReducedMotion
    && isTabVisible
    && (observeIntersection ? isIntersecting : true);

  const result: UseMotionLifecycleResult = {
    isActive,
    isIntersecting,
    isTabVisible,
    prefersReducedMotion,
  };

  return result;
};
