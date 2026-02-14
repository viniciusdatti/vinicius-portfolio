export const theme = {
  colors: {
    background: '#0a0a0a',
    primary: '#0070f3',
    surface: '#111111',
    text: '#ffffff',
    textMuted: '#888888',
    border: '#222222',
  },
  typography: {
    fontFamily: {
      heading: '"Inter", sans-serif',
      body: '"Inter", sans-serif',
    },
    fontSize: {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
    },
    fontWeight: { normal: 400, medium: 500, bold: 700 },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: { sm: '4px', md: '8px', lg: '12px' },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.2)',
    md: '0 4px 12px rgba(0,0,0,0.3)',
  },
  transitions: { fast: '150ms ease', normal: '250ms ease' },
} as const;

export type Theme = typeof theme;
