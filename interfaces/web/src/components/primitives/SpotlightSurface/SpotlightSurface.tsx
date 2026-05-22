// Core
import React, { useEffect, useMemo } from 'react';

// Libraries
import { motion, useSpring } from 'framer-motion';

// Hooks
import { usePointerPosition } from '@/hooks/usePointerPosition';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Components
import { SpotlightContent, SpotlightRoot } from '@/components/primitives/SpotlightSurface/SpotlightSurface.style';

const MotionSpotlight = motion.create(SpotlightRoot);

interface SpotlightSurfaceProps {
  children: React.ReactNode;
  className?: string;
  /** Spring tilt on hover (degrees) */
  tilt?: number;
}

/**
 * Premium interactive surface — mouse-tracking glow + physics tilt.
 */
export function SpotlightSurface({
  children,
  className,
  tilt = 4,
}: SpotlightSurfaceProps): React.ReactElement {
  const reduced = usePrefersReducedMotion();
  const { ref, position, isActive } = usePointerPosition<HTMLDivElement>(reduced);

  const rotateX = useSpring(0, { stiffness: 280, damping: 28 });
  const rotateY = useSpring(0, { stiffness: 280, damping: 28 });

  const tiltX = useMemo(
    () => (isActive && !reduced ? (position.y - 0.5) * -tilt : 0),
    [isActive, position.y, reduced, tilt],
  );
  const tiltY = useMemo(
    () => (isActive && !reduced ? (position.x - 0.5) * tilt : 0),
    [isActive, position.x, reduced, tilt],
  );

  useEffect(() => {
    rotateX.set(tiltX);
    rotateY.set(tiltY);
  }, [tiltX, tiltY, rotateX, rotateY]);

  return (
    <MotionSpotlight
      ref={ref}
      className={className}
      $glowX={position.x}
      $glowY={position.y}
      $active={isActive}
      style={
        reduced
          ? undefined
          : {
            rotateX,
            rotateY,
            transformPerspective: 1200,
          }
      }
      whileHover={
        reduced
          ? undefined
          : {
            y: -6,
            transition: { type: 'spring', stiffness: 400, damping: 30 },
          }
      }
    >
      <SpotlightContent>{children}</SpotlightContent>
    </MotionSpotlight>
  );
}
