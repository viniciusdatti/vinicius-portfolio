/**
 * Styled components for the About page.
 */

// Libraries
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

// Components
import { AVATAR_PORTRAIT_FRAME_ASPECT_RATIO } from '@/config/avatarImage';
import { cardStatSignal, surfaceInsetRim } from '@/styles/surfaces';
import {
  editorialAccentRail,
  scrollAnchorOffset,
} from '@/styles/sectionRhythm';
import {
  PageCard,
  PageSection,
  SectionTitle,
} from '@/styles/pageLayout.style';

/* *************************************************************************************************
 ********************************************* SHARED **********************************************
 ************************************************************************************************ */

const observabilityMono = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum';
`;

const observabilitySubLabel = css`
  ${observabilityMono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-transform: uppercase;
`;

/** Backbone + node share the center axis of editorialAccentRail (2px left border) */
const timelineRailGutter = css`
  --timeline-rail-width: 2px;
  --timeline-rail-x: calc(var(--timeline-rail-width) / 2);
`;

export const Section = PageSection;

export const PhilosophySection = styled(Section)`
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

/* *************************************************************************************************
 ********************************************** INTRO **********************************************
 ************************************************************************************************ */

export const IntroSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: start;
  justify-items: center;
  ${scrollAnchorOffset};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: max-content minmax(0, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};
    align-items: start;
    justify-items: start;
  };

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: ${({ theme }) => theme.spacing.xxl};
  };
`;

export const Avatar = styled(motion.div)`
  position: relative;
  width: ${({ theme }) => theme.sizes.avatar.aboutMobile};
  height: auto;
  aspect-ratio: ${AVATAR_PORTRAIT_FRAME_ASPECT_RATIO};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.primaryBorderFaint};
  ${surfaceInsetRim};
  flex-shrink: 0;
  margin: 0 auto;
  box-shadow: 0 0 28px ${({ theme }) => theme.colors.primary}22;
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
    margin: 0;
  };

`;

const introProseBlock = css`
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin: 0;
  max-width: ${({ theme }) => theme.layout.proseWide};
`;

export const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  min-width: 0;

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize.xxl};
    margin-bottom: 0;
    line-height: ${({ theme }) => theme.typography.lineHeight.snug};
    color: ${({ theme }) => theme.colors.text};
  };
`;

export const IntroLead = styled(motion.p)`
  ${introProseBlock};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** Primary narrative — full contrast; not washed out on dark canvas */
export const IntroImpact = styled(motion.p)`
  ${introProseBlock};
  color: ${({ theme }) => theme.colors.text};
`;

export const IntroHighlight = styled(motion.p)`
  ${observabilityMono};
  ${introProseBlock};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  color: ${({ theme }) => theme.colors.text};

  strong {
    color: ${({ theme }) => theme.colors.accent};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  };
`;

/* *************************************************************************************************
 **************************************** TELEMETRY METRICS ****************************************
 ************************************************************************************************ */

export const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  ${scrollAnchorOffset};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
  };
`;

export const StatCard = styled(motion.div)`
  ${cardStatSignal};
  flex: 1;
  min-width: 0;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  & > * {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
  };
`;

export const StatNumber = styled.div`
  ${observabilityMono};
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  text-shadow: 0 0 24px ${({ theme }) => theme.colors.primary}33;
`;

/** Tooling labels (e.g. Jest · Playwright) — same mono contract, scaled for multi-token values */
export const StatValue = styled(StatNumber)`
  font-size: clamp(1.125rem, 2.4vw, 1.625rem);
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
  overflow-wrap: anywhere;
  min-width: 0;
`;

export const StatLabel = styled.div`
  ${observabilitySubLabel};
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  min-width: 0;
  overflow-wrap: anywhere;
`;

export { SectionTitle };

/* *************************************************************************************************
 *************************************** EXPERIENCE TIMELINE ***************************************
 ************************************************************************************************ */

export const ExperienceSection = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  ${scrollAnchorOffset};
`;

export const ExperienceSectionHeader = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const ExperienceSectionTitle = styled(SectionTitle)`
  margin-bottom: 0;
`;

export const ExperienceTimelineWrap = styled.div`
  ${timelineRailGutter};
  position: relative;
  z-index: 1;
  margin-top: ${({ theme }) => theme.spacing.md};
  isolation: isolate;
`;

export const ExperienceTimeline = styled(motion.ol)`
  position: relative;
  z-index: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: var(--timeline-rail-width);
    background: ${({ theme }) => theme.colors.borderSubtle};
    z-index: 1;
    pointer-events: none;
  };
`;

interface ExperienceCardStyleProps {
  $isActive?: boolean;
}

export const ExperienceCard = styled(motion.li)<ExperienceCardStyleProps>`
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.xxl};

  &:last-child {
    padding-bottom: 0;
  };
`;

export const ExperienceNode = styled.span<ExperienceCardStyleProps>`
  position: absolute;
  left: var(--timeline-rail-x);
  top: 0;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme, $isActive }): string => ($isActive ? theme.colors.accent : theme.colors.border)};
  border: 2px solid ${({ theme }) => theme.colors.background};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.borderSubtle};
  z-index: 3;
`;

export const ExperienceCardBody = styled.div<ExperienceCardStyleProps>`
  position: relative;
  z-index: 2;

  ${({ $isActive }) => ($isActive
    ? editorialAccentRail
    : css`
      padding-left: ${({ theme }) => theme.spacing.lg};
    `)};
`;

export const ExperienceCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const ExperienceCardTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  color: ${({ theme }) => theme.colors.text};
  text-wrap: balance;
`;

export const ExperienceCardPeriod = styled.span`
  ${observabilitySubLabel};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ExperienceCardRole = styled.p`
  ${observabilitySubLabel};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

export const ExperienceCardSummary = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  max-width: ${({ theme }) => theme.layout.proseWide};
  text-wrap: balance;
`;

export const ExperienceLogStream = styled(motion.ul)`
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.md} 0 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

export const ExperienceLogEntry = styled(motion.li)`
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  column-gap: ${({ theme }) => theme.spacing.xs};
  align-items: baseline;
`;

export const ExperienceLogIndex = styled.span`
  ${observabilityMono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.06em;
  line-height: 1;
  min-width: 1.375rem;
  text-align: right;
`;

export const ExperienceLogMessage = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  text-wrap: balance;
`;

/* *************************************************************************************************
 ******************************************* PHILOSOPHY ********************************************
 ************************************************************************************************ */

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

/* *************************************************************************************************
 ******************************************** EDUCATION ********************************************
 ************************************************************************************************ */

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
  ${observabilityMono};
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
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;
