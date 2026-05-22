// Core
import type { RefObject } from 'react';

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

export enum HeroCanvasInteractionMode {
  TouchDrift = 'touch_drift',
  MouseTelemetry = 'mouse_telemetry',
}

export interface HeroCanvasPointer {
  x: number;
  y: number;
  active: boolean;
  pulse: number;
}

export interface UseHeroCanvasPointerOptions {
  mode: HeroCanvasInteractionMode;
  /** Full hero section — touch target on mobile. */
  heroContainerRef: RefObject<HTMLElement | null>;
  /** Void terminal bay — mouse telemetry target on desktop. */
  voidContainerRef: RefObject<HTMLElement | null>;
  disabled?: boolean;
}

export interface UseHeroCanvasPointerResult {
  pointer: HeroCanvasPointer;
}
