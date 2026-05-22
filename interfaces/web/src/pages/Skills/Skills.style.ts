/**
 * @fileoverview Styled components for the Skills page.
 * Contains all visual styling for skills display, category tabs, and certificates.
 */

// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Components
import {
  cardHoverElevated,
  cardMarketingGlass,
  cardStatSignal,
} from '@/styles/surfaces';
import { scrollAnchorOffset } from '@/styles/sectionRhythm';

/**
 * Generic section wrapper with bottom margin.
 */
export const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.section};
  ${scrollAnchorOffset};
`;

/**
 * Section title with decorative line extending to the right.
 */
export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.borderSubtle};
  };
`;

/**
 * Section wrapper for "Front-end in practice" experience cards.
 */
export const ExperienceSection = styled(Section)`
  margin-top: ${({ theme }) => theme.spacing.section};
`;

/**
 * Intro paragraph emphasizing ownership of components and status mapping.
 */
export const ExperienceIntro = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  max-width: ${({ theme }) => theme.layout.proseWide};
`;

/**
 * Subtitle for the experience section (short context line).
 */
export const ExperienceSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: ${({ theme }) => theme.layout.prose};
`;

/**
 * Grid for experience cards (responsive).
 */
export const ExperienceGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

/**
 * Single experience card with left accent.
 */
export const ExperienceCard = styled(motion.div)`
  ${cardStatSignal};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  overflow: hidden;
`;

/**
 * Experience card title.
 */
export const ExperienceCardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

/**
 * Experience card description (main body).
 */
export const ExperienceCardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

/**
 * Highlight line (what was built: components, status functions, etc.).
 */
export const ExperienceCardHighlight = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-left: ${({ theme }) => theme.spacing.sm};
  border-left: 2px solid ${({ theme }) => theme.colors.primary};
`;

/**
 * Container for category filter tabs.
 * Wraps and centers tabs on smaller screens.
 */
export const CategoryTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  justify-content: center;
  ${scrollAnchorOffset};
`;

/**
 * Props for CategoryTab styled component.
 */
export interface CategoryTabProps {
  /** Whether this tab is currently active */
  $active: boolean;
}

/**
 * Individual category tab button with active state styling.
 */
export const CategoryTab = styled(motion.button)<CategoryTabProps>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  background: ${({ $active, theme }) => ($active
    ? theme.colors.gradientButtonPrimary
    : theme.colors.surface)};
  color: ${({ $active, theme }) => ($active
    ? theme.colors.onPrimary
    : theme.colors.textSecondary)};
  border: 1px solid ${({ $active, theme }) => ($active
    ? theme.colors.primaryBorderFaint
    : theme.colors.border)};
  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.primaryBorderFaint};
      color: ${({ $active, theme }) => ($active
        ? theme.colors.onPrimary
        : theme.colors.primary)};
    }
  }
`;

/**
 * Grid container for skill cards with responsive columns.
 */
export const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(12, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};
  }

  & > *:first-child {
    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      grid-column: 1 / span 6;
    }
  }

  & > *:nth-child(2) {
    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      grid-column: 7 / span 6;
    }
  }

  & > *:nth-child(n + 3) {
    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      grid-column: span 4;
    }
  }
`;

/**
 * Container for skill technology icon.
 */
export const SkillIcon = styled.div`
  width: 50px;
  height: 50px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  };
`;

/**
 * Skill technology name heading.
 */
export const SkillName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/**
 * Category label that slides up into view on SkillCard hover.
 * Must be declared before SkillCard so it can be used as a styled-components selector.
 */
export const SkillCategoryLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  transform: translateY(6px);
  opacity: 0;
  transition:
    transform ${({ theme }) => theme.transitions.normal},
    opacity ${({ theme }) => theme.transitions.normal};
  white-space: nowrap;

  @media (prefers-reduced-motion: reduce) {
    transform: none;
  };
`;

/**
 * Container for skill name. Flex layout centers text vertically with the icon.
 */
export const SkillInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 0;
  overflow: hidden;
`;

/**
 * Individual skill card with hover effects.
 * On hover, reveals the SkillCategoryLabel via transform and opacity transition.
 */
export const SkillCard = styled(motion.div)`
  ${cardMarketingGlass};
  ${cardHoverElevated};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  position: relative;
  overflow: hidden;

  & > * {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
  }

  @media (hover: hover) {
    &:hover ${SkillCategoryLabel} {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

/**
 * Background track for skill progress bar.
 */
export const SkillBar = styled.div`
  height: 6px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

/**
 * Props for SkillProgress styled component.
 */
export interface SkillProgressProps {
  /** Skill proficiency level (0-100) */
  $level: number;
}

/**
 * Animated progress indicator with gradient fill.
 */
export const SkillProgress = styled(motion.div)<SkillProgressProps>`
  height: 100%;
  background: linear-gradient(90deg, 
    ${({ theme }) => theme.colors.primary}, 
    ${({ theme }) => theme.colors.primaryHover}
  );
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: ${({ $level }) => $level}%;
`;

/**
 * Section wrapper for certificates with tighter spacing.
 */
export const CertificatesSection = styled(Section)`
  margin-top: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

/**
 * Grid container for certificate cards.
 */
export const CertificatesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
    gap: ${({ theme }) => theme.spacing.md};
  };
`;

