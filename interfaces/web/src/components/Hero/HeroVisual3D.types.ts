// Core
import type { RefObject } from 'react';

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

export interface HeroVisual3DProps {
  /** Hero section root — pointer telemetry target (mouse + touch). */
  containerRef: RefObject<HTMLElement | null>;
}

export interface HeroPointerTarget {
  x: number;
  y: number;
}

export interface HeroVisual3DSceneProps {
  pointerTargetRef: RefObject<HeroPointerTarget>;
  desktopBias: boolean;
}
