// Core
import { useEffect, useRef, useState } from 'react';

/* *************************************************************************************************
 ********************************************** TYPES **********************************************
 ************************************************************************************************ */

export interface UseSocketThrottledValueOptions {
  /** Minimum ms between propagated updates (Live Lab socket fields default 100). */
  intervalMs?: number;
}

/* *************************************************************************************************
 ********************************************** HOOK ***********************************************
 ************************************************************************************************ */

/**
 * Throttles fast socket-driven values so canvas/UI react at most once per interval.
 */
export const useSocketThrottledValue = <T>(
  value: T,
  options: UseSocketThrottledValueOptions = {},
): T => {
  const intervalMs: number = options.intervalMs ?? 100;
  const [throttled, setThrottled] = useState<T>(value);
  const lastCommitRef = useRef<number>(0);
  const pendingRef = useRef<T>(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    pendingRef.current = value;

    const flush = (): void => {
      lastCommitRef.current = Date.now();
      setThrottled(pendingRef.current);
    };

    const now: number = Date.now();
    const elapsed: number = now - lastCommitRef.current;

    if (elapsed >= intervalMs) {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      flush();
      return undefined;
    }

    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      flush();
    }, intervalMs - elapsed);

    return (): void => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [intervalMs, value]);

  return throttled;
};
