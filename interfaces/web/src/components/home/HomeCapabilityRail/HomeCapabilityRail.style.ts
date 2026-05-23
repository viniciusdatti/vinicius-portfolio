// Libraries
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Components
import { surfaceMotion } from '@/styles/surfaces';

/* *************************************************************************************************
 ********************************************** GRID ***********************************************
 ************************************************************************************************ */

const CAPABILITY_SIGNAL_COL: string = '4.5rem';
const CAPABILITY_SIGNAL_COL_MOBILE: string = '3.25rem';
const CAPABILITY_ICON_SLOT: string = '40px';
const CAPABILITY_META_COL: string = 'minmax(13rem, 20rem)';

const capabilityRowGrid = css`
  display: grid;
  grid-template-columns:
    ${CAPABILITY_SIGNAL_COL}
    minmax(0, 1fr)
    auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns:
      ${CAPABILITY_SIGNAL_COL}
      minmax(0, 1fr)
      ${CAPABILITY_META_COL};
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`;

/**
 * Elevated registry cell — one explicit edge vs. dot-grid background (no stacked hairlines).
 */
const capabilityEntrySurface = css`
  ${surfaceMotion};
  position: relative;
  background: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.elevation.sm};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
`;

/* *************************************************************************************************
 ********************************************** SHELL **********************************************
 ************************************************************************************************ */

export const CapabilityBand = styled.section`
  position: relative;
  isolation: isolate;
  width: 100%;
  min-height: 18rem;
  contain: layout;
  padding: clamp(4rem, 9vw, 6.5rem) ${({ theme }) => theme.spacing.pageX};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  scroll-margin-top: calc(${({ theme }) => theme.sizes.layout.headerOffset} + 0.5rem);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    opacity: 0.72;
  };
`;

export const CapabilityShell = styled.div`
  max-width: ${({ theme }) => theme.layout.contentWide};
  margin: 0 auto;
`;

export const CapabilityHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: clamp(2rem, 5vw, 3.5rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(5rem, 7rem) minmax(0, 1fr) auto;
    align-items: end;
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`;

export const CapabilityIndex = styled(motion.span)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(2.5rem, 6vw, 4rem);
  line-height: 0.85;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.14;
  pointer-events: none;
  user-select: none;
`;

export const CapabilityTitle = styled(motion.h2)`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  max-width: 14ch;
`;

const MotionCapabilityLink = motion.create(Link);

export const CapabilityLink = styled(MotionCapabilityLink)`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    white-space: normal;
    overflow-wrap: anywhere;
  }

  &:hover {
    text-decoration: underline;
  };
`;

/* *************************************************************************************************
 ********************************************** ROWS ***********************************************
 ************************************************************************************************ */

export const CapabilityList = styled(motion.ul)`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CapabilityRow = styled(motion.li)`
  ${capabilityEntrySurface};
  ${capabilityRowGrid};
  transition:
    transform ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: ${CAPABILITY_SIGNAL_COL_MOBILE} minmax(0, 1fr);
    grid-template-rows: auto auto;
    align-items: start;
    column-gap: ${({ theme }) => theme.spacing.sm};
    row-gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};

    & > :first-child {
      grid-column: 1;
      grid-row: 1;
      align-self: start;
    }

    & > :nth-child(2) {
      grid-column: 2;
      grid-row: 1;
      min-width: 0;
    }

    & > :nth-child(3) {
      grid-column: 1 / -1;
      grid-row: 2;
      min-width: 0;
      padding-top: ${({ theme }) => theme.spacing.xs};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    row-gap: ${({ theme }) => theme.spacing.sm};

    & > :first-child {
      grid-column: 1;
      grid-row: 1;
    }

    & > :nth-child(2) {
      grid-column: 1;
      grid-row: 2;
    }

    & > :nth-child(3) {
      grid-column: 1;
      grid-row: 3;
      padding-top: 0;
    }
  }

  @media (hover: hover) {
    &:hover {
      transform: translateX(${({ theme }) => theme.spacing.sm});
      border-color: ${({ theme }) => theme.colors.borderLight};
      box-shadow: ${({ theme }) => theme.elevation.md};
    };
  };
`;

export const CapabilityFeaturedRow = styled(motion.li)`
  ${capabilityEntrySurface};
  ${capabilityRowGrid};
  border-color: ${({ theme }) => theme.colors.primaryBorderFaint};
  box-shadow:
    ${({ theme }) => theme.elevation.sm},
    0 0 0 1px ${({ theme }) => theme.colors.primaryBorderFaint};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.lg};
  };
`;

export const CapabilitySignal = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  opacity: 0.75;
  font-variant-numeric: tabular-nums;
  min-width: 0;
  overflow-wrap: anywhere;
`;

export const CapabilityNameLead = styled.div<{ $featured?: boolean }>`
  display: grid;
  grid-template-columns: ${CAPABILITY_ICON_SLOT} minmax(0, 1fr);
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  min-width: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text};

  ${({ $featured, theme }): ReturnType<typeof css> => {
    if ($featured) {
      return css`
        font-size: clamp(2.25rem, 6vw, 3.75rem);
        font-weight: ${theme.typography.fontWeight.bold};
        line-height: ${theme.typography.lineHeight.tight};
      `;
    }

    return css`
      font-size: clamp(1.25rem, 2.8vw, 1.75rem);
    `;
  }}

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const CapabilityNameIconSlot = styled.span`
  display: block;
  width: ${CAPABILITY_ICON_SLOT};
  height: ${CAPABILITY_ICON_SLOT};
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;

export const CapabilityName = styled.span`
  min-width: 0;
  overflow-wrap: anywhere;
`;

export const CapabilityMeta = styled.div`
  display: grid;
  grid-template-columns: ${CAPABILITY_ICON_SLOT} minmax(0, 1fr);
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 0;
  width: 100%;
  padding-top: ${({ theme }) => theme.spacing.xs};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    justify-self: stretch;
    padding-top: 0;
  };
`;

export const CapabilityIcon = styled.img`
  width: ${CAPABILITY_ICON_SLOT};
  height: ${CAPABILITY_ICON_SLOT};
  opacity: 0.85;
  flex-shrink: 0;
  justify-self: center;
`;

export const CapabilityDomain = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  min-width: 0;
  overflow-wrap: anywhere;
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
`;

export const CapabilityFeaturedMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
  width: 100%;
`;

export const CapabilityFeaturedDesc = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: 36ch;
  min-width: 0;
  overflow-wrap: anywhere;
`;

export const CapabilityFeaturedDomain = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;
