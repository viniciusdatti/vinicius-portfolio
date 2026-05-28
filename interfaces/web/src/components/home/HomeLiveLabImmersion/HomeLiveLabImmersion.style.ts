// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Components
import { operationalGlassDeep } from '../../../styles/surfaces';

export const ImmersionBand = styled.section`
  position: relative;
  z-index: 4;
  width: 100%;
  margin-top: 0;
  scroll-margin-top: calc(${({ theme }) => theme.sizes.layout.headerOffset} + 0.5rem);
  isolation: isolate;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.borderSubtle} 20%,
      ${({ theme }) => theme.colors.borderSubtle} 80%,
      transparent
    );
  }
`;

export const ImmersionPinStage = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.sizes.layout.headerOffset});
  min-height: calc(100svh - ${({ theme }) => theme.sizes.layout.headerOffset});
  display: flex;
  align-items: center;
  padding: clamp(3rem, 8vw, 5rem) ${({ theme }) => theme.spacing.pageX};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    min-height: auto;
    padding: clamp(4rem, 10vw, 7rem) ${({ theme }) => theme.spacing.pageX}
      clamp(4rem, 9vw, 6rem);
  }
`;

export const ImmersionAtmosphere = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  background:
    radial-gradient(
      ellipse 70% 50% at 65% 8%,
      ${({ theme }) => theme.colors.primary}14,
      transparent 55%
    ),
    radial-gradient(
      ellipse 50% 40% at 30% 90%,
      ${({ theme }) => theme.colors.accent}0a,
      transparent 50%
    );

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export const ImmersionGrid = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentWide};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 0.38fr) minmax(0, 1fr);
    gap: clamp(1rem, 3vw, 2rem);
    align-items: center;
  }
`;

export const ImmersionCopy = styled(motion.div)`
  min-height: 12rem;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-bottom: ${({ theme }) => theme.spacing.xxl};
  }
`;

export const ImmersionIndex = styled(motion.span)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 0.85;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.14;
  pointer-events: none;
  user-select: none;
`;

export const ImmersionEyebrow = styled(motion.span)`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

export const ImmersionTitle = styled(motion.h2)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  margin: 0;
  max-width: 12ch;
`;

export const ImmersionLead = styled(motion.p)`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: ${({ theme }) => theme.layout.prose};
`;

export const LiveBadge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.onSuccess};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.85;
  }
`;

const MotionImmersionCta = motion.create(Link);

export const ImmersionCta = styled(MotionImmersionCta)`
  display: inline-flex;
  width: fit-content;
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.gradientButtonPrimary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  min-height: ${({ theme }) => theme.sizes.button.minHeight};
  align-items: center;
  position: relative;
  overflow: hidden;
  transition:
    filter ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.normal};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.gradientButtonShine};
    pointer-events: none;
    opacity: ${({ theme }) => theme.effects.opacity.buttonShine};
  }

  &:hover {
    filter: brightness(1.08);
    transform: translateY(-${({ theme }) => theme.motion.distance.liftSm});
    color: ${({ theme }) => theme.colors.onPrimary};
  }
`;

export const ImmersionVisual = styled(motion.div)`
  position: relative;
  min-width: 0;
  min-height: 16rem;
  contain: layout;
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-top: 0;
    align-self: center;
  }
`;

export const ObservatoryCanvas = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  transform-origin: 50% 50%;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    will-change: auto;
  }
`;

export const ImmersionFieldParallax = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  border-radius: inherit;
`;

export const VisualFrame = styled.div`
  --immersion-t: 0;
  position: relative;
  border-radius: calc(
    ${({ theme }) => theme.borderRadius.xl} * (1 - var(--immersion-t, 0))
  );
  padding: calc(
    ${({ theme }) => theme.spacing.lg} * (1 - var(--immersion-t, 0))
  );
  overflow: hidden;
  ${operationalGlassDeep};
`;

export const VisualFrameForeground = styled.div`
  position: relative;
  z-index: 1;
`;

export const NarrativeProgressTrack = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  width: min(12rem, 40vw);
  height: 2px;
  background: ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  z-index: 5;
  opacity: 0.65;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export const NarrativeProgressFill = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.accent};
  transform: scaleX(0);
  transform-origin: left center;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    will-change: auto;
  }
`;
