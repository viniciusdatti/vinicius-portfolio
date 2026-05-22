// Core
import { useEffect, useState } from 'react';

// =================================================================================================
// ============================================= HOOK ==============================================
// =================================================================================================

/**
 * Detects WebGL2 support once on mount (for lazy R3F atmosphere fallback).
 */
export const useWebGLAvailable = (): boolean => {
  const [available, setAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const gl: WebGL2RenderingContext | null = canvas.getContext('webgl2');
    setAvailable(gl !== null);
    return undefined;
  }, []);

  return available;
};
