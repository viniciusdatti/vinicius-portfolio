// Core
import React from 'react';

// Libraries
import { useMotionTemplate, useSpring } from 'framer-motion';

// Hooks
import type { PointerPosition } from '@/hooks/usePointerPosition';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Components
import {
  HeroAmbientLayer,
  HeroNoiseLayer,
  HeroOperationalGrid,
  HeroScanLine,
  HeroMouseGlow,
} from '@/components/Hero/HeroAmbient.style';

interface HeroAmbientProps {
  position: PointerPosition;
  isActive: boolean;
}

/**
 * Cinematic operational backdrop — grid, noise, scan sweep, mouse-reactive glow.
 */
export function HeroAmbient({ position, isActive }: HeroAmbientProps): React.ReactElement {
  const reduced = usePrefersReducedMotion();

  const glowX = useSpring(50, { stiffness: 120, damping: 24 });
  const glowY = useSpring(38, { stiffness: 120, damping: 24 });

  React.useEffect(() => {
    if (reduced) return;
    glowX.set(position.x * 100);
    glowY.set(position.y * 100);
  }, [position.x, position.y, glowX, glowY, reduced]);

  const glowBackground = useMotionTemplate`radial-gradient(
    680px circle at ${glowX}% ${glowY}%,
    rgba(245, 158, 11, 0.16),
    transparent 62%
  )`;

  return (
    <HeroAmbientLayer aria-hidden>
      <HeroOperationalGrid />
      <HeroNoiseLayer />
      {!reduced && <HeroScanLine />}
      <HeroMouseGlow
        style={{
          background: glowBackground,
          opacity: isActive && !reduced ? 1 : 0.65,
        }}
      />
    </HeroAmbientLayer>
  );
}
