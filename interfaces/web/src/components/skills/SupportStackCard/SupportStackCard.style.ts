/**
 * @fileoverview Operational support-stack card surface — glass, rim, amber torch, liftMd.
 */

// Libraries
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

// Types
import type { SupportStackGridPlacementProps } from '@/components/Skills/SupportStackCard/SupportStackCard.types';

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

/** Amber (#f59e0b) torch — overrides operationalGlass caustic ::after on support cells. */
const supportStackAmberTorch = css`
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
      rgba(245, 158, 11, 0.16) 0%,
      rgba(245, 158, 11, 0.05) 38%,
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
    }
  }
`;

const supportStackGridPlacement = css<SupportStackGridPlacementProps>`
  grid-column: span 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: span ${({ $gridSpan }) => Math.min($gridSpan, 2)};
  }
`;

/**
 * Canonical support-stack cell — operationalGlass, elevation.md only, interactiveLift.
 */
export const SupportStackCardRoot = styled(motion.div)<SupportStackGridPlacementProps>`
  ${operationalGlass};
  ${supportStackAmberTorch};
  ${interactiveLift};
  ${supportStackGridPlacement};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: calc(${({ theme }) => theme.spacing.lg} * ${SUPPORT_STACK_COMPACT_FACTOR});
  min-height: calc(5.5rem * ${SUPPORT_STACK_COMPACT_FACTOR});
  box-shadow: ${({ theme }) => theme.elevation.md};

  @media (hover: hover) {
    &:hover {
      box-shadow: ${({ theme }) => theme.elevation.md};
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
  align-items: flex-start;
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
  align-items: flex-start;
  justify-content: flex-start;
  gap: calc(${({ theme }) => theme.spacing.md} * ${SUPPORT_STACK_COMPACT_FACTOR});
  width: 100%;
  min-width: 0;
`;

export const SupportStackIcon = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
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

export const SupportStackLabel = styled.span`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const SupportStackDescription = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  letter-spacing: 0.04em;
  text-transform: lowercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
`;
