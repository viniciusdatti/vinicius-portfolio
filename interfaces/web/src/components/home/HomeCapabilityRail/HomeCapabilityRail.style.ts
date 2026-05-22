// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const CapabilityBand = styled.section`
  width: 100%;
  padding: clamp(4rem, 9vw, 6.5rem) ${({ theme }) => theme.spacing.pageX};
  scroll-margin-top: ${({ theme }) => theme.sizes.layout.headerOffset};
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
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.85;
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
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  transition: padding-left ${({ theme }) => theme.transitions.normal};

  @media (hover: hover) {
    &:hover {
      padding-left: ${({ theme }) => theme.spacing.md};
    }
  }
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
