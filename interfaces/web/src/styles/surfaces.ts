// Libraries
import { css } from 'styled-components';

export const surfaceInsetRim = css`
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.borderLight};
    pointer-events: none;
    z-index: 1;
  }
`;

/**
 * Standard surface motion — align with theme.transitions / motionPresets.
 */
export const surfaceMotion = css`
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast},
    opacity ${({ theme }) => theme.transitions.fast};
`;

/**
 * CSS variables for pointer-driven card lighting and operational caustic sweep.
 */
export const cardPointerVars = css`
  --spot-x: 50%;
  --spot-y: 50%;
  --spot-opacity: 0;
`;

/**
 * Frosted glass panel with subtle border and depth.
 */
export const glassSurface = css`
  background: ${({ theme }) => theme.colors.surfaceGlass};
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.glass};
  -webkit-backdrop-filter: ${({ theme }) => theme.effects.backdrop.glass};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

/**
 * Elevated card surface for interactive panels.
 */
export const elevatedSurface = css`
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.borderLight};
    pointer-events: none;
    z-index: 0;
  }
`;

/**
 * Premium hover lift — 3px (liftMd), 280ms ease-out; will-change only while hovered.
 */
export const interactiveLift = css`
  transition:
    transform ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.normal};

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.borderLight};
      transform: translateY(calc(-1 * ${({ theme }) => theme.motion.distance.liftMd}));
      box-shadow: ${({ theme }) => theme.elevation.lg};
      will-change: transform;
    }
  }

  @media (hover: none) {
    transform: none;
  }
`;

/**
 * Marketing glass card — frosted surfaceGlass, elevation tokens, rim via ::before.
 */
export const cardMarketingGlass = css`
  ${glassSurface};
  box-shadow: ${({ theme }) => theme.elevation.md};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${({ theme }) => theme.colors.gradientSurfaceRim};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.borderLight};
    pointer-events: none;
    z-index: 0;
  }
`;

/**
 * Subtle inner highlight for premium buttons.
 */
export const buttonShine = css`
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.gradientButtonShine};
    pointer-events: none;
    opacity: ${({ theme }) => theme.effects.opacity.buttonShine};
  };
`;

/**
 * Shared hover lift utility — transform via Framer spring (usePhysicalInteraction).
 */
export const hoverLiftSm = css`
  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.borderLight};
    }
  }
`;

/**
 * Elevated surface with subtle top rim light (living surface).
 */
export const livingSurface = css`
  background: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${({ theme }) => theme.colors.gradientSurfaceRim};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.borderLight};
    pointer-events: none;
    z-index: 0;
  };
`;

/**
 * Featured card spotlight wash (atmospheric, not glow-heavy).
 */
export const featuredSpotlight = css`
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 45%;
    background: ${({ theme }) => theme.colors.gradientFeaturedSpotlight};
    pointer-events: none;
    z-index: 0;
  };
`;

/**
 * Operational glass panel — control-room surfaces (Live Lab, observatory).
 * ::before = 1px inset rim + rim wash; ::after = pointer-tracked caustic sweep.
 */
export const operationalGlass = css`
  ${glassSurface};
  ${cardPointerVars};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${({ theme }) => theme.colors.gradientSurfaceRim};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.borderLight};
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background:
      radial-gradient(
        320px circle at var(--spot-x, 50%) var(--spot-y, 50%),
        ${({ theme }) => theme.colors.primary}16 0%,
        transparent 58%
      ),
      conic-gradient(
        from 140deg at var(--spot-x, 50%) var(--spot-y, 50%),
        ${({ theme }) => theme.colors.primary}12 0deg,
        transparent 55deg,
        rgba(255, 255, 255, 0.05) 120deg,
        transparent 200deg
      );
    opacity: var(--spot-opacity, 0);
    mix-blend-mode: soft-light;
    transition: opacity ${({ theme }) => theme.transitions.normal};
    pointer-events: none;
    z-index: 1;
  }
`;

/**
 * Deep instrument glass — hero portrait, immersion observatory frame (depth via gradient).
 */
export const operationalGlassDeep = css`
  ${operationalGlass};
  background:
    ${({ theme }) => theme.colors.gradientGlassDepth},
    ${({ theme }) => theme.colors.surfaceGlass};
`;

/**
 * Operational cell — hover border only (dense grids).
 */
export const cardOperationalCell = css`
  ${operationalGlass};
  ${surfaceMotion};

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.primaryBorderFaint};
    }
  }
`;

/**
 * Pointer-driven glow via CSS variables (--spot-x, --spot-y, --spot-opacity).
 * Use on marketing cards that do not already consume ::after via operationalGlass.
 */
export const pointerSpotlight = css`
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      360px circle at var(--spot-x, 50%) var(--spot-y, 50%),
      ${({ theme }) => theme.colors.primary}0c,
      transparent 58%
    );
    opacity: var(--spot-opacity, 0);
    transition: opacity ${({ theme }) => theme.transitions.normal};
    pointer-events: none;
    z-index: 1;
  }
`;

/**
 * Hover lift + depth — transform via spring physics layer.
 */
export const cardHoverElevated = css`
  ${surfaceMotion};

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.borderLight};
    }
  }
