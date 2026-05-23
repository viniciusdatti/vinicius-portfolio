// Core
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

// Types
import type { UseAvatarPortraitObjectPositionResult } from '@/hooks/useAvatarPortraitObjectPosition.types';

// Components
import { computeAvatarPortraitObjectPosition } from '@/config/avatarImage';

// =================================================================================================
// ============================================= HOOK ==============================================
// =================================================================================================

/**
 * Measures the portrait frame and derives object-position so the face stays centered
 * at any rendered width (Hero mobile/desktop, About intro).
 */
export const useAvatarPortraitObjectPosition = (): UseAvatarPortraitObjectPositionResult => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [objectPosition, setObjectPosition] = useState<string>(
    computeAvatarPortraitObjectPosition(0, 0),
  );

  const updateObjectPosition = useCallback((): void => {
    const element: HTMLDivElement | null = frameRef.current;
    if (element === null) {
      return;
    }

    const width: number = element.clientWidth;
    const height: number = element.clientHeight;
    setObjectPosition(computeAvatarPortraitObjectPosition(width, height));
  }, []);

  useEffect((): (() => void) => {
    const element: HTMLDivElement | null = frameRef.current;
    if (element === null) {
      return (): void => undefined;
    }

    updateObjectPosition();

    const observer: ResizeObserver = new ResizeObserver((): void => {
      updateObjectPosition();
    });
    observer.observe(element);

    return (): void => {
      observer.disconnect();
    };
  }, [updateObjectPosition]);

  return { frameRef, objectPosition };
};