/**
 * Props for CertificateCard styled component.
 */
export interface CertificateCardProps {
  $platformColor?: string;
}

/**
 * Individual certificate card with hover effect.
 */
export const CertificateCard = styled(motion.div)<CertificateCardProps>`
  ${cardMarketingGlass};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.elevation.sm};
  transition:
    box-shadow ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.normal};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background-color: ${({ $platformColor, theme }) => $platformColor || theme.colors.primary};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.fast};
    z-index: 1;
  }

  @media (hover: hover) {
    &:hover {
      border-color: ${({ $platformColor, theme }) => $platformColor || theme.colors.primaryBorderFaint};
      box-shadow: ${({ theme }) => theme.elevation.lg};
      transform: translateY(-${({ theme }) => theme.motion.distance.liftSm});

      &::before {
        opacity: 1;
      }
    }
  }

  & > * {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
  }
`;

/**
 * Header area of certificate card containing logo and title.
 */
export const CertificateHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

/**
 * Props for PlatformLogo styled component.
 */
export interface PlatformLogoProps {
  $bgColor?: string;
}

/**
 * Platform logo/icon container.
 */
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

/**
 * Certificate course/certification name.
 */
export const CertificateName = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/**
 * Props for CertificatePlatform styled component.
 */
export interface CertificatePlatformProps {
  $color?: string;
}

/**
 * Platform name text (e.g., Udemy, Alura).
 */
export const CertificatePlatform = styled.span<CertificatePlatformProps>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ $color, theme }) => $color || theme.colors.textMuted};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

/**
 * Footer area of certificate card.
 */
export const CertificateFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

/**
 * Props for CertificateType styled component.
 */
export interface CertificateTypeProps {
  $type: 'micro' | 'course' | 'trail';
}

/**
 * Certificate type badge.
 */
export const CertificateType = styled.span<CertificateTypeProps>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  ${({ $type, theme }) => {
    switch ($type) {
      case 'trail':
        return `
          background-color: ${theme.colors.badgeTrailSurface};
          color: ${theme.colors.badgeTrail};
        `;
      case 'course':
        return `
          background-color: ${theme.colors.badgeCourseSurface};
          color: ${theme.colors.badgeCourse};
        `;
      case 'micro':
        return `
          background-color: ${theme.colors.badgeMicroSurface};
          color: ${theme.colors.badgeMicro};
        `;
      default:
        return `
          background-color: ${theme.colors.backgroundSecondary};
          color: ${theme.colors.textMuted};
        `;
    }
  }}
`;

/**
 * Courses count badge inside certificate type.
 */
export const CertificateCoursesCount = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  opacity: 0.8;
  
  &::before {
    content: '•';
    margin: 0 4px;
  };
`;

/**
 * Year badge for certificate completion date.
 */
export const CertificateYear = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
`;

/**
 * Total hours display in section title.
 */
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

/**
 * Error message for failed API loads.
 */
export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

/**
 * Retry button for error states.
 */
export const RetryButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradientButtonPrimary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  &:hover {
    box-shadow: ${({ theme }) => theme.elevation.md};
  };
`;

/**
 * External link icon on certificate card.
 */
export const CertificateLink = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  ${CertificateCard}:hover & {
    opacity: 1;
  };
`;

/**
 * Modal container for certificate details.
 */
export const CertificateModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

/**
 * Modal overlay background.
 */
export const ModalOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: blur(${({ theme }) => theme.effects.blur.sm});
`;

/**
 * Modal content container.
 */
export const ModalContent = styled(motion.div)`
  position: relative;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  max-width: 500px;
  width: 100%;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.elevation.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

/**
 * Modal header section.
 */
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

/**
 * Modal close button.
 */
export const ModalCloseButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  transition:
    background-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.text};
  };
`;

/**
 * Modal body section.
 */
export const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

/**
 * Certificate info container in modal.
 */
export const ModalCertificateInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

/**
 * Props for ModalPlatformBadge styled component.
 */
export interface ModalPlatformBadgeProps {
  $bgColor?: string;
  $color?: string;
}

/**
 * Platform badge in modal header.
 */
export const ModalPlatformBadge = styled.div<ModalPlatformBadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  };
`;

/**
 * Certificate title in modal.
 */
export const ModalTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.4;
`;

/**
 * Meta information container in modal.
 */
export const ModalMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

/**
 * Individual meta item in modal.
 */
export const ModalMetaItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    color: ${({ theme }) => theme.colors.textMuted};
  };
`;

/**
 * Actions container in modal.
 */
export const ModalActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

/**
 * Props for ModalButton styled component.
 */
export interface ModalButtonProps {
  $variant: 'primary' | 'secondary';
  $platformColor?: string;
}

/**
 * Button in modal actions.
 */
export const ModalButton = styled.button<ModalButtonProps>`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition:
    background-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  ${({ $variant, $platformColor, theme }) => ($variant === 'primary'
    ? `
          background-color: ${$platformColor || theme.colors.primary};
          color: white;

          &:hover {
            filter: brightness(1.1);
            transform: translateY(-2px);
          }
        `
    : `
          background-color: ${theme.colors.backgroundSecondary};
          color: ${theme.colors.textSecondary};

          &:hover {
            background-color: ${theme.colors.border};
          }
        `)}
`;
