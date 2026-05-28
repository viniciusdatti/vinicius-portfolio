// Core
import React from 'react';

// Component
import type { HeroAmbientProps } from './HeroAmbient.types';
import {
  HeroAmbientLayer,
  HeroNoiseLayer,
  HeroOperationalGrid,
  HeroScanLine,
  HeroMouseGlow,
} from './HeroAmbient.style';

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
