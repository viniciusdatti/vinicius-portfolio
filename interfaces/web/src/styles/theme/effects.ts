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
    glass: 'blur(16px) saturate(140%)',
    panel: 'blur(20px) saturate(150%)',
    header: 'blur(18px) saturate(150%)',
    menu: 'blur(24px) saturate(160%)',
  },
  opacity: {
    grid: 0.35,
    decoGrid: 0.35,
    heroGlowMin: 0.35,
    heroGlowMax: 0.55,
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
