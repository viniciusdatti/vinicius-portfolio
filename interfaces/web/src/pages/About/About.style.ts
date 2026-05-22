/**
 * Styled components for the About page.
 */

// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.contentNarrow};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl}
    ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.pageY}
      ${({ theme }) => theme.spacing.pageX};
  };
`;

export const PageTitle = styled(motion.h1)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.display};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: left;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
  };
`;

export const Section = styled(motion.section)`
  margin-bottom: ${({ theme }) => theme.spacing.sectionSm};
`;

export const PhilosophySection = styled(Section)`
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

export const IntroSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 2fr;
    text-align: left;
  };
`;

export const Avatar = styled(motion.div)`
  width: ${({ theme }) => theme.sizes.avatar.aboutMobile};
  height: ${({ theme }) => theme.sizes.avatar.aboutMobile};
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.colors.primaryBorderFaint};
  box-shadow: ${({ theme }) => theme.shadows.glow};
  flex-shrink: 0;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  };

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: ${({ theme }) => theme.sizes.avatar.about};
    height: ${({ theme }) => theme.sizes.avatar.about};
  };
`;

export const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize.xxl};
    margin-bottom: 0;
    line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  };

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    margin-bottom: 0;
    max-width: ${({ theme }) => theme.layout.proseWide};
  };
`;

export const IntroHighlight = styled(motion.p)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  margin: 0;
  max-width: ${({ theme }) => theme.layout.proseWide};

  strong {
    color: ${({ theme }) => theme.colors.accent};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

export const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(3, 1fr);
  };
`;

export const StatCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 3px solid ${({ theme }) => theme.colors.primaryBorderFaint};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  box-shadow: ${({ theme }) => theme.elevation.sm};
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    border-left-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderLight};
    border-left-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.elevation.md};
  };
`;

export const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.display};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
`;

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const PhilosophyCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.gradientPhilosophyCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-style: italic;
  };
`;

export const EducationCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const EducationMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    align-items: center;
    text-align: left;
  };
`;

export const EducationIcon = styled.div`
  width: ${({ theme }) => theme.sizes.icon.md};
  height: ${({ theme }) => theme.sizes.icon.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  flex-shrink: 0;
`;

export const EducationInfo = styled.div`
  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    margin: 0;
  };
`;

export const EducationStatus = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.successSurface};
  color: ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const ComplementaryText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

/* ************** INDUSTRIAL EXPERIENCE ******************* */

export const ExperienceCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.elevation.md};
`;

export const ExperienceCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const ExperienceCardTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin: 0;
`;

export const ExperienceCardRole = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ExperienceCardSummary = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ExperienceBullets = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ExperienceBullet = styled.li`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  padding-left: ${({ theme }) => theme.spacing.lg};
  position: relative;

  &::before {
    content: '›';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
  };
`;
