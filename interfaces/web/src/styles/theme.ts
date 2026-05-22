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
      display: '"Syne", -apple-system, BlinkMacSystemFont, sans-serif',
      heading: '"Syne", -apple-system, BlinkMacSystemFont, sans-serif',
      body: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      mono: '"DM Mono", "JetBrains Mono", ui-monospace, monospace',
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
      tight: 1.15,
      snug: 1.3,
      normal: 1.625,
      relaxed: 1.75,
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
    lg: '12px',
    xl: '16px',
    xxl: '20px',
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
    background: '#0B0D10',
    backgroundSecondary: '#111318',
    surface: '#161A22',
    surfaceHover: '#1C212B',
    surfaceElevated: '#1A1F28',
    surfaceGlass: 'rgba(22, 26, 34, 0.72)',
    text: '#F1F5F9',
    textSecondary: '#A1A1AA',
    textMuted: '#8B919C',
    onPrimary: '#0B0D10',
    onSuccess: '#ffffff',
    primary: '#F59E0B',
    primaryHover: '#FBBF24',
    primaryLight: 'rgba(245, 158, 11, 0.14)',
    primarySurface: 'rgba(245, 158, 11, 0.08)',
    primaryBorderFaint: 'rgba(245, 158, 11, 0.35)',
    primaryBorderStrong: 'rgba(245, 158, 11, 0.22)',
    accent: '#F59E0B',
    accentMuted: 'rgba(245, 158, 11, 0.12)',
    success: '#22C55E',
    successSurface: 'rgba(52, 211, 153, 0.1)',
    mutedSurface: 'rgba(255, 255, 255, 0.04)',
    error: '#EF4444',
    errorSurface: 'rgba(239, 68, 68, 0.12)',
    errorSurfaceHover: 'rgba(239, 68, 68, 0.18)',
    warning: '#F59E0B',
    warningSurface: 'rgba(245, 158, 11, 0.12)',
    gradientContactChatCta:
      'linear-gradient(135deg, rgba(245, 158, 11, 0.06) 0%, #161A22 100%)',
    gradientPhilosophyCard:
      'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, #161A22 100%)',
    info: '#60a5fa',
    border: '#232836',
    borderLight: 'rgba(255, 255, 255, 0.14)',
    borderSubtle: 'rgba(255, 255, 255, 0.06)',
    focusRing: 'rgba(245, 158, 11, 0.45)',
    overlay: 'rgba(11, 13, 16, 0.82)',
    gradientHero:
      'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(245, 158, 11, 0.08), transparent 65%)',
    gradientAccent:
      'linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(245, 158, 11, 0.05) 100%)',
    gradientButtonPrimary:
      'linear-gradient(165deg, #F59E0B 0%, #FBBF24 100%)',
    gradientMessageOwn:
      'linear-gradient(145deg, #F59E0B 0%, #FBBF24 100%)',
    gradientTextHero:
      'linear-gradient(120deg, #F1F5F9 0%, #F59E0B 55%, #FDE68A 100%)',
    gradientTextDisplay:
      'linear-gradient(165deg, #F1F5F9 0%, #A1A1AA 100%)',
    gradientNavUnderline:
      'linear-gradient(90deg, #F59E0B 0%, #FDE68A 100%)',
    gradientSectionFade:
      'linear-gradient(180deg, transparent 0%, #111318 12%, #111318 88%, transparent 100%)',
    gradientFooter:
      'linear-gradient(180deg, transparent 0%, #111318 24%)',
    gradientHeroCenter:
      'radial-gradient(ellipse 75% 55% at 55% 45%, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.03) 42%, transparent 72%)',
    gradientHeroOrbAccent:
      'radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, transparent 68%)',
    gradientHeroOrbPrimary:
      'radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%)',
    gradientLiveLabBar:
      'linear-gradient(90deg, #F59E0B 0%, #FDE68A 100%)',
    gradientLiveLabGlow:
      'radial-gradient(circle at 80% 0%, rgba(245, 158, 11, 0.06) 0%, transparent 45%)',
    gradientButtonShine:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, transparent 48%)',
    gradientGridMask:
      'radial-gradient(ellipse 80% 70% at 50% 40%, #0B0D10 0%, transparent 100%)',
    gradientBodyGridMask:
      'linear-gradient(180deg, #0B0D10 0%, transparent 85%)',
    gradientProjectCanvasA:
      'linear-gradient(145deg, rgba(245, 158, 11, 0.12) 0%, rgba(22, 26, 34, 0.6) 55%, transparent 100%)',
    gradientProjectCanvasB:
      'linear-gradient(145deg, rgba(245, 158, 11, 0.07) 0%, rgba(245, 158, 11, 0.03) 50%, transparent 100%)',
    gradientProjectCanvasC:
      'linear-gradient(160deg, #161A22 0%, rgba(245, 158, 11, 0.07) 100%)',
    gradientHeroRing:
      'conic-gradient(from 200deg, rgba(245, 158, 11, 0.28), rgba(253, 230, 138, 0.12), transparent 55%)',
    gradientScrollCue:
      'linear-gradient(180deg, rgba(139, 145, 156, 0.35) 0%, rgba(245, 158, 11, 0.65) 100%)',
    gradientSurfaceRim:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, transparent 28%)',
    gradientHeroAtmosphere:
      'linear-gradient(118deg, rgba(245, 158, 11, 0.09) 0%, rgba(245, 158, 11, 0.02) 42%, transparent 72%)',
    gradientFeaturedSpotlight:
      'linear-gradient(180deg, rgba(245, 158, 11, 0.08) 0%, transparent 38%)',
  },
  effects: darkEffects,
  focus: {
    ringShadow: '0 0 0 3px rgba(245, 158, 11, 0.4)',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04)',
    md: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.04)',
    lg: '0 16px 48px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.05)',
    xl: '0 24px 64px rgba(0, 0, 0, 0.7)',
    glow: '0 0 32px rgba(245, 158, 11, 0.16)',
    glowAccent: '0 0 40px rgba(245, 158, 11, 0.1)',
  },
  elevation: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.04)',
    md: '0 6px 20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04)',
    lg: '0 14px 36px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.05)',
    xl: '0 20px 48px rgba(0, 0, 0, 0.6)',
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

export type { Theme as ThemeType };
