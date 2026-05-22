// Core
import {
  useCallback, useEffect, useRef, useState, type RefObject,
} from 'react';

export interface PointerPosition {
  /** 0–1 relative to element width */
  x: number;
  /** 0–1 relative to element height */
  y: number;
  /** px from element left */
  px: number;
  /** px from element top */
  py: number;
}

const DEFAULT: PointerPosition = {
  x: 0.5, y: 0.5, px: 0, py: 0,
};

/**
 * Normalized pointer position within a container — drives spotlight glow and tilt.
 */
export function usePointerPosition<T extends HTMLElement = HTMLDivElement>(
  disabled = false,
): {
    ref: RefObject<T | null>;
    position: PointerPosition;
    isActive: boolean;
  } {
  const ref = useRef<T | null>(null);
  const [position, setPosition] = useState<PointerPosition>(DEFAULT);
  const [isActive, setIsActive] = useState(false);

  const update = useCallback((clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    setPosition({
      x: Math.min(1, Math.max(0, px / rect.width)),
      y: Math.min(1, Math.max(0, py / rect.height)),
      px,
      py,
    });
  }, []);

  useEffect(() => {
    if (disabled) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    const onMove = (e: PointerEvent): void => {
      setIsActive(true);
      update(e.clientX, e.clientY);
    };
    const onLeave = (): void => {
      setIsActive(false);
      setPosition(DEFAULT);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [disabled, update]);

  return { ref, position, isActive };
}
