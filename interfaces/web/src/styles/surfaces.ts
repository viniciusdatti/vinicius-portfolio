// Libraries
import { css } from 'styled-components';

/**
 * High-contrast internal inset rim — 1px hairline on ::before (Stripe/Vercel panel physics).
 * Prefer merging into an existing ::before when the surface already defines one.
 */
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
 * Premium hover lift for cards and tiles — transform handled by usePhysicalInteraction.
 */
export const interactiveLift = css`
  ${surfaceMotion};

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.borderLight};
    }
  }
`;

/**
 * Marketing glass card — rim light via ::before (no drop shadow stack).
 */
export const cardMarketingGlass = css`
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
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
 * Premium hover + directional light sweep — motion via usePhysicalInteraction.
 */
export const cardInteractive = css`
  ${cardPointerVars};
  ${pointerSpotlight};
  ${surfaceMotion};

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.borderLight};
    }
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
      border-left-color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.borderLight};
    }
  }
`;

/**
 * Selectable showcase row — solid rim + restrained hover (no pointer glow).
 */
export const cardShowcaseSurface = css`
  ${cardMarketingGlass};
  transform-style: preserve-3d;
  ${cardHoverElevated};
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
