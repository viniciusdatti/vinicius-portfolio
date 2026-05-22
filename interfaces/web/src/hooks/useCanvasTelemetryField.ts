// Core
import {
  useCallback, useEffect, useRef, type RefObject,
} from 'react';

// Libraries
import { useTheme } from 'styled-components';

// Types
import type { Theme } from '@/styles/theme';
import {
  drawTelemetryField,
  TelemetryFieldPointer,
  TelemetryFieldVariant,
} from '@/lib/telemetryFieldCanvas';
import { clampDevicePixelRatio } from '@/lib/motionPhysics';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

export interface UseCanvasTelemetryFieldOptions {
  variant: TelemetryFieldVariant;
  pointer?: TelemetryFieldPointer;
  maxDevicePixelRatio?: number;
  /** 0–1 — socket tick intensity for monitor/work fields. */
  pulse?: number;
}

export interface UseCanvasTelemetryFieldResult {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
}

// =================================================================================================
// ============================================= CONSTANTS =========================================
// =================================================================================================

const DEFAULT_POINTER: TelemetryFieldPointer = {
  x: 0.5,
  y: 0.5,
  active: false,
};

const DEFAULT_MAX_DPR: number = 1.5;

// =================================================================================================
// ============================================= HOOK ==============================================
// =================================================================================================

/**
 * Resize-aware Canvas2D telemetry field with visibility pause and reduced-motion static frame.
 */
export const useCanvasTelemetryField = (
  options: UseCanvasTelemetryFieldOptions,
): UseCanvasTelemetryFieldResult => {
  const {
    variant,
    pointer = DEFAULT_POINTER,
    maxDevicePixelRatio = DEFAULT_MAX_DPR,
    pulse = 0,
  } = options;

  const theme: Theme = useTheme() as Theme;
  const reduced: boolean = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const visibleRef = useRef<boolean>(true);
  const tabVisibleRef = useRef<boolean>(true);
  const timeRef = useRef<number>(0);
  const pointerRef = useRef<TelemetryFieldPointer>(pointer);
  const pulseRef = useRef<number>(pulse);

  useEffect(() => {
    pointerRef.current = pointer;
  }, [pointer]);

  useEffect(() => {
    pulseRef.current = pulse;
  }, [pulse]);

  const paintFrame = useCallback(
    (time: number): void => {
      const canvas: HTMLCanvasElement | null = canvasRef.current;
      const container: HTMLDivElement | null = containerRef.current;
      if (!canvas || !container) {
        return;
      }

      const rect: DOMRect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }

      const dpr: number = clampDevicePixelRatio(
        window.devicePixelRatio || 1,
        maxDevicePixelRatio,
      );
      const width: number = Math.floor(rect.width * dpr);
      const height: number = Math.floor(rect.height * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      }

      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
      if (!ctx) {
        return;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      drawTelemetryField(ctx, rect.width, rect.height, {
        variant,
        time,
        pointer: pointerRef.current,
        pulse: pulseRef.current,
        colors: {
          grid: theme.colors.borderSubtle,
          accent: theme.colors.primary,
          node: theme.colors.textMuted,
          background: 'transparent',
        },
      });
    },
    [
      maxDevicePixelRatio,
      theme.colors.borderSubtle,
      theme.colors.primary,
      theme.colors.textMuted,
      variant,
    ],
  );

  useEffect(() => {
    const onVisibilityChange = (): void => {
      tabVisibleRef.current = !document.hidden;
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    return (): void => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const container: HTMLDivElement | null = containerRef.current;
    if (!container) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        const entry: IntersectionObserverEntry | undefined = entries[0];
        visibleRef.current = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    return (): void => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!reduced) {
      paintFrame(timeRef.current);
    }
  }, [paintFrame, pointer.active, pointer.x, pointer.y, pulse, reduced]);

  useEffect(() => {
    paintFrame(reduced ? 0 : timeRef.current);

    if (reduced) {
      return undefined;
    }

    const tick = (now: number): void => {
      if (visibleRef.current && tabVisibleRef.current) {
        timeRef.current = now * 0.001;
        paintFrame(timeRef.current);
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
  }, [paintFrame, reduced]);

  useEffect(() => {
    const container: HTMLDivElement | null = containerRef.current;
    if (!container) {
      return undefined;
    }

    const resizeObserver = new ResizeObserver((): void => {
      paintFrame(reduced ? 0 : timeRef.current);
    });
    resizeObserver.observe(container);

    return (): void => {
      resizeObserver.disconnect();
    };
  }, [paintFrame, reduced]);

  return { canvasRef, containerRef };
};
