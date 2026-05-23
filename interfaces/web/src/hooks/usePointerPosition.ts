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

export interface UsePointerPositionResult<T extends HTMLElement = HTMLDivElement> {
  ref: RefCallback<T>;
  position: PointerPosition;
  isActive: boolean;
  element: T | null;
}

/* *************************************************************************************************
 ******************************************** CONSTANTS ********************************************
 ************************************************************************************************ */

const DEFAULT_POSITION: PointerPosition = {
  x: 0.5,
  y: 0.5,
  px: 0,
  py: 0,
};

/* *************************************************************************************************
 ********************************************** HOOK ***********************************************
 ************************************************************************************************ */

/**
 * Normalized pointer position within a container — drives spotlight glow and tilt.
 * Uses a callback ref so listeners attach after the DOM node mounts.
 */
export const usePointerPosition = <T extends HTMLElement = HTMLDivElement>(
  disabled: boolean = false,
): UsePointerPositionResult<T> => {
  const [element, setElement] = useState<T | null>(null);
  const [position, setPosition] = useState<PointerPosition>(DEFAULT_POSITION);
  const [isActive, setIsActive] = useState<boolean>(false);

  const ref: RefCallback<T> = useCallback((node: T | null): void => {
    setElement(node);
  }, []);

  const update = useCallback((clientX: number, clientY: number): void => {
    if (!element) {
      return;
    }
    const rect: DOMRect = element.getBoundingClientRect();
    const px: number = clientX - rect.left;
    const py: number = clientY - rect.top;
    setPosition({
      x: Math.min(1, Math.max(0, px / rect.width)),
      y: Math.min(1, Math.max(0, py / rect.height)),
      px,
      py,
    });
  }, [element]);

  useEffect((): (() => void) | undefined => {
    if (disabled || !element) {
      return undefined;
    }

    const onMove = (event: PointerEvent): void => {
      setIsActive(true);
      update(event.clientX, event.clientY);
    };

    const onLeave = (): void => {
      setIsActive(false);
      setPosition(DEFAULT_POSITION);
    };

    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerleave', onLeave);

    return (): void => {
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerleave', onLeave);
    };
  }, [disabled, element, update]);

  return {
    ref,
    position,
    isActive,
    element,
  };
};
