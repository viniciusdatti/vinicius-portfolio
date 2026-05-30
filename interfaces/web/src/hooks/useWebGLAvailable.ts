// Core
import { useEffect, useState } from 'react';

const detectWebGL2 = (): boolean => {
  if (typeof document === 'undefined') {
    return false;
  }
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const gl: WebGL2RenderingContext | null = canvas.getContext('webgl2');
  return gl !== null;
};

export const useWebGLAvailable = (): boolean => {
  const [available, setAvailable] = useState<boolean>(detectWebGL2);

  useEffect(() => {
    const next: boolean = detectWebGL2();
    setAvailable(next);
    return undefined;
  }, []);

  return available;
};
