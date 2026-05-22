// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ManifestoBand = styled.section`
  position: relative;
  z-index: 2;
  width: 100%;
  margin-top: -2.5rem;
  padding: clamp(3rem, 8vw, 5.5rem) ${({ theme }) => theme.spacing.pageX};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.background};
`;

export const ManifestoInner = styled(motion.div)`
  max-width: ${({ theme }) => theme.layout.contentWide};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(5rem, 7rem) minmax(0, 1fr);
    gap: clamp(2rem, 5vw, 4rem);
    align-items: start;
  }
`;

export const ManifestoIndex = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.sectionIndex};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 0.9;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text};
  opacity: ${({ theme }) => theme.effects.opacity.scrollCueMin};
`;

export const ManifestoLine = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(1.35rem, 3.2vw, 2.125rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  max-width: 28ch;
  text-wrap: balance;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 22ch;
  }
`;

export const ManifestoMeta = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;
