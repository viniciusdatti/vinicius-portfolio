/**
 * Styled components for the About page.
 */

// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Components
import {
  surfaceInsetRim,
} from '@/styles/surfaces';
import {
  editorialAccentRail,
  scrollAnchorOffset,
} from '@/styles/sectionRhythm';
import {
  PageCard,
  PageSection,
  SectionTitle,
} from '@/styles/pageLayout.style';

export const Section = PageSection;

export const PhilosophySection = styled(Section)`
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

export const IntroSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: start;
  ${scrollAnchorOffset};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(120px, 0.38fr) minmax(0, 1fr);
    gap: clamp(2rem, 5vw, 4rem);
  };
`;

export const Avatar = styled(motion.div)`
  position: relative;
  width: ${({ theme }) => theme.sizes.avatar.aboutMobile};
  height: ${({ theme }) => theme.sizes.avatar.aboutMobile};
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.primaryBorderFaint};
  ${surfaceInsetRim};
  flex-shrink: 0;
  margin: 0 auto;
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.normal};

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.primaryBorderStrong};
      transform: translateY(-${({ theme }) => theme.motion.distance.liftSm});
    };
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
  };
`;

export const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  ${scrollAnchorOffset};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.xxl};
  };
`;

export const StatCard = styled(motion.div)`
  flex: 1;
  min-width: 0;
  text-align: left;
  padding: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    &:not(:last-child) {
      border-right: 1px solid ${({ theme }) => theme.colors.borderSubtle};
      padding-right: ${({ theme }) => theme.spacing.xxl};
    };
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

export { SectionTitle };

export const ExperienceSection = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  ${scrollAnchorOffset};
`;

export const ExperienceTimelineWrap = styled.div`
  position: relative;
  margin-top: ${({ theme }) => theme.spacing.lg};
  min-height: 12rem;
`;

export const ExperienceTimeline = styled(motion.div)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding-left: ${({ theme }) => theme.spacing.xl};
  border-left: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

export const ExperienceSectionTitle = styled(SectionTitle)`
  margin-bottom: 0;
`;

export const PhilosophyCard = styled(motion.div)`
  ${editorialAccentRail};
  padding: ${({ theme }) => theme.spacing.lg} 0 ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.xl};
  max-width: ${({ theme }) => theme.layout.proseWide};

  p {
    color: ${({ theme }) => theme.colors.text};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    font-size: clamp(1.125rem, 2.5vw, 1.35rem);
    font-style: italic;
    margin: 0;
  };
`;

export const EducationCard = PageCard;

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
  };

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

// =================================================================================================
// ==================================== PROFESSIONAL EXPERIENCE ====================================
// =================================================================================================

export const ExperienceCard = styled(motion.div)`
  position: relative;
  padding: 0 0 ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};

  &:last-child {
    padding-bottom: 0;
  };

  &::before {
    content: '';
    position: absolute;
    left: calc(-1 * ${({ theme }) => theme.spacing.xl} - 1px);
    top: 0.35rem;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.background};
    transform: translateX(-50%);
  };
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
