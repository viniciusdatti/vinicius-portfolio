// Libraries
import { css } from 'styled-components';

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

  &:hover {
    transform: translateY(-${({ theme }) => theme.motion.distance.liftMd});
    box-shadow: ${({ theme }) => theme.elevation.lg};
    border-color: ${({ theme }) => theme.colors.borderLight};
  };
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
  &:hover {
    transform: translateY(-${({ theme }) => theme.motion.distance.liftSm});
  };
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
 * Pointer-driven glow via CSS variables (--spot-x, --spot-y, --spot-opacity).
 */
export const pointerSpotlight = css`
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      480px circle at var(--spot-x, 50%) var(--spot-y, 50%),
      ${({ theme }) => theme.colors.primary}18,
      transparent 55%
    );
    opacity: var(--spot-opacity, 0);
    transition: opacity 0.35s ease;
    pointer-events: none;
    z-index: 1;
  }
`;
