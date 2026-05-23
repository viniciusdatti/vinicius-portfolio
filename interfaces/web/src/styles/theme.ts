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
    primary: '#00E5FF',
    primaryHover: '#67F0FF',
    primaryLight: 'rgba(0, 229, 255, 0.14)',
    primarySurface: 'rgba(0, 229, 255, 0.08)',
    primaryBorderFaint: 'rgba(30, 58, 138, 0.45)',
    primaryBorderStrong: 'rgba(30, 58, 138, 0.28)',
    accent: '#00E5FF',
    accentMuted: 'rgba(0, 229, 255, 0.12)',
    success: '#4ADE80',
    successSurface: 'rgba(74, 222, 128, 0.14)',
    mutedSurface: 'rgba(255, 255, 255, 0.04)',
    error: '#F87171',
    errorSurface: 'rgba(248, 113, 113, 0.16)',
    errorSurfaceHover: 'rgba(248, 113, 113, 0.22)',
    warning: '#FACC15',
    warningSurface: 'rgba(250, 204, 21, 0.16)',
    gradientContactChatCta:
      'linear-gradient(135deg, rgba(0, 229, 255, 0.06) 0%, #161A22 100%)',
    gradientPhilosophyCard:
      'linear-gradient(135deg, rgba(0, 229, 255, 0.05) 0%, #161A22 100%)',
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
    focusRing: 'rgba(0, 229, 255, 0.45)',
    overlay: 'rgba(11, 13, 16, 0.82)',
    gradientHero:
      'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(0, 229, 255, 0.08), transparent 65%)',
    gradientAccent:
      'linear-gradient(135deg, rgba(0, 229, 255, 0.18) 0%, rgba(0, 229, 255, 0.05) 100%)',
    gradientButtonPrimary:
      'linear-gradient(165deg, #00E5FF 0%, #67F0FF 100%)',
    gradientMessageOwn:
      'linear-gradient(145deg, #00E5FF 0%, #67F0FF 100%)',
    gradientTextHero:
      'linear-gradient(120deg, #F1F5F9 0%, #00E5FF 55%, #A5F3FC 100%)',
    gradientTextDisplay:
      'linear-gradient(to right, #00E5FF 0%, #2563EB 100%)',
    gradientNavUnderline:
      'linear-gradient(90deg, #00E5FF 0%, #A5F3FC 100%)',
    gradientSectionFade:
      'linear-gradient(180deg, transparent 0%, #111318 12%, #111318 88%, transparent 100%)',
    gradientFooter:
      'linear-gradient(180deg, transparent 0%, #111318 24%)',
    gradientHeroCenter:
      'radial-gradient(ellipse 75% 55% at 55% 45%, rgba(0, 229, 255, 0.1) 0%, rgba(0, 229, 255, 0.03) 42%, transparent 72%)',
    gradientHeroOrbAccent:
      'radial-gradient(circle, rgba(0, 229, 255, 0.06) 0%, transparent 68%)',
    gradientHeroOrbPrimary:
      'radial-gradient(circle, rgba(0, 229, 255, 0.05) 0%, transparent 70%)',
    gradientLiveLabBar:
      'linear-gradient(90deg, #00E5FF 0%, #A5F3FC 100%)',
    gradientLiveLabGlow:
      'radial-gradient(circle at 80% 0%, rgba(0, 229, 255, 0.06) 0%, transparent 45%)',
    gradientButtonShine:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, transparent 48%)',
    gradientGridMask:
      'radial-gradient(ellipse 80% 70% at 50% 40%, #0B0D10 0%, transparent 100%)',
    gradientBodyGridMask:
      'linear-gradient(180deg, #0B0D10 0%, transparent 85%)',
    gradientProjectCanvasA:
      'linear-gradient(145deg, rgba(0, 229, 255, 0.12) 0%, rgba(22, 26, 34, 0.6) 55%, transparent 100%)',
    gradientProjectCanvasB:
      'linear-gradient(145deg, rgba(0, 229, 255, 0.07) 0%, rgba(0, 229, 255, 0.03) 50%, transparent 100%)',
    gradientProjectCanvasC:
      'linear-gradient(160deg, #161A22 0%, rgba(0, 229, 255, 0.07) 100%)',
    gradientHeroRing:
      'conic-gradient(from 200deg, rgba(0, 229, 255, 0.28), rgba(165, 243, 252, 0.12), transparent 55%)',
    gradientScrollCue:
      'linear-gradient(180deg, rgba(139, 145, 156, 0.35) 0%, rgba(0, 229, 255, 0.65) 100%)',
    gradientSurfaceRim:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, transparent 28%)',
    gradientGlassCaustic:
      'conic-gradient(from 140deg at 22% 18%, rgba(0, 229, 255, 0.14) 0deg, transparent 55deg, rgba(255, 255, 255, 0.05) 120deg, transparent 200deg)',
    gradientGlassDepth:
      'linear-gradient(180deg, transparent 0%, rgba(11, 13, 16, 0.35) 100%)',
    gradientHeroAtmosphere:
      'linear-gradient(118deg, rgba(0, 229, 255, 0.09) 0%, rgba(0, 229, 255, 0.02) 42%, transparent 72%)',
    gradientFeaturedSpotlight:
      'linear-gradient(180deg, rgba(0, 229, 255, 0.08) 0%, transparent 38%)',
  },
  effects: darkEffects,
  focus: {
    ringShadow: '0 0 0 3px rgba(0, 229, 255, 0.4)',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04)',
    md: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.04)',
    lg: '0 16px 48px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.05)',
    xl: '0 24px 64px rgba(0, 0, 0, 0.7)',
    glow: '0 0 32px rgba(0, 229, 255, 0.16)',
    glowAccent: '0 0 40px rgba(0, 229, 255, 0.1)',
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
    onPrimary: '#FFFFFF',
    onSuccess: '#ffffff',
    // ── Accent corporate blue — WCAG AA on light canvas (#F7F4EF) ─────────────
    // #1D4ED8 ≈ 5.2:1 on #F7F4EF; neon cyan barred for text/outlines on light bg
    primary: '#1D4ED8',
    primaryHover: '#1E40AF',
    primaryLight: 'rgba(37, 99, 235, 0.08)',
    primarySurface: 'rgba(37, 99, 235, 0.08)',
    primaryBorderFaint: '#DBEAFE',
    primaryBorderStrong: '#93C5FD',
    accent: '#1D4ED8',
    accentMuted: 'rgba(37, 99, 235, 0.08)',
    // ── Semântica ────────────────────────────────────────────────────────────
    success: '#15803D',
    successSurface: 'rgba(21, 128, 61, 0.12)',
    mutedSurface: 'rgba(74, 63, 47, 0.08)',
    error: '#DC2626',
    errorSurface: 'rgba(220, 38, 38, 0.12)',
    errorSurfaceHover: 'rgba(220, 38, 38, 0.18)',
    warning: '#CA8A04',
    warningSurface: 'rgba(202, 138, 4, 0.14)',
    gradientContactChatCta:
      'linear-gradient(135deg, rgba(37, 99, 235, 0.06) 0%, #FDFBF8 100%)',
    gradientPhilosophyCard:
      'linear-gradient(135deg, rgba(37, 99, 235, 0.04) 0%, #FDFBF8 100%)',
    info: '#1D4ED8',
    // ── Badges ──────────────────────────────────────────────────────────────
    badgeTrail: '#166534',
    badgeTrailSurface: 'rgba(22, 101, 52, 0.1)',
    badgeCourse: '#2563EB',
    badgeCourseSurface: 'rgba(37, 99, 235, 0.1)',
    badgeMicro: '#7c3aed',
    badgeMicroSurface: 'rgba(124, 58, 237, 0.1)',
    // ── Bordas — slate-blue component rims ──────────────────────────────────
    border: '#E2E8F0',
    borderLight: '#DBEAFE',
    borderSubtle: '#F1F5F9',
    focusRing: 'rgba(29, 78, 216, 0.45)',
    overlay: 'rgba(247, 244, 239, 0.88)',
    // ── Gradientes — mesma intenção do dark, cores ajustadas ────────────────
    gradientHero:
      'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(37, 99, 235, 0.08), transparent 65%)',
    gradientAccent:
      'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.04) 100%)',
    gradientButtonPrimary:
      'linear-gradient(165deg, #2563EB 0%, #1D4ED8 100%)',
    gradientMessageOwn:
      'linear-gradient(145deg, #2563EB 0%, #1D4ED8 100%)',
    gradientTextHero:
      'linear-gradient(120deg, #17120A 0%, #1E40AF 55%, #1D4ED8 100%)',
    gradientTextDisplay:
      'linear-gradient(to right, #1E40AF 0%, #1D4ED8 100%)',
    gradientNavUnderline:
      'linear-gradient(90deg, #1D4ED8 0%, #2563EB 100%)',
    gradientSectionFade:
      'linear-gradient(180deg, transparent 0%, #EDE9E2 12%, #EDE9E2 88%, transparent 100%)',
    gradientFooter:
      'linear-gradient(180deg, transparent 0%, #EDE9E2 24%)',
    gradientHeroCenter:
      'radial-gradient(ellipse 75% 55% at 55% 45%, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.04) 42%, transparent 72%)',
    gradientHeroOrbAccent:
      'radial-gradient(circle, rgba(37, 99, 235, 0.07) 0%, transparent 68%)',
    gradientHeroOrbPrimary:
      'radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, transparent 70%)',
    gradientLiveLabBar:
      'linear-gradient(90deg, #1D4ED8 0%, #2563EB 100%)',
    gradientLiveLabGlow:
      'radial-gradient(circle at 80% 0%, rgba(37, 99, 235, 0.06) 0%, transparent 45%)',
    gradientButtonShine:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, transparent 48%)',
    gradientGridMask:
      'radial-gradient(ellipse 80% 70% at 50% 40%, #F7F4EF 0%, transparent 100%)',
    gradientBodyGridMask:
      'linear-gradient(180deg, #F7F4EF 0%, transparent 85%)',
    gradientProjectCanvasA:
      'linear-gradient(145deg, rgba(37, 99, 235, 0.08) 0%, rgba(253, 251, 248, 0.85) 55%, transparent 100%)',
    gradientProjectCanvasB:
      'linear-gradient(145deg, rgba(37, 99, 235, 0.05) 0%, rgba(37, 99, 235, 0.02) 50%, transparent 100%)',
    gradientProjectCanvasC:
      'linear-gradient(160deg, #FDFBF8 0%, rgba(37, 99, 235, 0.05) 100%)',
    gradientHeroRing:
      'conic-gradient(from 200deg, rgba(37, 99, 235, 0.22), rgba(59, 130, 246, 0.1), transparent 55%)',
    gradientScrollCue:
      'linear-gradient(180deg, rgba(138, 121, 104, 0.3) 0%, rgba(37, 99, 235, 0.5) 100%)',
    gradientSurfaceRim:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, transparent 32%)',
    gradientGlassCaustic:
      'conic-gradient(from 140deg at 22% 18%, rgba(37, 99, 235, 0.1) 0deg, transparent 55deg, rgba(255, 255, 255, 0.35) 120deg, transparent 200deg)',
    gradientGlassDepth:
      'linear-gradient(180deg, transparent 0%, rgba(23, 18, 10, 0.08) 100%)',
    gradientHeroAtmosphere:
      'linear-gradient(118deg, rgba(37, 99, 235, 0.06) 0%, rgba(37, 99, 235, 0.02) 42%, transparent 72%)',
    gradientFeaturedSpotlight:
      'linear-gradient(180deg, rgba(37, 99, 235, 0.06) 0%, transparent 38%)',
  },
  effects: lightEffects,
  focus: {
    ringShadow: '0 0 0 3px rgba(29, 78, 216, 0.35)',
  },
  shadows: {
    sm: '0 1px 3px rgba(23, 18, 10, 0.08), 0 0 0 1px rgba(23, 18, 10, 0.04)',
    md: '0 8px 24px rgba(23, 18, 10, 0.1), 0 0 0 1px rgba(23, 18, 10, 0.04)',
    lg: '0 16px 40px rgba(23, 18, 10, 0.12)',
    xl: '0 24px 56px rgba(23, 18, 10, 0.14)',
    glow: '0 0 28px rgba(37, 99, 235, 0.14)',
    glowAccent: '0 0 32px rgba(37, 99, 235, 0.1)',
  },
  elevation: {
    sm: '0 1px 3px rgba(23, 18, 10, 0.07)',
    md: '0 8px 24px rgba(23, 18, 10, 0.09)',
    lg: '0 16px 40px rgba(23, 18, 10, 0.11)',
    xl: '0 24px 56px rgba(23, 18, 10, 0.13)',
  },
  ...sharedTheme,
};
