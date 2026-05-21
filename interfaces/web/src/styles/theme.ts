// ============================================
// Theme Configuration - Dark & Light Modes
// Single source for all visual values (DS tokens)
// ============================================

export interface ThemeColors {
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceHover: string;
  surfaceElevated: string;
  surfaceGlass: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  onPrimary: string;
  onSuccess: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primarySurface: string;
  primaryBorderFaint: string;
  primaryBorderStrong: string;
  accent: string;
  accentMuted: string;
  success: string;
  successSurface: string;
  mutedSurface: string;
  error: string;
  errorSurface: string;
  errorSurfaceHover: string;
  warning: string;
  warningSurface: string;
  gradientContactChatCta: string;
  gradientPhilosophyCard: string;
  info: string;
  border: string;
  borderLight: string;
  borderSubtle: string;
  focusRing: string;
  overlay: string;
  gradientHero: string;
  gradientAccent: string;
  gradientButtonPrimary: string;
  gradientMessageOwn: string;
  gradientTextHero: string;
  gradientTextDisplay: string;
  gradientNavUnderline: string;
  gradientSectionFade: string;
  gradientFooter: string;
  gradientHeroCenter: string;
  gradientHeroOrbAccent: string;
  gradientHeroOrbPrimary: string;
  gradientLiveLabBar: string;
  gradientLiveLabGlow: string;
  gradientButtonShine: string;
  gradientGridMask: string;
  gradientBodyGridMask: string;
  gradientProjectCanvasA: string;
  gradientProjectCanvasB: string;
  gradientProjectCanvasC: string;
  gradientHeroRing: string;
  gradientScrollCue: string;
  gradientSurfaceRim: string;
  gradientHeroAtmosphere: string;
  gradientFeaturedSpotlight: string;
}

export interface ThemeEffects {
  blur: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  saturate: {
    default: string;
    strong: string;
  };
  backdrop: {
    glass: string;
    panel: string;
    header: string;
    menu: string;
  };
  opacity: {
    grid: number;
    decoGrid: number;
    heroGlowMin: number;
    heroGlowMax: number;
    buttonShine: number;
    skipLinkHidden: number;
    mutedText: number;
    disabled: number;
    pulseMid: number;
    subtle: number;
    scrollCueMin: number;
    scrollCueMax: number;
    heroRing: number;
  };
}

export interface ThemeFocus {
  ringShadow: string;
}

export interface ThemeSizes {
  icon: {
    sm: string;
    md: string;
  };
  hamburger: {
    lineWidth: string;
    lineHeight: string;
    lineGap: string;
  };
  avatar: {
    hero: string;
    heroMobile: string;
    heroEditorial: string;
    about: string;
    aboutMobile: string;
  };
  badge: {
    dot: string;
    dotSm: string;
  };
  bar: {
    accent: string;
  };
  button: {
    minHeight: string;
    paddingY: string;
    paddingX: string;
  };
  hero: {
    glowWidth: string;
    glowHeight: string;
    orbAccent: string;
    orbPrimary: string;
    gridCell: string;
    minHeight: string;
    minHeightMobile: string;
    avatarFrame: string;
    statMinWidth: string;
    scrollCueHeight: string;
    atmosphereWidth: string;
    atmosphereHeight: string;
  };
  layout: {
    systemBarHeight: string;
    headerShellTop: string;
    headerOffset: string;
    moduleRailWidth: string;
    workspaceGap: string;
    proseMax: string;
  };
  chat: {
    minHeight: string;
    messageMaxWidth: string;
    messageMaxWidthAdmin: string;
  };
  project: {
    previewHeight: string;
    previewHeightCompact: string;
    previewHeightFeatured: string;
  };
}

export interface ThemeMotionDistance {
  liftSm: string;
  liftMd: string;
  liftLg: string;
  gridDrift: string;
  skipLinkHidden: string;
  scrollCue: string;
}

