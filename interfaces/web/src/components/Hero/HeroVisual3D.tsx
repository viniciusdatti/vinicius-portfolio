// Core
import React, {
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
} from 'react';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useWebGLAvailable } from '@/hooks/useWebGLAvailable';

// Types
import type {
  HeroPointerTarget,
  HeroVisual3DProps,
  HeroVisual3DSceneProps,
} from '@/components/Hero/HeroVisual3D.types';

// =================================================================================================
// ============================================= CONSTANTS =========================================
// =================================================================================================

const DESKTOP_MEDIA: string = '(min-width: 1024px)';

const HeroVisual3DInner = lazy(
  async (): Promise<{
    default: React.ComponentType<HeroVisual3DSceneProps>;
  }> => {
    const module = await import('@/components/Hero/HeroVisual3DInner');
    return { default: module.HeroVisual3DInner };
  },
);

// =================================================================================================
// ============================================= METHODS ===========================================
// =================================================================================================

const normalizePointerFromClient = (
  el: HTMLElement,
  clientX: number,
  clientY: number,
): HeroPointerTarget => {
  const rect: DOMRect = el.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) {
    return { x: 0.5, y: 0.5 };
  }
  return {
    x: Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)),
    y: Math.min(1, Math.max(0, (clientY - rect.top) / rect.height)),
  };
};

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * Isolated Hero GPU layer — 2k amber particle void with bloom and pointer magnetism.
 * Zero layout footprint: absolute inset canvas, pointer-events none.
 */
export const HeroVisual3D: React.FC<HeroVisual3DProps> = ({
  containerRef,
}): React.ReactElement | null => {
  const reduced: boolean = usePrefersReducedMotion();
  const webglAvailable: boolean = useWebGLAvailable();
  const pointerTargetRef = useRef<HeroPointerTarget>({ x: 0.5, y: 0.5 });
  const [desktopBias, setDesktopBias] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }
    const mq: MediaQueryList = window.matchMedia(DESKTOP_MEDIA);
    const apply = (): void => {
      setDesktopBias(mq.matches);
    };
    apply();
    mq.addEventListener('change', apply);
    return (): void => {
      mq.removeEventListener('change', apply);
    };
  }, []);

  useEffect(() => {
    const el: HTMLElement | null = containerRef.current;
    if (!el) {
      return undefined;
    }

    const onMouseMove = (event: MouseEvent): void => {
      pointerTargetRef.current = normalizePointerFromClient(
        el,
        event.clientX,
        event.clientY,
      );
    };

    const onTouchMove = (event: TouchEvent): void => {
      const touch: Touch | undefined = event.touches[0];
      if (!touch) {
        return;
      }
      pointerTargetRef.current = normalizePointerFromClient(
        el,
        touch.clientX,
        touch.clientY,
      );
    };

    el.addEventListener('mousemove', onMouseMove, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });

    return (): void => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, [containerRef]);

  if (reduced || !webglAvailable) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <HeroVisual3DInner
        pointerTargetRef={pointerTargetRef}
        desktopBias={desktopBias}
      />
    </Suspense>
  );
};
