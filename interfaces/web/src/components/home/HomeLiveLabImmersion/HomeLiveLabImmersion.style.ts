// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const ImmersionBand = styled.section`
  position: relative;
  z-index: 4;
  width: 100%;
  margin-top: clamp(-4rem, -8vw, -2rem);
  padding: clamp(5rem, 12vw, 9rem) ${({ theme }) => theme.spacing.pageX}
    clamp(4rem, 9vw, 6rem);
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  scroll-margin-top: ${({ theme }) => theme.sizes.layout.headerOffset};
  overflow: visible;

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

export const ImmersionGrid = styled(motion.div)`
  max-width: ${({ theme }) => theme.layout.contentWide};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 0.38fr) minmax(0, 1fr);
    gap: clamp(1rem, 3vw, 2rem);
    align-items: end;
  }
`;

export const ImmersionCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-bottom: ${({ theme }) => theme.spacing.xxl};
  }
`;

export const ImmersionIndex = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 0.85;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.35;
`;

export const ImmersionEyebrow = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

export const ImmersionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  margin: 0;
  max-width: 12ch;
`;

export const ImmersionLead = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: ${({ theme }) => theme.layout.prose};
`;

export const LiveBadge = styled.span`
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

export const ImmersionCta = styled(Link)`
  display: inline-flex;
  width: fit-content;
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition:
    background-color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-${({ theme }) => theme.motion.distance.liftSm});
  }
`;

export const ImmersionVisual = styled.div`
  position: relative;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-top: -4.5rem;
    z-index: 2;
  }
`;

export const VisualFrame = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.elevation.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  overflow: hidden;
`;
