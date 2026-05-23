// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ManifestoBand = styled.section`
  position: relative;
  z-index: 2;
  width: 100%;
  margin-top: 0;
  min-height: 12rem;
  padding: clamp(3.5rem, 9vw, 6rem) ${({ theme }) => theme.spacing.pageX};
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
      ${({ theme }) => theme.colors.primaryBorderFaint} 18%,
      ${({ theme }) => theme.colors.primaryBorderFaint} 82%,
      transparent
    );
    pointer-events: none;
  }
`;

export const ManifestoInner = styled(motion.div)`
  max-width: ${({ theme }) => theme.layout.contentWide};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(5rem, 8rem) minmax(0, 1fr);
    gap: clamp(2rem, 5vw, 4.5rem);
    align-items: start;
  }
`;

export const ManifestoIndex = styled(motion.span)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.sectionIndex};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 0.9;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.14;
  pointer-events: none;
  user-select: none;
`;

export const ManifestoQuote = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 36ch;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 28ch;
  }
`;

export const ManifestoLine = styled(motion.p)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(1.5rem, 3.6vw, 2.375rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  text-wrap: balance;
`;

export const ManifestoEmphasis = styled(motion.p)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(1.35rem, 3.2vw, 2rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  text-wrap: balance;
  padding-left: ${({ theme }) => theme.spacing.lg};
  border-left: 2px solid ${({ theme }) => theme.colors.accent};
`;

export const ManifestoMeta = styled(motion.span)`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;
