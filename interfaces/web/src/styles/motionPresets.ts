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
    fast: 0.16,
    normal: 0.28,
    slow: 0.44,
    page: 0.38,
    hero: 0.52,
    message: 0.26,
    staggerItem: 0.4,
  },
  stagger: {
    child: 0.07,
    delayChildren: 0.1,
    heroChild: 0.12,
    heroDelay: 0.08,
    editorialChild: 0.09,
    editorialDelay: 0.12,
    showcaseChild: 0.08,
    showcaseDelay: 0.1,
  },
  distance: {
    pageEnter: 10,
    pageExit: 6,
    fadeUp: 24,
    fadeSide: 18,
    item: 12,
    message: 6,
    heroReveal: 40,
    editorial: 22,
    showcase: 18,
  },
} as const;
