// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styles
import { cardTitleClamp3 } from '../../../styles/surfaces';
import {
  Section,
  SectionTitle,
  skillsCardGlassArchetype,
} from '../Skills.style';

export const CertificatesSection = styled(Section)`
  margin-top: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const CertificatesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
    gap: ${({ theme }) => theme.spacing.md};
  };
`;

export interface CertificateCardProps {
  $platformColor?: string;
}

export const CertificateCard = styled(motion.div)<CertificateCardProps>`
  ${skillsCardGlassArchetype};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.borderLight};
    }
  }

  @media (hover: none) {
    transform: none;
  }

  & > * {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
  }
`;

export const CertificateHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export interface PlatformLogoProps {
  $bgColor?: string;
}

export const PlatformLogo = styled.div<PlatformLogoProps>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ $bgColor, theme }) => $bgColor || theme.colors.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: ${({ theme }) => theme.spacing.xs};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  };
`;

export const CertificateName = styled.h4`
  ${cardTitleClamp3};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  line-height: 1.4;
`;

export interface CertificatePlatformProps {
  $color?: string;
}

export const CertificatePlatform = styled.span<CertificatePlatformProps>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ $color, theme }) => $color || theme.colors.textMuted};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const CertificateFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CertificateYear = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
`;

export const CertificateHours = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: ${({ theme }) => theme.colors.textMuted};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-left: ${({ theme }) => theme.spacing.md};
  white-space: nowrap;
`;

export const CertificatesEmptyMessage = styled.p`
  width: 100%;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  text-align: center;
  text-wrap: balance;
`;

export const CertificateLink = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  @media (hover: hover) {
    ${CertificateCard}:hover & {
      opacity: 1;
    }
  }
`;

export { SectionTitle };
