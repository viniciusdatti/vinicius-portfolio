// Libraries
import styled, { DefaultTheme } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Components
import {
  ProjectCanvasTone,
} from '../../ProjectShowcase/ProjectShowcase.types';

const canvasGradient = (
  tone: ProjectCanvasTone | undefined,
  theme: DefaultTheme,
): string => {
  if (tone === ProjectCanvasTone.B) return theme.colors.gradientProjectCanvasB;
  if (tone === ProjectCanvasTone.C) return theme.colors.gradientProjectCanvasC;
  return theme.colors.gradientProjectCanvasA;
};

export const WorkStage = styled.section`
  position: relative;
  z-index: 3;
  width: 100%;
  min-height: 24rem;
  padding: clamp(3rem, 7vw, 5rem) ${({ theme }) => theme.spacing.pageX}
    clamp(4rem, 10vw, 7rem);
  scroll-margin-top: calc(${({ theme }) => theme.sizes.layout.headerOffset} + 0.5rem);
`;

export const WorkStageGrid = styled.div`
  max-width: ${({ theme }) => theme.layout.contentWide};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(2.5rem, 6vw, 4rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(220px, 0.34fr) minmax(0, 1fr);
    gap: clamp(1.5rem, 4vw, 3rem);
    align-items: start;
  }
`;

export const WorkRail = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    position: sticky;
    top: calc(${({ theme }) => theme.sizes.layout.headerOffset} + 2rem);
    padding-top: ${({ theme }) => theme.spacing.md};
  }
`;

export const WorkRailIndex = styled(motion.span)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 0.85;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.15;
  pointer-events: none;
  user-select: none;
`;

export const WorkEyebrow = styled(motion.span)`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

export const WorkTitle = styled(motion.h2)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  margin: 0;
  max-width: 11ch;
`;

export const WorkStory = styled(motion.p)`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: ${({ theme }) => theme.layout.prose};
`;

const MotionWorkLink = motion.create(Link);

export const WorkRailLink = styled(MotionWorkLink)`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    text-decoration: underline;
  }
`;

export const WorkCanvas = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-left: -2%;
    padding-top: ${({ theme }) => theme.spacing.xxl};
  }
`;

export interface RunwayProps {
  $tone: ProjectCanvasTone;
  $active?: boolean;
}

export const RunwayContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
`;

export const FeaturedRunway = styled(motion.button)<RunwayProps>`
  position: relative;
  width: 100%;
  text-align: left;
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primaryBorderFaint : theme.colors.borderSubtle)};
  border-bottom: 1px solid
    ${({ $active, theme }) => ($active ? theme.colors.primaryBorderFaint : theme.colors.borderSubtle)};
  background: ${({ $tone, theme }) => canvasGradient($tone, theme)};
  aspect-ratio: 2.15 / 1;
  min-height: 200px;
  padding: clamp(1.25rem, 3vw, 2rem) clamp(1.25rem, 3vw, 2rem) clamp(1.5rem, 4vw, 2.5rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.xl} ${({ theme }) => theme.borderRadius.xl} 0 0;
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.normal};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      180deg,
      transparent 35%,
      ${({ theme }) => theme.colors.background}dd 100%
    );
    pointer-events: none;
  };

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.borderLight};
    pointer-events: none;
    z-index: 2;
  };

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.primaryBorderFaint};
      transform: translateY(-${({ theme }) => theme.motion.distance.liftMd});
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }
`;

export const RunwayIndex = styled.span`
  position: relative;
  z-index: 1;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const RunwayTitle = styled.span`
  position: relative;
  z-index: 1;
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  color: ${({ theme }) => theme.colors.text};
  max-width: 16ch;
`;

export const RunwayTech = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const RunwayTechTag = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.06em;
`;

export const CaseIndexList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-top: none;
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.xl} ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.borderLight};
    pointer-events: none;
    border-radius: inherit;
    z-index: 1;
  };
`;

export const CaseIndexRow = styled(motion.button)<{ $active?: boolean }>`
  display: grid;
  grid-template-columns: 4.75rem minmax(0, 1fr) auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ $active, theme }) => ($active ? theme.colors.mutedSurface : 'transparent')};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:last-child {
    border-bottom: none;
  }

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }) => theme.colors.mutedSurface};
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: -2px;
  }
`;

export const CaseIndexLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.primary};
`;

export const CaseIndexTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CaseIndexArrow = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const CasePanelSlot = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const WorkError = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

export const WorkRetry = styled.button`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;
