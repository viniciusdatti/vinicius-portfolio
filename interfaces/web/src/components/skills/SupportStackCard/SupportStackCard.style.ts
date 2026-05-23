/**
 * @fileoverview Operational support-stack card surface — glass, rim, tier scale, icon well.
 */

// Libraries
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

// Types
import { SkillLayoutTier } from '@/domain/skills';
import type { SupportStackCardStyleProps } from '@/components/skills/SupportStackCard/SupportStackCard.types';

// Components
import {
  interactiveLift,
  operationalGlass,
} from '@/styles/surfaces';

// =================================================================================================
// ============================================ CONSTANTS ==========================================
// =================================================================================================

/** Vertical compact factor — 15% reduction vs legacy peripheral padding. */
const SUPPORT_STACK_COMPACT_FACTOR: number = 0.85;

// =================================================================================================
// ============================================= STYLES ============================================
// =================================================================================================

/** Cyan torch — overrides operationalGlass caustic ::after on support cells. */
const supportStackPointerTorch = css`
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: 1;
    mix-blend-mode: soft-light;
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
  }

  @media (hover: hover) {
    &:hover {
      --spot-opacity: 1;
      border-color: ${({ theme }) => theme.colors.primaryBorderFaint};
    }
  }
`;

const supportStackTierFeatured = css`
  min-height: 7rem;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  background:
    ${({ theme }) => theme.colors.gradientAccent},
    ${({ theme }) => theme.colors.surfaceGlass};
  border-left: 2px solid ${({ theme }) => theme.colors.primary};
`;

const supportStackTierStandard = css`
  min-height: calc(5.75rem * ${SUPPORT_STACK_COMPACT_FACTOR});
  padding: calc(${({ theme }) => theme.spacing.lg} * ${SUPPORT_STACK_COMPACT_FACTOR});
`;

const supportStackTierCompact = css`
  min-height: calc(5.25rem * ${SUPPORT_STACK_COMPACT_FACTOR});
  padding: calc(${({ theme }) => theme.spacing.md} * ${SUPPORT_STACK_COMPACT_FACTOR})
    calc(${({ theme }) => theme.spacing.lg} * ${SUPPORT_STACK_COMPACT_FACTOR});
`;

const supportStackTierInstrument = css`
  min-height: calc(5.5rem * ${SUPPORT_STACK_COMPACT_FACTOR});
  padding: calc(${({ theme }) => theme.spacing.md} * ${SUPPORT_STACK_COMPACT_FACTOR})
    calc(${({ theme }) => theme.spacing.lg} * ${SUPPORT_STACK_COMPACT_FACTOR});
  background:
    ${({ theme }) => theme.colors.primarySurface},
    ${({ theme }) => theme.colors.surfaceGlass};
`;

const resolveSupportStackTierSurface = (tier: SkillLayoutTier): ReturnType<typeof css> => {
  switch (tier) {
    case SkillLayoutTier.PeripheralFeatured:
      return supportStackTierFeatured;
    case SkillLayoutTier.PeripheralInstrument:
      return supportStackTierInstrument;
    case SkillLayoutTier.PeripheralCompact:
      return supportStackTierCompact;
    case SkillLayoutTier.PeripheralStandard:
    default:
      return supportStackTierStandard;
  }
};

/**
 * Canonical support-stack cell — operationalGlass, tier surfaces, interactiveLift.
 */
export const SupportStackCardRoot = styled(motion.div)<SupportStackCardStyleProps>`
  ${operationalGlass};
  ${supportStackPointerTorch};
  ${interactiveLift};
  ${({ $tier }) => resolveSupportStackTierSurface($tier)};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.elevation.md};

  @media (hover: hover) {
    &:hover {
      box-shadow: ${({ theme }) => theme.elevation.lg};
    }
  }

  @media (hover: none) {
    transform: none;
    --spot-opacity: 0;
  }

  & > * {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
  }
`;

/**
 * Centers the icon + copy cluster within the card footprint.
 */
export const SupportStackCardInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-width: 0;
`;

/**
 * Unified horizontal archetype — icon left, labels vertically centered on the right.
 */
export const SupportStackCardRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: calc(${({ theme }) => theme.spacing.md} * ${SUPPORT_STACK_COMPACT_FACTOR});
  width: 100%;
  min-width: 0;
`;

const supportStackIconWellFeatured = css`
  width: 52px;
  height: 52px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const supportStackIconWellStandard = css`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const supportStackIconWellCompact = css`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const resolveIconWellScale = (tier: SkillLayoutTier): ReturnType<typeof css> => {
  switch (tier) {
    case SkillLayoutTier.PeripheralFeatured:
      return supportStackIconWellFeatured;
    case SkillLayoutTier.PeripheralCompact:
    case SkillLayoutTier.PeripheralInstrument:
      return supportStackIconWellCompact;
    case SkillLayoutTier.PeripheralStandard:
    default:
      return supportStackIconWellStandard;
  }
};

/**
 * Icon pedestal — consistent glass well for mixed brand assets.
 */
export const SupportStackIconWell = styled.div<SupportStackCardStyleProps>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.mutedSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  box-shadow: inset 0 1px 0 ${({ theme }) => theme.colors.borderLight};
  ${({ $tier }) => resolveIconWellScale($tier)};

  img {
    width: 72%;
    height: 72%;
    object-fit: contain;
  }
`;

export const SupportStackTextColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: calc(${({ theme }) => theme.spacing.xs} * ${SUPPORT_STACK_COMPACT_FACTOR});
  min-width: 0;
  width: 100%;
`;

export const SupportStackLabel = styled.span<SupportStackCardStyleProps>`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme, $tier }) => (
    $tier === SkillLayoutTier.PeripheralFeatured
      ? theme.typography.fontSize.md
      : theme.typography.fontSize.sm
  )};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const SupportStackDescription = styled.span<SupportStackCardStyleProps>`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  letter-spacing: 0.05em;
  text-transform: lowercase;
  color: ${({ theme, $tier }) => (
    $tier === SkillLayoutTier.PeripheralFeatured
      ? theme.colors.textSecondary
      : theme.colors.textMuted
  )};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
`;
