// Libraries
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Root variables for theme transition */
  :root {
    --transition-theme: ${({ theme }) => theme.transitions.theme};
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    
    @media (prefers-reduced-motion: reduce) {
      scroll-behavior: auto;
    }
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color var(--transition-theme), color var(--transition-theme);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.heading};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    color: ${({ theme }) => theme.colors.text};
    transition: color var(--transition-theme);
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
      border-radius: ${({ theme }) => theme.borderRadius.sm};
    }
  }

  /* Lists */
  ul, ol {
    list-style: none;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Buttons */
  button {
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    border: none;
    background: none;
    
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
      border-radius: ${({ theme }) => theme.borderRadius.sm};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  /* Inputs */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background-color: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    transition: border-color ${({ theme }) => theme.transitions.fast},
                box-shadow ${({ theme }) => theme.transitions.fast},
                background-color var(--transition-theme);

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }
  }

  /* Code */
  code, pre {
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  }

  /* Selection */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    
    &:hover {
      background: ${({ theme }) => theme.colors.textMuted};
    }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Focus visible polyfill */
  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

  /* Screen reader only */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
