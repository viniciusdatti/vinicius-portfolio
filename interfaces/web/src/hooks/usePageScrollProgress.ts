// Core
import {
  useCallback,
  useEffect,
  useState,
  type RefCallback,
} from 'react';

/* *************************************************************************************************
 ********************************************** TYPES **********************************************
 ************************************************************************************************ */

export interface UsePageScrollProgressResult {
  /** 0–1 scroll progress through the tracked element. */
  progress: number;
  bindContainerRef: RefCallback<HTMLDivElement>;
}

/* *************************************************************************************************
 ********************************************** HOOK ***********************************************
 ************************************************************************************************ */

/**
 * Maps window scroll position to 0–1 progress relative to a container's document span.
 */
export const usePageScrollProgress = (): UsePageScrollProgressResult => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const bindContainerRef: RefCallback<HTMLDivElement> = useCallback(
    (node: HTMLDivElement | null): void => {
      setElement(node);
    },
    [],
  );

  useEffect((): (() => void) | undefined => {
    if (!element) {
      return undefined;
    }

    const computeProgress = (): void => {
      const rect: DOMRect = element.getBoundingClientRect();
      const scrollTop: number = window.scrollY || document.documentElement.scrollTop;
      const elementTop: number = scrollTop + rect.top;
      const span: number = Math.max(element.offsetHeight - window.innerHeight, 1);
      const raw: number = (scrollTop - elementTop) / span;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    computeProgress();
    window.addEventListener('scroll', computeProgress, { passive: true });
    window.addEventListener('resize', computeProgress, { passive: true });

    return (): void => {
      window.removeEventListener('scroll', computeProgress);
      window.removeEventListener('resize', computeProgress);
    };
  }, [element]);

  return { progress, bindContainerRef };
};
