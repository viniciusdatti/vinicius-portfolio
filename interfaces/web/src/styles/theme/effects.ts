import type { ThemeEffects } from './types';

export const darkEffects: ThemeEffects = {
  blur: {
    xs: '2px',
    sm: '12px',
    md: '16px',
    lg: '20px',
  },
  saturate: {
    default: '140%',
    strong: '150%',
  },
  backdrop: {
    glass: 'blur(12px) saturate(130%)',
    panel: 'blur(16px) saturate(140%)',
    header: 'blur(14px) saturate(140%)',
    menu: 'blur(18px) saturate(145%)',
  },
  opacity: {
    grid: 0.35,
    decoGrid: 0.35,
    heroGlowMin: 0.28,
    heroGlowMax: 0.42,
    buttonShine: 0.9,
    skipLinkHidden: 0,
    mutedText: 0.7,
    disabled: 0.45,
    pulseMid: 0.5,
    subtle: 0.8,
    scrollCueMin: 0.45,
    scrollCueMax: 1,
    heroRing: 0.65,
  },
};

export const lightEffects: ThemeEffects = {
  ...darkEffects,
  opacity: {
    ...darkEffects.opacity,
    grid: 0.25,
    decoGrid: 0.3,
  },
};
