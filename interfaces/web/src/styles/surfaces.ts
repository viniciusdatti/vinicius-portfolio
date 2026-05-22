// Libraries
import { css } from 'styled-components';

/**
 * Standard surface motion — align with theme.transitions / motionPresets.
 */
export const surfaceMotion = css`
  transition:
    transform ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};
`;

/**
 * CSS variables for pointer-driven card lighting.
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
  box-shadow: ${({ theme }) => theme.elevation.md};
`;

/**
 * Premium hover lift for cards and tiles.
 */
export const interactiveLift = css`
  transition:
    transform ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.fast};

  @media (hover: hover) {
    &:hover {
      transform: translateY(-${({ theme }) => theme.motion.distance.liftSm});
      box-shadow: ${({ theme }) => theme.elevation.lg};
      border-color: ${({ theme }) => theme.colors.borderLight};
    }
  }
`;

/**
 * Marketing glass card — rim + optional featured wash (no living+glass stack).
 */
/** Solid elevated panel — rim light without frosted blur (premium, not template glass). */
export const cardMarketingGlass = css`
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.elevation.md};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.gradientSurfaceRim};
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
 * Shared hover lift utility (smaller displacement).
 */
export const hoverLiftSm = css`
  @media (hover: hover) {
    &:hover {
      transform: translateY(-${({ theme }) => theme.motion.distance.liftSm});
    }
  }
`;

/**
 * Elevated surface with subtle top rim light (living surface).
 */
export const livingSurface = css`
  background: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  box-shadow: ${({ theme }) => theme.elevation.md};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.gradientSurfaceRim};
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
 */
export const operationalGlass = css`
  ${glassSurface};
  background: ${({ theme }) => theme.colors.surfaceGlass};
  box-shadow:
    ${({ theme }) => theme.elevation.md},
    inset 0 1px 0 ${({ theme }) => theme.colors.borderLight};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.gradientSurfaceRim};
    pointer-events: none;
    z-index: 0;
  }
`;

/**
 * Operational cell — hover border only (dense grids).
 */
export const cardOperationalCell = css`
  ${operationalGlass};
  transition:
    box-shadow ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.fast};

  @media (hover: hover) {
    &:hover {
      box-shadow: ${({ theme }) => theme.elevation.lg};
      border-color: ${({ theme }) => theme.colors.primaryBorderFaint};
    }
  }
`;

/**
 * Pointer-driven glow via CSS variables (--spot-x, --spot-y, --spot-opacity).
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
 * Hover lift + depth — no pointer glow (showcase, tiles).
 */
export const cardHoverElevated = css`
  ${surfaceMotion};

  @media (hover: hover) {
    &:hover {
      transform: translateY(-${({ theme }) => theme.motion.distance.liftSm});
      box-shadow: ${({ theme }) => theme.elevation.lg};
      border-color: ${({ theme }) => theme.colors.borderLight};
    }
  }
`;

/**
 * Premium hover + subtle spotlight (sparse marketing cards only).
 */
export const cardInteractive = css`
  ${cardPointerVars};
  ${pointerSpotlight};
  ${surfaceMotion};

  @media (hover: hover) {
    &:hover {
      transform: translateY(-${({ theme }) => theme.motion.distance.liftSm});
      box-shadow: ${({ theme }) => theme.elevation.lg};
      border-color: ${({ theme }) => theme.colors.borderLight};
      --spot-opacity: 0.55;
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
  box-shadow: ${({ theme }) => theme.elevation.sm};
  border-left: 3px solid ${({ theme }) => theme.colors.primaryBorderFaint};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.gradientSurfaceRim};
    pointer-events: none;
    z-index: 0;
  }

  @media (hover: hover) {
    &:hover {
      border-left-color: ${({ theme }) => theme.colors.primary};
      box-shadow: ${({ theme }) => theme.elevation.md};
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
