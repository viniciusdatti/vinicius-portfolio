// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Theme
import { operationalGlass } from '@/styles/surfaces';

export const CloseBand = styled.section`
  width: 100%;
  padding: clamp(4rem, 10vw, 7rem) ${({ theme }) => theme.spacing.pageX}
    clamp(5rem, 12vw, 8rem);
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

export const CloseGrid = styled.div`
  max-width: ${({ theme }) => theme.layout.contentWide};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(3rem, 8vw, 5rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.72fr);
    gap: clamp(2rem, 5vw, 3.5rem);
    align-items: end;
  }
`;

export const AboutChapter = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  border-left: 2px solid ${({ theme }) => theme.colors.accent};
  padding-left: ${({ theme }) => theme.spacing.xl};
`;

export const ChapterIndex = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 0.85;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.14;
  pointer-events: none;
  user-select: none;
`;

export const ChapterTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  max-width: 16ch;
  text-wrap: balance;
`;

export const ChapterBody = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: ${({ theme }) => theme.layout.proseWide};
`;

export const ChapterLink = styled(Link)`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ContactChapter = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: clamp(1.75rem, 3.5vw, 2.25rem);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  ${operationalGlass};

  & > * {
    position: relative;
    z-index: 1;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    transform: translateY(2rem);
  }
`;

export const ContactTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const ContactBody = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

export const ContactCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.gradientButtonPrimary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  min-height: ${({ theme }) => theme.sizes.button.minHeight};
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
