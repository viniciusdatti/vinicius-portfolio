// Core
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

// Hooks
import { usePointerPosition } from '@/hooks/usePointerPosition';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Types
import {
  HeroCanvasInteractionMode,
  type HeroCanvasPointer,
  type UseHeroCanvasPointerOptions,
  type UseHeroCanvasPointerResult,
} from '@/hooks/useHeroCanvasPointer.types';

export { HeroCanvasInteractionMode } from '@/hooks/useHeroCanvasPointer.types';

// =================================================================================================
// ============================================= CONSTANTS =========================================
// =================================================================================================

const IDLE_POINTER: HeroCanvasPointer = {
  x: 0.5,
  y: 0.48,
  active: false,
  pulse: 0,
};

const TOUCH_IDLE_MS: number = 2200;
const PULSE_DECAY: number = 0.9;
const PULSE_TOUCH_BOOST: number = 1;
const DRIFT_X_AMPLITUDE: number = 0.18;
const DRIFT_Y_AMPLITUDE: number = 0.14;

// =================================================================================================
// ============================================= METHODS ===========================================
// =================================================================================================

const resolveDriftCoords = (now: number): Pick<HeroCanvasPointer, 'x' | 'y'> => {
  const t: number = now * 0.001;
  return {
    x: 0.5 + DRIFT_X_AMPLITUDE * Math.sin(t * 0.42),
    y: 0.48 + DRIFT_Y_AMPLITUDE * Math.cos(t * 0.36),
  };
};

// =================================================================================================
// ============================================= HOOK ==============================================
// =================================================================================================

/**
 * Hero canvas pointer — void-terminal mouse telemetry on desktop, hero-wide touch drift on mobile.
 */
export const useHeroCanvasPointer = (
  options: UseHeroCanvasPointerOptions,
): UseHeroCanvasPointerResult => {
  const {
    mode,
    heroContainerRef,
    voidContainerRef,
    disabled = false,
  } = options;

  const reduced: boolean = usePrefersReducedMotion();
  const isDisabled: boolean = disabled || reduced;
  const [touchPointer, setTouchPointer] = useState<HeroCanvasPointer>(IDLE_POINTER);
  const [driftPointer, setDriftPointer] = useState<HeroCanvasPointer>(IDLE_POINTER);
  const lastTouchRef = useRef<number>(0);
  const pulseRef = useRef<number>(0);
  const frameRef = useRef<number | null>(null);

  const mouseDisabled: boolean = isDisabled
    || mode !== HeroCanvasInteractionMode.MouseTelemetry;

  const {
    position: mousePosition,
    isActive: mouseActive,
    ref: mouseRef,
  } = usePointerPosition<HTMLElement>(mouseDisabled);

  useEffect(() => {
    const target: HTMLElement | null = mode === HeroCanvasInteractionMode.MouseTelemetry
      ? voidContainerRef.current
      : heroContainerRef.current;
    mouseRef.current = target;
  }, [heroContainerRef, mode, mouseRef, voidContainerRef]);

  const applyTouchCoords = useCallback((clientX: number, clientY: number): void => {
    const el: HTMLElement | null = heroContainerRef.current;
    if (!el) {
      return;
    }
    const rect: DOMRect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
      return;
    }
    const x: number = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const y: number = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    lastTouchRef.current = performance.now();
    pulseRef.current = Math.min(1, pulseRef.current + PULSE_TOUCH_BOOST);
    setTouchPointer({
      x,
      y,
      active: true,
      pulse: pulseRef.current,
    });
  }, [heroContainerRef]);

  useEffect(() => {
    if (
      isDisabled
      || mode !== HeroCanvasInteractionMode.TouchDrift
    ) {
      return undefined;
    }

    const el: HTMLElement | null = heroContainerRef.current;
    if (!el) {
      return undefined;
    }

    const onTouchStart = (event: TouchEvent): void => {
      const touch: Touch | undefined = event.touches[0];
      if (!touch) {
        return;
      }
      pulseRef.current = 1;
      applyTouchCoords(touch.clientX, touch.clientY);
    };

    const onTouchMove = (event: TouchEvent): void => {
      const touch: Touch | undefined = event.touches[0];
      if (!touch) {
        return;
      }
      applyTouchCoords(touch.clientX, touch.clientY);
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });

    return (): void => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, [applyTouchCoords, heroContainerRef, isDisabled, mode]);

  useEffect(() => {
    if (isDisabled) {
      setTouchPointer(IDLE_POINTER);
      setDriftPointer(IDLE_POINTER);
      return undefined;
    }

    const tick = (now: number): void => {
      if (mode === HeroCanvasInteractionMode.TouchDrift) {
        const elapsedSinceTouch: number = now - lastTouchRef.current;
        const touchActive: boolean = elapsedSinceTouch < TOUCH_IDLE_MS;
        pulseRef.current *= PULSE_DECAY;

        if (!touchActive) {
          const drift = resolveDriftCoords(now);
          setTouchPointer({
            x: drift.x,
            y: drift.y,
            active: false,
            pulse: pulseRef.current,
          });
        } else {
          setTouchPointer((prev: HeroCanvasPointer): HeroCanvasPointer => ({
            ...prev,
            pulse: pulseRef.current,
          }));
        }
      }

      if (
        mode === HeroCanvasInteractionMode.MouseTelemetry
        && !mouseActive
      ) {
        const drift = resolveDriftCoords(now);
        setDriftPointer({
          x: drift.x,
          y: drift.y,
          active: false,
          pulse: 0,
        });
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return (): void => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [isDisabled, mode, mouseActive]);

  if (mode === HeroCanvasInteractionMode.MouseTelemetry) {
    if (mouseActive) {
      const pointer: HeroCanvasPointer = {
        x: mousePosition.x,
        y: mousePosition.y,
        active: true,
        pulse: 0,
      };
      return { pointer };
    }

    return { pointer: driftPointer };
  }

  return { pointer: touchPointer };
};
