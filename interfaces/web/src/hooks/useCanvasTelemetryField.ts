// Core
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefCallback,
  type RefObject,
} from 'react';

// Libraries
import { useTheme } from 'styled-components';

// Types
import type { Theme } from '@/styles/theme';
import {
  createConstellationNodes,
  drawTelemetryField,
  stepConstellationNodes,
  TelemetryFieldPointer,
  TelemetryFieldVariant,
  type ConstellationNodeState,
} from '@/lib/telemetryFieldCanvas';
import { FORCE_AMBIENT_MOTION } from '@/lib/ambientMotion';
import { clampDevicePixelRatio } from '@/lib/motionPhysics';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/* *************************************************************************************************
 ********************************************** TYPES **********************************************
 ************************************************************************************************ */

export interface UseCanvasTelemetryFieldOptions {
  variant: TelemetryFieldVariant;
  pointer?: TelemetryFieldPointer;
  maxDevicePixelRatio?: number;
  /** 0–1 — socket tick intensity for monitor/work fields. */
  pulse?: number;
  /** 0–1 — scroll-linked parallax for wireframe variants. */
  scrollOffset?: number;
  /** Track window pointer against the canvas container bounds. */
  trackPointer?: boolean;
  /** Full-viewport fixed layer — skip IntersectionObserver pause (Chrome-safe). */
  fixedViewport?: boolean;
}

export interface UseCanvasTelemetryFieldResult {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  bindContainerRef: RefCallback<HTMLDivElement>;
}

/* *************************************************************************************************
 ******************************************** CONSTANTS ********************************************
 ************************************************************************************************ */

const DEFAULT_POINTER: TelemetryFieldPointer = {
  x: 0.5,
  y: 0.5,
  active: false,
};

const DEFAULT_MAX_DPR: number = 1.5;
const CONSTELLATION_NODE_COUNT: number = 48;
const CYAN_ACCENT: string = '#00E5FF';
const COBALT_ACCENT: string = '#0052FF';

/* *************************************************************************************************
 ********************************************** HOOK ***********************************************
 ************************************************************************************************ */

/**
 * Resize-aware Canvas2D telemetry field with visibility pause (unless FORCE_AMBIENT_MOTION).
 */
export const useCanvasTelemetryField = (
  options: UseCanvasTelemetryFieldOptions,
): UseCanvasTelemetryFieldResult => {
  const {
    variant,
    pointer = DEFAULT_POINTER,
    maxDevicePixelRatio = DEFAULT_MAX_DPR,
    pulse = 0,
    scrollOffset = 0,
    trackPointer = false,
    fixedViewport = false,
  } = options;

  const theme: Theme = useTheme() as Theme;
  const systemReducedMotion: boolean = usePrefersReducedMotion();
  const reduced: boolean = FORCE_AMBIENT_MOTION ? false : systemReducedMotion;
  const keepLoopActive: boolean = FORCE_AMBIENT_MOTION || fixedViewport;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const visibleRef = useRef<boolean>(true);
  const tabVisibleRef = useRef<boolean>(true);
  const timeRef = useRef<number>(0);
  const lastFrameMsRef = useRef<number>(0);
  const pointerRef = useRef<TelemetryFieldPointer>(pointer);
  const pulseRef = useRef<number>(pulse);
  const scrollRef = useRef<number>(scrollOffset);
  const constellationRef = useRef<ConstellationNodeState[] | null>(null);
  const [containerMounted, setContainerMounted] = useState<boolean>(false);

  const bindContainerRef: RefCallback<HTMLDivElement> = useCallback(
    (node: HTMLDivElement | null): void => {
      containerRef.current = node;
      setContainerMounted(node !== null);
    },
    [],
  );

  useEffect(() => {
    if (variant === TelemetryFieldVariant.Constellation) {
      constellationRef.current = createConstellationNodes(CONSTELLATION_NODE_COUNT);
    }
  }, [variant]);

  useEffect(() => {
    if (!trackPointer) {
      pointerRef.current = pointer;
    }
  }, [pointer, trackPointer]);

  useEffect(() => {
    pulseRef.current = pulse;
  }, [pulse]);

  useEffect(() => {
    scrollRef.current = scrollOffset;
  }, [scrollOffset]);

  useEffect(() => {
    if (!trackPointer) {
      return undefined;
    }

    const syncPointerFromClient = (clientX: number, clientY: number, active: boolean): void => {
      const container: HTMLDivElement | null = containerRef.current;
      if (!container) {
        return;
      }
      const rect: DOMRect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }
      pointerRef.current = {
        x: Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)),
        y: Math.min(1, Math.max(0, (clientY - rect.top) / rect.height)),
        active,
      };
    };

    const onMove = (event: MouseEvent): void => {
      syncPointerFromClient(event.clientX, event.clientY, true);
    };

    const onLeave = (): void => {
      pointerRef.current = { ...DEFAULT_POINTER, active: false };
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);

    return (): void => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [containerMounted, trackPointer]);

  const resolveFieldColors = useCallback((): {
    grid: string;
    accent: string;
    node: string;
    background: string;
  } => {
    if (variant === TelemetryFieldVariant.TopologicalMesh) {
      return {
        grid: COBALT_ACCENT,
        accent: COBALT_ACCENT,
        node: COBALT_ACCENT,
        background: 'transparent',
      };
    }
    if (variant === TelemetryFieldVariant.Constellation) {
      return {
        grid: theme.colors.borderSubtle,
        accent: CYAN_ACCENT,
        node: CYAN_ACCENT,
        background: 'transparent',
      };
    }
    return {
      grid: theme.colors.borderSubtle,
      accent: theme.colors.primary,
      node: theme.colors.textMuted,
      background: 'transparent',
    };
  }, [theme.colors.borderSubtle, theme.colors.primary, theme.colors.textMuted, variant]);

  const paintFrame = useCallback(
    (time: number, deltaMs: number = 16.67): void => {
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

      let nodes: ConstellationNodeState[] = constellationRef.current ?? [];
      if (variant === TelemetryFieldVariant.Constellation && nodes.length > 0) {
        nodes = stepConstellationNodes(nodes, deltaMs, pointerRef.current);
        constellationRef.current = nodes;
      }

      drawTelemetryField(ctx, rect.width, rect.height, {
        variant,
        time,
        pointer: pointerRef.current,
        pulse: pulseRef.current,
        scrollOffset: scrollRef.current,
        constellationNodes: nodes,
        colors: resolveFieldColors(),
      });
    },
    [maxDevicePixelRatio, resolveFieldColors, variant],
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
    if (keepLoopActive) {
      visibleRef.current = true;
      return undefined;
    }

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
  }, [containerMounted, keepLoopActive]);

  useEffect(() => {
    if (!reduced) {
      paintFrame(timeRef.current);
    }
  }, [paintFrame, pointer.active, pointer.x, pointer.y, pulse, scrollOffset, reduced]);

  useEffect(() => {
    paintFrame(reduced ? 0 : timeRef.current);

    if (reduced) {
      return undefined;
    }

    const tick = (now: number): void => {
      if (visibleRef.current && tabVisibleRef.current) {
        const deltaMs: number = lastFrameMsRef.current > 0
          ? now - lastFrameMsRef.current
          : 16.67;
        lastFrameMsRef.current = now;
        timeRef.current = now * 0.001;
        paintFrame(timeRef.current, deltaMs);
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
  }, [containerMounted, paintFrame, reduced]);

  return {
    canvasRef,
    containerRef,
    bindContainerRef,
  };
};
