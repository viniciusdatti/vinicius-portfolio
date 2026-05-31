// Core
import {
  useEffect,
  useLayoutEffect,
  useState, RefObject,
} from 'react';

// Hooks
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

// Types
import {
  IntersectionObserverCallbackFn,
  IntersectionObserverCleanup,
  MotionLifecycleTarget,
  TabVisibilityInitializer,
  UseMotionLifecycleHook,
  UseMotionLifecycleOptions,
  UseMotionLifecycleResult,
  VisibilityChangeCleanup,
  VisibilityChangeHandler,
} from './useMotionLifecycle.types';

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

  const [observedElement, setObservedElement] = useState<Element | null>(
    (): Element | null => resolveMotionTarget(target),
  );
  useLayoutEffect((): (() => void) | undefined => {
    const syncTarget = (): void => {
      setObservedElement(resolveMotionTarget(target));
    };

    syncTarget();

    if (!target || (typeof Element !== 'undefined' && target instanceof Element)) {
      return undefined;
    }

    const refTarget: RefObject<Element | null> = target as RefObject<Element | null>;
    if (refTarget.current) {
      return undefined;
    }

    let frameId: number = 0;
    const waitForRef = (): void => {
      if (refTarget.current) {
        setObservedElement(refTarget.current);
        return;
      }
      frameId = window.requestAnimationFrame(waitForRef);
    };

    frameId = window.requestAnimationFrame(waitForRef);

    return (): void => {
      window.cancelAnimationFrame(frameId);
    };
  }, [target]);

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
