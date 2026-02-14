// Libraries
import { createGlobalStyle } from 'styled-components';

// Theme
import type { Theme } from './theme';

export const themeToCssVars = (theme: Theme): Record<string, string> => ({
  '--color-background': theme.colors.background,
  '--color-primary': theme.colors.primary,
  '--color-surface': theme.colors.surface,
  '--color-text': theme.colors.text,
  '--color-text-muted': theme.colors.textMuted,
  '--color-border': theme.colors.border,
  '--font-heading': theme.typography.fontFamily.heading,
  '--font-body': theme.typography.fontFamily.body,
  '--font-size-sm': theme.typography.fontSize.sm,
  '--font-size-md': theme.typography.fontSize.md,
  '--font-size-lg': theme.typography.fontSize.lg,
  '--font-size-xl': theme.typography.fontSize.xl,
  '--font-size-xxl': theme.typography.fontSize.xxl,
  '--font-weight-normal': String(theme.typography.fontWeight.normal),
  '--font-weight-medium': String(theme.typography.fontWeight.medium),
  '--font-weight-bold': String(theme.typography.fontWeight.bold),
  '--spacing-xs': theme.spacing.xs,
  '--spacing-sm': theme.spacing.sm,
  '--spacing-md': theme.spacing.md,
  '--spacing-lg': theme.spacing.lg,
  '--spacing-xl': theme.spacing.xl,
  '--spacing-xxl': theme.spacing.xxl,
  '--radius-sm': theme.borderRadius.sm,
  '--radius-md': theme.borderRadius.md,
  '--radius-lg': theme.borderRadius.lg,
  '--shadow-sm': theme.shadows.sm,
  '--shadow-md': theme.shadows.md,
  '--transition-fast': theme.transitions.fast,
  '--transition-normal': theme.transitions.normal,
});

export const GlobalStyles = createGlobalStyle<{ theme?: Theme }>`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    ${({ theme }) =>
      theme &&
      Object.entries(themeToCssVars(theme))
        .map(([key, value]) => `${key}: ${value};`)
        .join('\n    ')}
  }

  body {
    background-color: ${({ theme }: { theme: Theme }) => theme?.colors?.background ?? '#0a0a0a'};
    font-family: ${({ theme }: { theme: Theme }) =>
      theme?.typography?.fontFamily?.body ?? 'Inter, sans-serif'};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
