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
// ============================================= HOOK ==============================================
// =================================================================================================

/**
 * Gates motion loops by viewport visibility, tab focus, and reduced-motion preference.
 */
export const useMotionLifecycle: UseMotionLifecycleHook = (
  targetRef?: RefObject<Element | null>,
  options: UseMotionLifecycleOptions = {},
): UseMotionLifecycleResult => {
  const {
    observeIntersection = Boolean(targetRef),
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
    if (!observeIntersection || !targetRef?.current) {
      return undefined;
    }

    const element: Element = targetRef.current;
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

    observer.observe(element);

    return (): void => {
      observer.disconnect();
    };
  }, [observeIntersection, targetRef, threshold]);

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
