/**
 * Framer Motion presets — single source aligned with theme.motion / theme.transitions.
 */

export const motionPresets = {
  ease: {
    out: [0.22, 1, 0.36, 1] as const,
    inOut: [0.45, 0, 0.55, 1] as const,
    spring: [0.34, 1.56, 0.64, 1] as const,
  },
  duration: {
    fast: 0.18,
    normal: 0.32,
    slow: 0.52,
    page: 0.42,
    hero: 0.58,
    message: 0.28,
    staggerItem: 0.48,
  },
  stagger: {
    child: 0.08,
    delayChildren: 0.12,
    heroChild: 0.15,
    heroDelay: 0.1,
    editorialChild: 0.12,
    editorialDelay: 0.18,
    showcaseChild: 0.1,
    showcaseDelay: 0.14,
  },
  distance: {
    pageEnter: 12,
    pageExit: 8,
    fadeUp: 32,
    fadeSide: 24,
    item: 16,
    message: 8,
    heroReveal: 48,
    editorial: 40,
    showcase: 28,
  },
} as const;
