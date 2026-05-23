/* **********************************************************************************************
 * Theme — dark & light mode token values
 ********************************************************************************************** */

import type { Theme } from './theme/types';
import { sharedTheme } from './theme/shared';
import { darkEffects, lightEffects } from './theme/effects';

export * from './theme/types';
export type { Theme as ThemeType } from './theme/types';

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
    textMuted: '#9CA3AF',
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
    badgeTrail: '#22C55E',
    badgeTrailSurface: 'rgba(34, 197, 94, 0.12)',
    badgeCourse: '#60A5FA',
    badgeCourseSurface: 'rgba(96, 165, 250, 0.12)',
    badgeMicro: '#C084FC',
    badgeMicroSurface: 'rgba(192, 132, 252, 0.12)',
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
      'linear-gradient(to right, #F59E0B 0%, #EF4444 100%)',
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
    gradientGlassCaustic:
      'conic-gradient(from 140deg at 22% 18%, rgba(245, 158, 11, 0.14) 0deg, transparent 55deg, rgba(255, 255, 255, 0.05) 120deg, transparent 200deg)',
    gradientGlassDepth:
      'linear-gradient(180deg, transparent 0%, rgba(11, 13, 16, 0.35) 100%)',
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
    // ── Canvas ──────────────────────────────────────────────────────────────
    // Warm off-white — não fafafa frio, não branco puro. Mantém identidade.
    background: '#F7F4EF',
    backgroundSecondary: '#EDE9E2',
    surface: '#FDFBF8',
    surfaceHover: '#F5F1EA',
    surfaceElevated: '#FDFBF8',
    surfaceGlass: 'rgba(253, 251, 248, 0.82)',
    // ── Texto ───────────────────────────────────────────────────────────────
    text: '#17120A',
    textSecondary: '#4A3F2F',
    textMuted: '#8A7968',
    onPrimary: '#17120A',
    onSuccess: '#ffffff',
    // ── Accent amber — mesma família do dark, ajustada para fundo claro ────
    // #92680A passa WCAG AA (4.6:1) em #F7F4EF
    primary: '#92680A',
    primaryHover: '#7A5608',
    primaryLight: 'rgba(146, 104, 10, 0.1)',
    primarySurface: 'rgba(146, 104, 10, 0.07)',
    primaryBorderFaint: 'rgba(146, 104, 10, 0.3)',
    primaryBorderStrong: 'rgba(146, 104, 10, 0.18)',
    accent: '#92680A',
    accentMuted: 'rgba(146, 104, 10, 0.1)',
    // ── Semântica ────────────────────────────────────────────────────────────
    success: '#166534',
    successSurface: 'rgba(22, 101, 52, 0.1)',
    mutedSurface: 'rgba(74, 63, 47, 0.08)',
    error: '#991b1b',
    errorSurface: 'rgba(153, 27, 27, 0.1)',
    errorSurfaceHover: 'rgba(153, 27, 27, 0.16)',
    warning: '#92680A',
    warningSurface: 'rgba(146, 104, 10, 0.1)',
    gradientContactChatCta:
      'linear-gradient(135deg, rgba(146, 104, 10, 0.06) 0%, #FDFBF8 100%)',
    gradientPhilosophyCard:
      'linear-gradient(135deg, rgba(146, 104, 10, 0.04) 0%, #FDFBF8 100%)',
    info: '#1d4ed8',
    // ── Badges ──────────────────────────────────────────────────────────────
    badgeTrail: '#166534',
    badgeTrailSurface: 'rgba(22, 101, 52, 0.1)',
    badgeCourse: '#1d4ed8',
    badgeCourseSurface: 'rgba(29, 78, 216, 0.1)',
    badgeMicro: '#7c3aed',
    badgeMicroSurface: 'rgba(124, 58, 237, 0.1)',
    // ── Bordas ──────────────────────────────────────────────────────────────
    border: 'rgba(23, 18, 10, 0.12)',
    borderLight: 'rgba(23, 18, 10, 0.18)',
    borderSubtle: 'rgba(23, 18, 10, 0.07)',
    focusRing: 'rgba(146, 104, 10, 0.4)',
    overlay: 'rgba(247, 244, 239, 0.88)',
    // ── Gradientes — mesma intenção do dark, cores ajustadas ────────────────
    gradientHero:
      'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(146, 104, 10, 0.1), transparent 65%)',
    gradientAccent:
      'linear-gradient(135deg, rgba(146, 104, 10, 0.12) 0%, rgba(146, 104, 10, 0.04) 100%)',
    gradientButtonPrimary:
      'linear-gradient(165deg, #A87820 0%, #92680A 100%)',
    gradientMessageOwn:
      'linear-gradient(145deg, #A87820 0%, #92680A 100%)',
    gradientTextHero:
      'linear-gradient(120deg, #17120A 0%, #92680A 55%, #C49A3C 100%)',
    gradientTextDisplay:
      'linear-gradient(to right, #92680A 0%, #DC2626 100%)',
    gradientNavUnderline:
      'linear-gradient(90deg, #92680A 0%, #C49A3C 100%)',
    gradientSectionFade:
      'linear-gradient(180deg, transparent 0%, #EDE9E2 12%, #EDE9E2 88%, transparent 100%)',
    gradientFooter:
      'linear-gradient(180deg, transparent 0%, #EDE9E2 24%)',
    gradientHeroCenter:
      'radial-gradient(ellipse 75% 55% at 55% 45%, rgba(146, 104, 10, 0.12) 0%, rgba(146, 104, 10, 0.04) 42%, transparent 72%)',
    gradientHeroOrbAccent:
      'radial-gradient(circle, rgba(146, 104, 10, 0.08) 0%, transparent 68%)',
    gradientHeroOrbPrimary:
      'radial-gradient(circle, rgba(146, 104, 10, 0.07) 0%, transparent 70%)',
    gradientLiveLabBar:
      'linear-gradient(90deg, #92680A 0%, #C49A3C 100%)',
    gradientLiveLabGlow:
      'radial-gradient(circle at 80% 0%, rgba(146, 104, 10, 0.07) 0%, transparent 45%)',
    gradientButtonShine:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, transparent 48%)',
    gradientGridMask:
      'radial-gradient(ellipse 80% 70% at 50% 40%, #F7F4EF 0%, transparent 100%)',
    gradientBodyGridMask:
      'linear-gradient(180deg, #F7F4EF 0%, transparent 85%)',
    gradientProjectCanvasA:
      'linear-gradient(145deg, rgba(146, 104, 10, 0.1) 0%, rgba(253, 251, 248, 0.85) 55%, transparent 100%)',
    gradientProjectCanvasB:
      'linear-gradient(145deg, rgba(146, 104, 10, 0.06) 0%, rgba(146, 104, 10, 0.03) 50%, transparent 100%)',
    gradientProjectCanvasC:
      'linear-gradient(160deg, #FDFBF8 0%, rgba(146, 104, 10, 0.06) 100%)',
    gradientHeroRing:
      'conic-gradient(from 200deg, rgba(146, 104, 10, 0.24), rgba(196, 154, 60, 0.12), transparent 55%)',
    gradientScrollCue:
      'linear-gradient(180deg, rgba(138, 121, 104, 0.3) 0%, rgba(146, 104, 10, 0.55) 100%)',
    gradientSurfaceRim:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, transparent 32%)',
    gradientGlassCaustic:
      'conic-gradient(from 140deg at 22% 18%, rgba(146, 104, 10, 0.12) 0deg, transparent 55deg, rgba(255, 255, 255, 0.35) 120deg, transparent 200deg)',
    gradientGlassDepth:
      'linear-gradient(180deg, transparent 0%, rgba(23, 18, 10, 0.08) 100%)',
    gradientHeroAtmosphere:
      'linear-gradient(118deg, rgba(146, 104, 10, 0.08) 0%, rgba(146, 104, 10, 0.02) 42%, transparent 72%)',
    gradientFeaturedSpotlight:
      'linear-gradient(180deg, rgba(146, 104, 10, 0.07) 0%, transparent 38%)',
  },
  effects: lightEffects,
  focus: {
    ringShadow: '0 0 0 3px rgba(146, 104, 10, 0.35)',
  },
  shadows: {
    sm: '0 1px 3px rgba(23, 18, 10, 0.08), 0 0 0 1px rgba(23, 18, 10, 0.04)',
    md: '0 8px 24px rgba(23, 18, 10, 0.1), 0 0 0 1px rgba(23, 18, 10, 0.04)',
    lg: '0 16px 40px rgba(23, 18, 10, 0.12)',
    xl: '0 24px 56px rgba(23, 18, 10, 0.14)',
    glow: '0 0 28px rgba(146, 104, 10, 0.18)',
    glowAccent: '0 0 32px rgba(146, 104, 10, 0.12)',
  },
  elevation: {
    sm: '0 1px 3px rgba(23, 18, 10, 0.07)',
    md: '0 8px 24px rgba(23, 18, 10, 0.09)',
    lg: '0 16px 40px rgba(23, 18, 10, 0.11)',
    xl: '0 24px 56px rgba(23, 18, 10, 0.13)',
  },
  ...sharedTheme,
};