export interface Theme {
  mode: 'dark' | 'light';
  colors: ThemeColors;
  effects: ThemeEffects;
  focus: ThemeFocus;
  sizes: ThemeSizes;
  typography: {
    fontFamily: {
      display: string;
      heading: string;
      body: string;
      mono: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      display: string;
      hero: string;
      heroDisplay: string;
      heroSubtitle: string;
      sectionIndex: string;
      caption: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      snug: number;
      normal: number;
      relaxed: number;
    };
    letterSpacing: {
      tight: string;
      normal: string;
      wide: string;
      wider: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    section: string;
    sectionSm: string;
    sectionLg: string;
    pageX: string;
    pageY: string;
  };
  layout: {
    contentMax: string;
    contentWide: string;
    contentNarrow: string;
    prose: string;
    proseWide: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    glow: string;
    glowAccent: string;
  };
  elevation: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
    theme: string;
  };
  motion: {
    easeOut: string;
    easeInOut: string;
    easeSpring: string;
    distance: ThemeMotionDistance;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
    ultraWide: string;
  };
  zIndex: {
    base: number;
    content: number;
    dropdown: number;
    sticky: number;
    modal: number;
    toast: number;
  };
}

const sharedTheme = {
  typography: {
    fontFamily: {
      display:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      heading:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      mono: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
      display: 'clamp(2rem, 4.5vw, 3rem)',
      hero: 'clamp(2.75rem, 7vw, 4.5rem)',
      heroDisplay: 'clamp(3.25rem, 9vw, 5.75rem)',
      heroSubtitle: 'clamp(1.125rem, 2.5vw, 1.625rem)',
      sectionIndex: 'clamp(3.5rem, 8vw, 6rem)',
      caption: '0.8rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.1,
      snug: 1.25,
      normal: 1.55,
      relaxed: 1.7,
    },
    letterSpacing: {
      tight: '-0.03em',
      normal: '-0.01em',
      wide: '0.04em',
      wider: '0.08em',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    section: '6rem',
    sectionSm: '4rem',
    sectionLg: '8rem',
    pageX: 'clamp(1.25rem, 4vw, 2.5rem)',
    pageY: 'clamp(2.5rem, 6vw, 4rem)',
  },
  layout: {
    contentMax: '1200px',
    contentWide: '1320px',
    contentNarrow: '960px',
    prose: '42rem',
    proseWide: '52rem',
  },
  borderRadius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '18px',
    xxl: '24px',
    full: '9999px',
  },
  transitions: {
    fast: '180ms cubic-bezier(0.22, 1, 0.36, 1)',
    normal: '280ms cubic-bezier(0.22, 1, 0.36, 1)',
    slow: '420ms cubic-bezier(0.22, 1, 0.36, 1)',
    theme: '320ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  motion: {
    easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
    easeInOut: 'cubic-bezier(0.45, 0, 0.55, 1)',
    easeSpring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    distance: {
      liftSm: '2px',
      liftMd: '3px',
      liftLg: '4px',
      gridDrift: '12px',
      skipLinkHidden: '200%',
      scrollCue: '6px',
    },
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
    ultraWide: '1600px',
  },
  zIndex: {
    base: 0,
    content: 2,
    dropdown: 100,
    sticky: 200,
    modal: 300,
    toast: 400,
  },
  sizes: {
    icon: {
      sm: '16px',
      md: '40px',
    },
    hamburger: {
      lineWidth: '20px',
      lineHeight: '2px',
      lineGap: '2.5px',
    },
    avatar: {
      hero: '128px',
      heroMobile: '104px',
      heroEditorial: 'min(280px, 42vw)',
      about: '200px',
      aboutMobile: '150px',
    },
    badge: {
      dot: '8px',
      dotSm: '6px',
    },
    bar: {
      accent: '3px',
    },
    button: {
      minHeight: '44px',
      paddingY: '0.8rem',
      paddingX: '1.6rem',
    },
    hero: {
      glowWidth: 'min(85vw, 560px)',
      glowHeight: '280px',
      orbAccent: 'min(200px, 40vw)',
      orbPrimary: 'min(160px, 34vw)',
      gridCell: '36px',
      minHeight: 'min(92vh, 920px)',
      minHeightMobile: '88vh',
      avatarFrame: '360px',
      statMinWidth: '7rem',
      scrollCueHeight: '32px',
      atmosphereWidth: 'min(42vw, 420px)',
      atmosphereHeight: 'min(72vh, 640px)',
    },
    layout: {
      systemBarHeight: '32px',
      headerShellTop: '0',
      headerOffset: '5.25rem',
      moduleRailWidth: '4.5rem',
      workspaceGap: '1px',
      proseMax: '500px',
    },
    chat: {
      minHeight: '520px',
      messageMaxWidth: '420px',
      messageMaxWidthAdmin: '480px',
    },
    project: {
      previewHeight: '220px',
      previewHeightCompact: '160px',
      previewHeightFeatured: '320px',
    },
  },
};