`;

/**
 * Marketing interactive card — pointer spotlight + CSS lift (pair with pointer tracking).
 */
export const cardInteractive = css`
  ${cardPointerVars};
  ${pointerSpotlight};
  ${interactiveLift};
  ${surfaceMotion};

  @media (hover: hover) {
    &:hover {
      --spot-opacity: 1;
      border-color: ${({ theme }) => theme.colors.borderLight};
    }
  }

  @media (hover: none) {
    transform: none;
    --spot-opacity: 0;
  }
`;

/**
 * KPI / stat tile — left signal bar (Datadog metric widget).
 */
export const cardStatSignal = css`
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  position: relative;
  overflow: hidden;
  border-left: 3px solid ${({ theme }) => theme.colors.primaryBorderFaint};
  box-shadow: inset 3px 0 16px ${({ theme }) => theme.colors.primary}12;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${({ theme }) => theme.colors.gradientSurfaceRim};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.borderLight};
    pointer-events: none;
    z-index: 0;
  }

  @media (hover: hover) {
    &:hover {
      border-left-color: ${({ theme }) => theme.colors.primaryBorderStrong};
      border-color: ${({ theme }) => theme.colors.primaryBorderFaint};
      box-shadow: inset 3px 0 20px ${({ theme }) => theme.colors.primary}1f;
    }
  }
`;

/**
 * Selectable showcase row — solid elevated surface, gradient rim, md elevation only.
 * CSS lift via interactiveLiftShowcase; Framer whileTap on the card component.
 */
export const interactiveLiftShowcase = css`
  transition:
    transform ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.fast};

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.borderLight};
      transform: translateY(calc(-1 * ${({ theme }) => theme.motion.distance.liftMd}));
      will-change: transform;
    }
  }

  @media (hover: none) {
    transform: none;
  }
`;

/**
 * Amber (#f59e0b) pointer torch — pair with --spot-x / --spot-y / --spot-opacity on the card root.
 */
/**
 * Specular cobalt rim — pair with 3D tilt on showcase cards at hover.
 */
export const showcaseSpecularRim = css`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 2;
  opacity: var(--spot-opacity, 0);
  transition: opacity ${({ theme }) => theme.transitions.normal};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}33 0%,
    transparent 38%,
    transparent 62%,
    ${({ theme }) => theme.colors.accent}22 100%
  );
  box-shadow:
    inset 0 0 0 1px ${({ theme }) => theme.colors.primaryBorderFaint},
    inset 0 1px 24px ${({ theme }) => theme.colors.primary}18;

  @media (hover: none) {
    opacity: 0;
  }
`;

export const showcasePointerTorch = css`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 1;
  background: radial-gradient(
    420px circle at var(--spot-x, 50%) var(--spot-y, 50%),
      ${({ theme }) => theme.colors.primary}29 0%,
      ${({ theme }) => theme.colors.primary}0d 38%,
    transparent 62%
  );
  opacity: var(--spot-opacity, 0);
  transition: opacity ${({ theme }) => theme.transitions.normal};

  @media (hover: none) {
    opacity: 0;
  }
`;

/**
 * showcase-selectable archetype — glass observability panel (Projects / Trabalhos).
 */
export const cardShowcaseSurface = css`
  ${cardPointerVars};
  background: ${({ theme }) => theme.colors.surfaceGlass};
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.glass};
  -webkit-backdrop-filter: ${({ theme }) => theme.effects.backdrop.glass};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  box-shadow: ${({ theme }) => theme.elevation.md};
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${({ theme }) => theme.colors.gradientSurfaceRim};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.borderLight};
    pointer-events: none;
    z-index: 0;
  }

  ${interactiveLiftShowcase};

  @media (hover: hover) {
    &:hover {
      --spot-opacity: 1;
      box-shadow: ${({ theme }) => theme.elevation.md};
      border-color: ${({ theme }) => theme.colors.borderLight};
    }
  }

  @media (hover: none) {
    transform: none;
    --spot-opacity: 0;
  }
`;

/**
 * Inset rim on ::before — for panels that reserve ::after for scan/sweep layers.
 */
export const panelInsetRim = css`
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${({ theme }) => theme.colors.gradientSurfaceRim};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.borderLight};
    pointer-events: none;
    z-index: 0;
  };
`;

/**
 * Standard panel chrome — border + inset rim, no drop shadow.
 */
export const panelChrome = css`
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  ${panelInsetRim};
`;

/**
 * Primary CTA inset highlight — pairs with buttonShine (::before).
 */
export const buttonPrimaryRim = css`
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.22);
    pointer-events: none;
    z-index: 2;
  };
`;

/**
 * Drawer / slide-over panel — left edge + inset rim.
 */
export const drawerPanelChrome = css`
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  ${panelInsetRim};
`;

/**
 * Card titles inside flex/grid — wrap at word boundaries, not mid-token.
 */
export const cardTitleReadable = css`
  min-width: 0;
  overflow-wrap: anywhere;
  word-break: normal;
  hyphens: auto;
`;

/**
 * Card body copy — same wrapping rules as titles.
 */
export const cardBodyReadable = css`
  min-width: 0;
  overflow-wrap: anywhere;
  word-break: normal;
  hyphens: auto;
`;

/**
 * Card titles capped at two lines (editorial grids).
 */
export const cardTitleClamp = css`
  ${cardTitleReadable};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

/**
 * Card titles capped at three lines (certificate / long labels).
 */
export const cardTitleClamp3 = css`
  ${cardTitleReadable};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;
