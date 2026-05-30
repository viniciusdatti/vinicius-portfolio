// Lib
import {
  PHYSICAL_SPRING_DAMPING,
  PHYSICAL_SPRING_MASS,
  PHYSICAL_SPRING_STIFFNESS,
} from '../lib/motion';

export const motionPresets = {
  ease: {
    out: [0.22, 1, 0.36, 1] as const,
    inOut: [0.45, 0, 0.55, 1] as const,
  },
  spring: {
    physical: {
      type: 'spring' as const,
      stiffness: PHYSICAL_SPRING_STIFFNESS,
      damping: PHYSICAL_SPRING_DAMPING,
      mass: PHYSICAL_SPRING_MASS,
    },
  },
  duration: {
    fast: 0.16,
    normal: 0.28,
    slow: 0.44,
    page: 0.35,
  },
  stagger: {
    child: 0.07,
    delayChildren: 0.1,
  },
  distance: {
    pageEnter: 12,
    pageExit: 6,
    fadeUp: 24,
    fadeSide: 18,
    item: 12,
    editorial: 40,
  },
} as const;
