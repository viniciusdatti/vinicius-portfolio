/**
 * @fileoverview Styled components for the Skills page.
 * Contains all visual styling for skills display, category tabs, and certificates.
 */

// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';

/**
 * Main container for the Skills page content.
 * Centers content with responsive padding.
 */
export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

/**
 * Header section containing title and subtitle.
 */
export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.section};
`;

/**
 * Animated page title with responsive font sizing.
 */
export const PageTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

/**
 * Animated subtitle with muted text color.
 */
export const PageSubtitle = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

/**
 * Generic section wrapper with bottom margin.
 */
export const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.section};
`;

/**
 * Section title with decorative line extending to the right.
 */
export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.border};
  }
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
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.surface};
  color: ${({ $active, theme }) =>
    $active ? 'white' : theme.colors.textSecondary};
  border: 1px solid ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ $active, theme }) =>
      $active ? 'white' : theme.colors.primary};
  }
`;

/**
 * Grid container for skill cards with responsive columns.
 */
export const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

/**
 * Individual skill card with hover effects.
 */
export const SkillCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  transition: border-color ${({ theme }) => theme.transitions.fast},
              transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-4px);
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
  }
`;

/**
 * Container for skill name and progress bar.
 */
export const SkillInfo = styled.div`
  flex: 1;
`;

/**
 * Skill technology name heading.
 */
export const SkillName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
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
 * Section wrapper for certificates with additional top margin.
 */
export const CertificatesSection = styled(Section)`
  margin-top: ${({ theme }) => theme.spacing.section};
`;

/**
 * Grid container for certificate cards.
 */
export const CertificatesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

/**
 * Individual certificate card with hover effect.
 */
export const CertificateCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

/**
 * Header area of certificate card containing logo and title.
 */
export const CertificateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

/**
 * Platform logo/icon container.
 */
export const PlatformLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

/**
 * Certificate course/certification name.
 */
export const CertificateName = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

/**
 * Platform name text (e.g., Udemy, Alura).
 */
export const CertificatePlatform = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

/**
 * Year badge for certificate completion date.
 */
export const CertificateYear = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;
