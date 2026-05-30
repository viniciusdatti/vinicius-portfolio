// Libraries
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

// Styles
import {
  cardMarketingGlass,
  cardPointerVars,
  surfaceMotion,
} from '../../styles/surfaces';
import { scrollAnchorOffset } from '../../styles/sectionRhythm';

export const skillCardLiftMd = css`
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

export const skillAmberPointerSpotlight = css`
  &::after {
    content: '';
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
  }

  @media (hover: hover) {
    &:hover {
      --spot-opacity: 1;
    }
  }
`;

export const skillsCardGlassArchetype = css`
  ${cardMarketingGlass};
  ${cardPointerVars};
  ${skillAmberPointerSpotlight};
  ${skillCardLiftMd};
  ${surfaceMotion};

  @media (hover: none) {
    --spot-opacity: 0;
  }
`;

export const SkillsStaggerSlot = styled(motion.div)`
  display: contents;
`;

export const Section = styled(motion.section)`
  margin-bottom: ${({ theme }) => theme.spacing.section};
  ${scrollAnchorOffset};
`;

export const SectionTitleGradient = styled.span`
  display: inline;
  background: ${({ theme }) => theme.colors.gradientTextDisplay};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: transparent;
  text-wrap: balance;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.borderSubtle};
  };
`;

export const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const SkillsFeedbackPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.proseWide};
  margin-inline: auto;
  padding: clamp(1.25rem, 4vw, ${({ theme }) => theme.spacing.xxl})
    ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};
  box-sizing: border-box;
`;

export const ErrorMessage = styled.p`
  width: 100%;
  color: ${({ theme }) => theme.colors.error};
  margin: 0;
  text-align: center;
  text-wrap: balance;
`;

export const SkillsLoadingMessage = styled.p`
  width: 100%;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 0;
  text-align: center;
  text-wrap: balance;
`;

export const RetryButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradientButtonPrimary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.borderLight};
    pointer-events: none;
  };

  &:hover {
    filter: brightness(1.04);
  };
`;
