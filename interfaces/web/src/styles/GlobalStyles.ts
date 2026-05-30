// Libraries
import { createGlobalStyle, keyframes } from 'styled-components';

const observatoryGridPulse = keyframes`
  0%, 100% {
    opacity: ${({ theme }) => theme.effects.opacity.decoGrid};
  };
  50% {
    opacity: ${({ theme }) => theme.effects.opacity.decoGrid * 1.38};
  };
`;

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --transition-theme: ${({ theme }) => theme.transitions.theme};
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: ${({ theme }) => theme.sizes.layout.headerOffset};
    scrollbar-gutter: stable;
    font-size: 16px;
    text-rendering: optimizeLegibility;

    @media (prefers-reduced-motion: reduce) {
      scroll-behavior: auto;
    };
  }

  body.menu-scroll-locked,
  body.drawer-scroll-locked,
  body.modal-scroll-locked,
  body.workspace-scroll-locked {
    overflow: hidden;
  }

  body.menu-scroll-locked {
    overscroll-behavior: none;
    touch-action: none;
  }

  body.drawer-scroll-locked {
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
  }

  body.modal-scroll-locked {
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
  }

  body.workspace-scroll-locked {
    height: 100vh;
  }

  body.workspace-operational::after {
    opacity: ${({ theme }) => theme.effects.opacity.decoGrid * 1.15};
    mask-image: none;
    animation: ${observatoryGridPulse} 6s ease-in-out infinite;
  }

  body.live-lab-immersive {
    height: auto;
    overflow-y: auto;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    transition:
      background-color var(--transition-theme),
      color var(--transition-theme);
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background: ${({ theme }) => theme.colors.gradientHero};
    opacity: ${({ theme }) => theme.effects.opacity.grid};
  }

  body::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image: radial-gradient(
      circle at 1px 1px,
      ${({ theme }) => theme.colors.borderSubtle} 1px,
      transparent 0
    );
    background-size: ${({ theme }) => theme.sizes.hero.gridCell}
      ${({ theme }) => theme.sizes.hero.gridCell};
    opacity: ${({ theme }) => theme.effects.opacity.decoGrid};
    mask-image: ${({ theme }) => theme.colors.gradientBodyGridMask};
    /* Slow grid breathe — paired with ObservatoryIdleLayer 8s scanline sweep */
    animation: ${observatoryGridPulse} 6s ease-in-out infinite;
    will-change: opacity;
  }

  html[data-motion-paused='true'] body::after {
    animation-play-state: paused;
  }

  /* Grain texture overlay */
  #root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.022;
    pointer-events: none;
    z-index: 0;
  }

  #root {
    position: relative;
    z-index: 0;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.display};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.snug};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
    color: ${({ theme }) => theme.colors.text};
    transition: color var(--transition-theme);
    font-feature-settings: "ss01", "cv01";
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize.display};
    line-height: 1.17;
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize.xxl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
    line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    max-width: ${({ theme }) => theme.layout.prose};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
    };

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.focusRing};
      outline-offset: 2px;
      border-radius: ${({ theme }) => theme.borderRadius.sm};
    };
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    border: none;
    background: none;

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.focusRing};
      outline-offset: 2px;
      border-radius: ${({ theme }) => theme.borderRadius.sm};
    };

    &:disabled {
      cursor: not-allowed;
      opacity: 0.55;
    };
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background-color: ${({ theme }) => theme.colors.surfaceElevated};
    border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    transition:
      border-color ${({ theme }) => theme.transitions.fast},
      box-shadow ${({ theme }) => theme.transitions.fast},
      background-color var(--transition-theme);

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: ${({ theme }) => theme.focus.ringShadow};
    };

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    };
  }

  code, pre {
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
    font-size: 0.92em;
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primaryBorderFaint};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    border: 1px solid transparent;
    background-clip: padding-box;

    &:hover {
      background: ${({ theme }) => theme.colors.primaryBorderStrong};
      background-clip: padding-box;
    };
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    };

    body::after {
      animation: none;
    };
  }

  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

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
