// Core
import {
  useEffect, useRef, useState, RefObject,
} from 'react';

interface UseCountUpOptions {
  target: number;
  duration?: number;
}

interface UseCountUpResult {
  count: number;
  ref: RefObject<HTMLDivElement | null>;
}

export const useCountUp = ({
  target,
  duration = 1200,
}: UseCountUpOptions): UseCountUpResult => {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef<boolean>(false);

  useEffect(() => {
    const element: HTMLDivElement | null = ref.current;
    if (!element) {
      return () => {};
    }

    const prefersReducedMotion: boolean = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const observer: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const entry: IntersectionObserverEntry | undefined = entries[0];
        if (!entry?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        if (prefersReducedMotion) {
          setCount(target);
          observer.disconnect();
          return;
        }

        const startTime: number = performance.now();
        const step = (currentTime: number): void => {
          const elapsed: number = currentTime - startTime;
          const progress: number = Math.min(elapsed / duration, 1);
          const easedProgress: number = progress < 1 ? 1 - (1 - progress) ** 3 : 1;

          setCount(Math.round(easedProgress * target));

          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };

        requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return (): void => {
      observer.disconnect();
    };
  }, [target, duration]);

  return { count, ref };
};
