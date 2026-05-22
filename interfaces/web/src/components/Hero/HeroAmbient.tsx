// Core
import React from 'react';

// Components
import {
  HeroAmbientLayer,
  HeroNoiseLayer,
} from '@/components/Hero/HeroAmbient.style';

/**
 * Restrained hero atmosphere — fine grain only (no orbs, scan, or mouse glow).
 */
export function HeroAmbient(): React.ReactElement {
  return (
    <HeroAmbientLayer aria-hidden>
      <HeroNoiseLayer />
    </HeroAmbientLayer>
  );
}
