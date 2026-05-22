// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const CapabilityBand = styled.section`
  width: 100%;
  padding: clamp(4rem, 9vw, 6.5rem) ${({ theme }) => theme.spacing.pageX};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  scroll-margin-top: calc(${({ theme }) => theme.sizes.layout.headerOffset} + 0.5rem);
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

export const CapabilityIndex = styled.span`
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

export const CapabilityLink = styled(Link)`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

export const CapabilityList = styled(motion.ul)`
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

export const CapabilityRow = styled(motion.li)`
  display: grid;
  grid-template-columns: 4.5rem minmax(0, 1fr) auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  transition:
    transform ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.fast};

  @media (hover: hover) {
    &:hover {
      transform: translateX(${({ theme }) => theme.spacing.sm});
      border-color: ${({ theme }) => theme.colors.borderLight};
    }
  }
`;

export const CapabilitySignal = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  opacity: 0.75;
  font-variant-numeric: tabular-nums;
`;

export const CapabilityName = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(1.25rem, 2.8vw, 1.75rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text};
`;

export const CapabilityMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const CapabilityIcon = styled.img`
  width: 36px;
  height: 36px;
  opacity: 0.85;
`;

export const CapabilityDomain = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  min-width: 5rem;
  text-align: right;
`;

// ── Featured row (primeiro item — hierarquia editorial) ───────────────────────

export const CapabilityFeaturedRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl} 0
    ${({ theme }) => theme.spacing.xxl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 4.5rem minmax(0, 0.42fr) minmax(0, 1fr);
    align-items: end;
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`;

export const CapabilityFeaturedName = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(2.25rem, 6vw, 3.75rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  color: ${({ theme }) => theme.colors.text};

  img {
    width: 44px;
    height: 44px;
    opacity: 0.9;
    flex-shrink: 0;
  }
`;

export const CapabilityFeaturedMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const CapabilityFeaturedDesc = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: 36ch;
`;

export const CapabilityFeaturedDomain = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;
