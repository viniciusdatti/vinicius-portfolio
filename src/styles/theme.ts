export const theme = {
  colors: {
    background: '#0a0a0a',
    primary: '#0070f3',
    surface: '#111111',
    text: '#ffffff',
  },
} as const;

export type Theme = typeof theme;
