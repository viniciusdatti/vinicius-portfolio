/**
 * @fileoverview Styled components for the Home page.
 * Contains all visual styling for the homepage sections including
 * skills preview, live lab preview, projects, and contact CTA.
 */

// Libraries
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Components
import {
  glassSurface,
  operationalGlass,
  pointerSpotlight,
} from '@/styles/surfaces';

const eyebrowLineExpand = keyframes`
  from { width: 0; opacity: 0; }
  to { width: 24px; opacity: 0.5; }
`;

/**
 * Base section container with responsive padding and max-width.
 */
export const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.pageX};
  max-width: ${({ theme }) => theme.layout.contentWide};
  margin: 0 auto;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing.sectionSm};
    padding-bottom: ${({ theme }) => theme.spacing.sectionSm};
  }
`;

/**
 * Animated section title — editorial display scale.
 */
export const SectionTitle = styled(motion.h2)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(2.125rem, 4.8vw, 3.25rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-wrap: balance;
`;

export const SectionLead = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: ${({ theme }) => theme.layout.prose};
`;

export const SectionEyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &::before {
    content: '';
    width: 24px;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
    opacity: 0.5;
    flex-shrink: 0;
    animation: ${eyebrowLineExpand} 0.5s ${({ theme }) => theme.motion.easeOut} both;
  };
`;

export const SectionIndex = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
`;

export const SectionStory = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: ${({ theme }) => theme.layout.prose};
`;

export const ProjectsSectionHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: end;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: auto 1fr 1fr;
    text-align: left;
  };
`;

export const ProjectsSectionMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
  };
`;

export const EditorialHeaderAside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
  };
`;

export const ViewAllProjectsLink = styled(Link)`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-top: ${({ theme }) => theme.spacing.md};

  &:hover {
    text-decoration: underline;
  };
`;

export const SkillsEditorialLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: center;
  max-width: ${({ theme }) => theme.layout.contentWide};
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1.2fr;
  };
`;

export const SkillsEditorialIntro = styled.div`
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    text-align: left;
  };
`;

/**
 * Grid layout for skeleton loading placeholders.
 */
export const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

/**
 * Error message container with muted text styling.
 */
export const ErrorMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textMuted};
`;

/**
 * Retry button for error states with hover effect.
 */
export const RetryButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  };
`;

/**
 * Skills preview section with secondary background.
 * Extends base Section with full-width background.
 */
export const SkillsPreviewSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  max-width: 100%;
  padding-left: ${({ theme }) => theme.spacing.pageX};
  padding-right: ${({ theme }) => theme.spacing.pageX};
`;

/**
 * Responsive grid for skill icons.
 */
export const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
  };
`;

/**
 * Individual skill icon card with hover animation.
 */
export const SkillIcon = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  ${glassSurface};
  ${pointerSpotlight};
  position: relative;
  overflow: hidden;
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.normal},
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryBorderFaint};
    box-shadow: ${({ theme }) => theme.elevation.lg};
    --spot-opacity: 1;
    transform: translateY(-6px) scale(1.02);
  }

  img {
    width: 40px;
    height: 40px;
    position: relative;
    z-index: 2;
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    position: relative;
    z-index: 2;
    letter-spacing: 0.02em;
  }
`;

/**
 * Centered description text below section title in skills preview.
 */
export const SkillsPreviewDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

/**
 * Wrapper to center the "View All" link.
 */
export const ViewAllLinkWrapper = styled.div`
  text-align: center;
`;

/**
 * Link styled for "View All" navigation with arrow indicator.
 */
export const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  &:hover {
    text-decoration: underline;
  };
`;

export const LiveLabSection = styled(Section)`
  scroll-margin-top: ${({ theme }) => theme.sizes.layout.headerOffset};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: calc(${({ theme }) => theme.spacing.sectionSm} + 2rem);
  }
`;

export const LiveLabSectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
`;

/**
 * Live Lab preview card — editorial split layout.
 */
export const LiveLabCard = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: center;
  ${operationalGlass};
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  padding: ${({ theme }) => theme.spacing.xxl};
  position: relative;
  overflow: visible;

  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: radial-gradient(
      ellipse 70% 50% at 80% 0%,
      ${({ theme }) => theme.colors.primary}14,
      transparent 60%
    );
    pointer-events: none;
    z-index: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 0.95fr 1.05fr;
    text-align: left;
    margin-top: -1.5rem;
  }
`;

export const LiveLabCopy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  position: relative;
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    align-items: flex-start;
  }
`;

export const LiveLabVisual = styled.div`
  width: 100%;
  min-width: 0;
  position: relative;
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    transform: translateY(-0.75rem);
  }
`;

export const LiveLabMetric = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.mutedSurface};
`;

export const LiveLabMetricValue = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

export const LiveLabMetricLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

/**
 * Animated badge indicating live/active status.
 */
export const LiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.onSuccess};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &::before {
    content: '';
    width: ${({ theme }) => theme.sizes.badge.dotSm};
    height: ${({ theme }) => theme.sizes.badge.dotSm};
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    animation: liveBadgePulse 2s ease-in-out infinite;
    flex-shrink: 0;
  };

  @keyframes liveBadgePulse {
    0%, 100% { opacity: 1; };
    50% { opacity: ${({ theme }) => theme.effects.opacity.pulseMid}; };
  };
`;

/**
 * Title for the Live Lab preview section.
 */
export const LiveLabTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

/**
 * Description text for the Live Lab preview.
 */
export const LiveLabDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: ${({ theme }) => theme.layout.prose};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

/**
 * Call-to-action button styled as a Link with hover effects.
 */
export const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-weight: 700;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: background-color ${({ theme }) => theme.transitions.fast},
              transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
    color: ${({ theme }) => theme.colors.onPrimary};
  };
`;

export const ContactCtaSection = styled(Section)`
  max-width: ${({ theme }) => theme.layout.contentWide};
`;

export const ContactCtaInner = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  ${operationalGlass};
  ${pointerSpotlight};
  --spot-opacity: 0.35;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr auto;
    text-align: left;
  }

  &:hover {
    --spot-opacity: 0.85;
  }
`;

export const ContactCtaActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-start;
  };
`;

export const ContactCtaDescription = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

export const AboutPreviewSection = styled(Section)`
  max-width: ${({ theme }) => theme.layout.contentWide};
  scroll-margin-top: ${({ theme }) => theme.sizes.layout.headerOffset};
`;

export const AboutPreviewLayout = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: end;
  padding: ${({ theme }) => theme.spacing.xxl};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.backgroundSecondary};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr auto;
    text-align: left;
  };
`;

export const AboutPreviewMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  };
`;

export const AboutPreviewLink = styled(Link)`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  };
`;
