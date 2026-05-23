// Core
import React from 'react';

// Types
import type { HeroAmbientProps } from '@/components/Hero/HeroAmbient.types';

// Components
import {
  HeroAmbientLayer,
  HeroNoiseLayer,
  HeroOperationalGrid,
  HeroScanLine,
  HeroMouseGlow,
} from '@/components/Hero/HeroAmbient.style';

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * Hero atmosphere — operational grid, scan line, grain, pointer wash (max 2 infinite loops).
 */
export const HeroAmbient = ({
  pointerX,
  pointerY,
  pointerActive,
}: HeroAmbientProps): React.ReactElement => (
  <HeroAmbientLayer aria-hidden $pointerX={pointerX} $pointerY={pointerY}>
    <HeroOperationalGrid />
    <HeroMouseGlow $active={pointerActive} />
    <HeroScanLine />
    <HeroNoiseLayer />
  </HeroAmbientLayer>
);
