/* **********************************************************************************************
 * Theme type contracts
 ********************************************************************************************** */

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
  badgeTrail: string;
  badgeTrailSurface: string;
  badgeCourse: string;
  badgeCourseSurface: string;
  badgeMicro: string;
  badgeMicroSurface: string;
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
  gradientGlassCaustic: string;
  gradientGlassDepth: string;
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
    glassCaustic: number;
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