const darkEffects: ThemeEffects = {
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

const lightEffects: ThemeEffects = {
  ...darkEffects,
  opacity: {
    ...darkEffects.opacity,
    grid: 0.25,
    decoGrid: 0.3,
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    background: '#07070b',
    backgroundSecondary: '#0c0c14',
    surface: 'rgba(16, 16, 24, 0.92)',
    surfaceHover: 'rgba(26, 26, 38, 0.96)',
    surfaceElevated: 'rgba(22, 22, 34, 0.98)',
    surfaceGlass: 'rgba(255, 255, 255, 0.035)',
    text: '#f5f5f7',
    textSecondary: '#c4c4d0',
    textMuted: '#8b8b9a',
    onPrimary: '#ffffff',
    onSuccess: '#ffffff',
    primary: '#5b7cfa',
    primaryHover: '#7b94ff',
    primaryLight: 'rgba(91, 124, 250, 0.14)',
    primarySurface: 'rgba(91, 124, 250, 0.08)',
    primaryBorderFaint: 'rgba(91, 124, 250, 0.33)',
    primaryBorderStrong: 'rgba(91, 124, 250, 0.19)',
    accent: '#6ee7d6',
    accentMuted: 'rgba(110, 231, 214, 0.12)',
    success: '#34d399',
    successSurface: 'rgba(52, 211, 153, 0.12)',
    mutedSurface: 'rgba(139, 139, 154, 0.12)',
    error: '#f87171',
    errorSurface: 'rgba(248, 113, 113, 0.12)',
    errorSurfaceHover: 'rgba(248, 113, 113, 0.18)',
    warning: '#fbbf24',
    warningSurface: 'rgba(251, 191, 36, 0.12)',
    gradientContactChatCta:
      'linear-gradient(135deg, rgba(91, 124, 250, 0.08) 0%, rgba(16, 16, 24, 0.92) 100%)',
    gradientPhilosophyCard:
      'linear-gradient(135deg, rgba(91, 124, 250, 0.06) 0%, rgba(16, 16, 24, 0.92) 100%)',
    info: '#60a5fa',
    border: 'rgba(255, 255, 255, 0.09)',
    borderLight: 'rgba(255, 255, 255, 0.14)',
    borderSubtle: 'rgba(255, 255, 255, 0.05)',
    focusRing: 'rgba(91, 124, 250, 0.45)',
    overlay: 'rgba(4, 4, 8, 0.72)',
    gradientHero:
      'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(91, 124, 250, 0.22), transparent 65%)',
    gradientAccent:
      'linear-gradient(135deg, rgba(91, 124, 250, 0.35) 0%, rgba(110, 231, 214, 0.12) 100%)',
    gradientButtonPrimary:
      'linear-gradient(165deg, #5b7cfa 0%, #7b94ff 100%)',
    gradientMessageOwn:
      'linear-gradient(145deg, #5b7cfa 0%, #7b94ff 100%)',
    gradientTextHero:
      'linear-gradient(120deg, #f5f5f7 0%, #5b7cfa 48%, #6ee7d6 100%)',
    gradientTextDisplay:
      'linear-gradient(165deg, #f5f5f7 0%, #c4c4d0 100%)',
    gradientNavUnderline:
      'linear-gradient(90deg, #5b7cfa 0%, #6ee7d6 100%)',
    gradientSectionFade:
      'linear-gradient(180deg, transparent 0%, #0c0c14 12%, #0c0c14 88%, transparent 100%)',
    gradientFooter:
      'linear-gradient(180deg, transparent 0%, #0c0c14 24%)',
    gradientHeroCenter:
      'radial-gradient(ellipse 75% 55% at 50% 50%, rgba(91, 124, 250, 0.25) 0%, rgba(110, 231, 214, 0.07) 42%, transparent 72%)',
    gradientHeroOrbAccent:
      'radial-gradient(circle, rgba(110, 231, 214, 0.09) 0%, transparent 68%)',
    gradientHeroOrbPrimary:
      'radial-gradient(circle, rgba(91, 124, 250, 0.09) 0%, transparent 70%)',
    gradientLiveLabBar:
      'linear-gradient(90deg, #5b7cfa 0%, #6ee7d6 100%)',
    gradientLiveLabGlow:
      'radial-gradient(circle at 80% 0%, rgba(91, 124, 250, 0.07) 0%, transparent 45%)',
    gradientButtonShine:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, transparent 48%)',
    gradientGridMask:
      'radial-gradient(ellipse 80% 70% at 50% 40%, #000000 0%, transparent 100%)',
    gradientBodyGridMask:
      'linear-gradient(180deg, #000000 0%, transparent 85%)',
    gradientProjectCanvasA:
      'linear-gradient(145deg, rgba(91, 124, 250, 0.22) 0%, rgba(16, 16, 24, 0.4) 55%, transparent 100%)',
    gradientProjectCanvasB:
      'linear-gradient(145deg, rgba(110, 231, 214, 0.14) 0%, rgba(91, 124, 250, 0.08) 50%, transparent 100%)',
    gradientProjectCanvasC:
      'linear-gradient(160deg, rgba(16, 16, 24, 0.95) 0%, rgba(91, 124, 250, 0.12) 100%)',
    gradientHeroRing:
      'conic-gradient(from 200deg, rgba(91, 124, 250, 0.35), rgba(110, 231, 214, 0.2), transparent 55%)',
    gradientScrollCue:
      'linear-gradient(180deg, rgba(139, 139, 154, 0.2) 0%, rgba(91, 124, 250, 0.55) 100%)',
    gradientSurfaceRim:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 28%)',
    gradientHeroAtmosphere:
      'linear-gradient(118deg, rgba(91, 124, 250, 0.14) 0%, rgba(110, 231, 214, 0.06) 42%, transparent 72%)',
    gradientFeaturedSpotlight:
      'linear-gradient(180deg, rgba(91, 124, 250, 0.12) 0%, transparent 38%)',
  },
  effects: darkEffects,
  focus: {
    ringShadow: '0 0 0 3px rgba(91, 124, 250, 0.45)',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.04)',
    md: '0 8px 24px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.05)',
    lg: '0 16px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.06)',
    xl: '0 24px 64px rgba(0, 0, 0, 0.55)',
    glow: '0 0 32px rgba(91, 124, 250, 0.28)',
    glowAccent: '0 0 40px rgba(110, 231, 214, 0.15)',
  },
  elevation: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.35)',
    md: '0 8px 24px rgba(0, 0, 0, 0.4)',
    lg: '0 16px 40px rgba(0, 0, 0, 0.48)',
    xl: '0 24px 56px rgba(0, 0, 0, 0.52)',
  },
  ...sharedTheme,
};

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    background: '#fafafa',
    backgroundSecondary: '#f4f4f6',
    surface: '#ffffff',
    surfaceHover: '#f8f8fb',
    surfaceElevated: '#ffffff',
    surfaceGlass: 'rgba(255, 255, 255, 0.72)',
    text: '#0f0f12',
    textSecondary: '#3f3f46',
    textMuted: '#71717a',
    onPrimary: '#ffffff',
    onSuccess: '#ffffff',
    primary: '#4f6ef5',
    primaryHover: '#3d5ce8',
    primaryLight: 'rgba(79, 110, 245, 0.1)',
    primarySurface: 'rgba(79, 110, 245, 0.06)',
    primaryBorderFaint: 'rgba(79, 110, 245, 0.33)',
    primaryBorderStrong: 'rgba(79, 110, 245, 0.19)',
    accent: '#0d9488',
    accentMuted: 'rgba(13, 148, 136, 0.1)',
    success: '#059669',
    successSurface: 'rgba(5, 150, 105, 0.12)',
    mutedSurface: 'rgba(113, 113, 122, 0.12)',
    error: '#dc2626',
    errorSurface: 'rgba(220, 38, 38, 0.12)',
    errorSurfaceHover: 'rgba(220, 38, 38, 0.18)',
    warning: '#d97706',
    warningSurface: 'rgba(217, 119, 6, 0.12)',
    gradientContactChatCta:
      'linear-gradient(135deg, rgba(79, 110, 245, 0.06) 0%, #ffffff 100%)',
    gradientPhilosophyCard:
      'linear-gradient(135deg, rgba(79, 110, 245, 0.04) 0%, #ffffff 100%)',
    info: '#2563eb',
    border: 'rgba(15, 15, 18, 0.1)',
    borderLight: 'rgba(15, 15, 18, 0.14)',
    borderSubtle: 'rgba(15, 15, 18, 0.06)',
    focusRing: 'rgba(79, 110, 245, 0.35)',
    overlay: 'rgba(250, 250, 250, 0.85)',
    gradientHero:
      'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(79, 110, 245, 0.12), transparent 65%)',
    gradientAccent:
      'linear-gradient(135deg, rgba(79, 110, 245, 0.15) 0%, rgba(13, 148, 136, 0.08) 100%)',
    gradientButtonPrimary:
      'linear-gradient(165deg, #4f6ef5 0%, #3d5ce8 100%)',
    gradientMessageOwn:
      'linear-gradient(145deg, #4f6ef5 0%, #3d5ce8 100%)',
    gradientTextHero:
      'linear-gradient(120deg, #0f0f12 0%, #4f6ef5 48%, #0d9488 100%)',
    gradientTextDisplay:
      'linear-gradient(165deg, #0f0f12 0%, #3f3f46 100%)',
    gradientNavUnderline:
      'linear-gradient(90deg, #4f6ef5 0%, #0d9488 100%)',
    gradientSectionFade:
      'linear-gradient(180deg, transparent 0%, #f4f4f6 12%, #f4f4f6 88%, transparent 100%)',
    gradientFooter:
      'linear-gradient(180deg, transparent 0%, #f4f4f6 24%)',
    gradientHeroCenter:
      'radial-gradient(ellipse 75% 55% at 50% 50%, rgba(79, 110, 245, 0.14) 0%, rgba(13, 148, 136, 0.05) 42%, transparent 72%)',
    gradientHeroOrbAccent:
      'radial-gradient(circle, rgba(13, 148, 136, 0.08) 0%, transparent 68%)',
    gradientHeroOrbPrimary:
      'radial-gradient(circle, rgba(79, 110, 245, 0.08) 0%, transparent 70%)',
    gradientLiveLabBar:
      'linear-gradient(90deg, #4f6ef5 0%, #0d9488 100%)',
    gradientLiveLabGlow:
      'radial-gradient(circle at 80% 0%, rgba(79, 110, 245, 0.06) 0%, transparent 45%)',
    gradientButtonShine:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, transparent 48%)',
    gradientGridMask:
      'radial-gradient(ellipse 80% 70% at 50% 40%, #000000 0%, transparent 100%)',
    gradientBodyGridMask:
      'linear-gradient(180deg, #000000 0%, transparent 85%)',
    gradientProjectCanvasA:
      'linear-gradient(145deg, rgba(79, 110, 245, 0.12) 0%, rgba(255, 255, 255, 0.9) 55%, transparent 100%)',
    gradientProjectCanvasB:
      'linear-gradient(145deg, rgba(13, 148, 136, 0.08) 0%, rgba(79, 110, 245, 0.05) 50%, transparent 100%)',
    gradientProjectCanvasC:
      'linear-gradient(160deg, #ffffff 0%, rgba(79, 110, 245, 0.06) 100%)',
    gradientHeroRing:
      'conic-gradient(from 200deg, rgba(79, 110, 245, 0.28), rgba(13, 148, 136, 0.16), transparent 55%)',
    gradientScrollCue:
      'linear-gradient(180deg, rgba(107, 107, 122, 0.25) 0%, rgba(79, 110, 245, 0.5) 100%)',
    gradientSurfaceRim:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, transparent 32%)',
    gradientHeroAtmosphere:
      'linear-gradient(118deg, rgba(79, 110, 245, 0.1) 0%, rgba(13, 148, 136, 0.05) 42%, transparent 72%)',
    gradientFeaturedSpotlight:
      'linear-gradient(180deg, rgba(79, 110, 245, 0.08) 0%, transparent 38%)',
  },
  effects: lightEffects,
  focus: {
    ringShadow: '0 0 0 3px rgba(79, 110, 245, 0.35)',
  },
  shadows: {
    sm: '0 1px 2px rgba(15, 15, 18, 0.06), 0 0 0 1px rgba(15, 15, 18, 0.04)',
    md: '0 8px 24px rgba(15, 15, 18, 0.08), 0 0 0 1px rgba(15, 15, 18, 0.04)',
    lg: '0 16px 40px rgba(15, 15, 18, 0.1)',
    xl: '0 24px 56px rgba(15, 15, 18, 0.12)',
    glow: '0 0 28px rgba(79, 110, 245, 0.2)',
    glowAccent: '0 0 32px rgba(13, 148, 136, 0.12)',
  },
  elevation: {
    sm: '0 1px 2px rgba(15, 15, 18, 0.06)',
    md: '0 8px 24px rgba(15, 15, 18, 0.08)',
    lg: '0 16px 40px rgba(15, 15, 18, 0.1)',
    xl: '0 24px 56px rgba(15, 15, 18, 0.12)',
  },
  ...sharedTheme,
};

export const theme = darkTheme;

export type { Theme as ThemeType };
