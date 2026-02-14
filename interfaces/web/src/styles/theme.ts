// ============================================
// Theme Configuration - Dark & Light Modes
// ============================================

export interface ThemeColors {
  // Base
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceHover: string;

  // Text
  text: string;
  textSecondary: string;
  textMuted: string;

  // Brand
  primary: string;
  primaryHover: string;
  primaryLight: string;

  // Semantic
  success: string;
  error: string;
  warning: string;
  info: string;

  // Border
  border: string;
  borderLight: string;

  // Overlay
  overlay: string;
}

export interface Theme {
  mode: 'dark' | 'light';
  colors: ThemeColors;
  typography: {
    fontFamily: {
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
      hero: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
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
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    glow: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
    theme: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
  };
  zIndex: {
    dropdown: number;
    sticky: number;
    modal: number;
    toast: number;
  };
}

// Shared theme properties
const sharedTheme = {
  typography: {
    fontFamily: {
      heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
      hero: 'clamp(2.5rem, 8vw, 5rem)',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    section: '5rem',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  transitions: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '400ms ease',
    theme: '300ms ease-in-out',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  zIndex: {
    dropdown: 100,
    sticky: 200,
    modal: 300,
    toast: 400,
  },
};

// Dark Theme
export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    background: '#0a0a0a',
    backgroundSecondary: '#050505',
    surface: '#111111',
    surfaceHover: '#1a1a1a',
    text: '#ffffff',
    textSecondary: '#e0e0e0',
    textMuted: '#888888',
    primary: '#0070f3',
    primaryHover: '#0060df',
    primaryLight: 'rgba(0, 112, 243, 0.1)',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    border: '#222222',
    borderLight: '#333333',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
    glow: '0 0 20px rgba(0, 112, 243, 0.3)',
  },
  ...sharedTheme,
};

// Light Theme
export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    background: '#ffffff',
    backgroundSecondary: '#f8f9fa',
    surface: '#ffffff',
    surfaceHover: '#f0f0f0',
    text: '#111111',
    textSecondary: '#333333',
    textMuted: '#666666',
    primary: '#0070f3',
    primaryHover: '#0060df',
    primaryLight: 'rgba(0, 112, 243, 0.05)',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    border: '#e0e0e0',
    borderLight: '#f0f0f0',
    overlay: 'rgba(255, 255, 255, 0.8)',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.15)',
    glow: '0 0 20px rgba(0, 112, 243, 0.15)',
  },
  ...sharedTheme,
};

// Default export for backwards compatibility
export const theme = darkTheme;

// Type export
export type { Theme as ThemeType };
