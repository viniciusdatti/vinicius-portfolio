// Core
import { RefObject } from 'react';

export interface HeroPointerTarget {
  x: number;
  z: number;
  active: boolean;
}

export interface HeroParticleSpringState {
  posX: number;
  posZ: number;
  velX: number;
  velZ: number;
}

export interface HeroParticleFieldProps {
  motionEnabled: boolean;
  loopActive: boolean;
  containerRef: RefObject<HTMLElement | null>;
}
