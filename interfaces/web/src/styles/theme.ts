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
    badgeTrail: '#059669',
    badgeTrailSurface: 'rgba(5, 150, 105, 0.12)',
    badgeCourse: '#2563eb',
    badgeCourseSurface: 'rgba(37, 99, 235, 0.12)',
    badgeMicro: '#9333ea',
    badgeMicroSurface: 'rgba(147, 51, 234, 0.12)',
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
