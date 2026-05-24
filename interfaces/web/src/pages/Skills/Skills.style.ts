/**
 * @fileoverview Styled components for the Skills page.
 * Contains all visual styling for skills display, category tabs, and certificates.
 */

// Libraries
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

// Types
import { SkillLayoutTier } from '@/domain/skills/skillLayout.domain';

// Components
import {
  cardBodyReadable,
  cardMarketingGlass,
  cardPointerVars,
  cardTitleClamp,
  cardTitleClamp3,
  panelChrome,
  surfaceMotion,
} from '@/styles/surfaces';
import { scrollAnchorOffset } from '@/styles/sectionRhythm';

/** liftMd @ 280ms ease-out; elevation.md only (no ad-hoc shadow bloom). */
const skillCardLiftMd = css`
  transition:
    transform ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.fast};

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.borderLight};
      transform: translateY(calc(-1 * ${({ theme }) => theme.motion.distance.liftMd}));
      will-change: transform;
    }
  }

  @media (hover: none) {
    transform: none;
  }
`;

/** Amber (#f59e0b) pointer torch — marketing-glass ::after slot. */
const skillAmberPointerSpotlight = css`
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: 1;
    background: radial-gradient(
      420px circle at var(--spot-x, 50%) var(--spot-y, 50%),
      ${({ theme }) => theme.colors.primary}29 0%,
      ${({ theme }) => theme.colors.primary}0d 38%,
      transparent 62%
    );
    opacity: var(--spot-opacity, 0);
    transition: opacity ${({ theme }) => theme.transitions.normal};

    @media (hover: none) {
      opacity: 0;
    }
  }

  @media (hover: hover) {
    &:hover {
      --spot-opacity: 1;
    }
  }
`;

/**
 * Canonical Skills workspace card — marketing-glass, rim, elevation.md, amber torch, liftMd.
 */
const skillCardGlassArchetype = css`
  ${cardMarketingGlass};
  ${cardPointerVars};
  ${skillAmberPointerSpotlight};
  ${skillCardLiftMd};
  ${surfaceMotion};

  @media (hover: none) {
    --spot-opacity: 0;
  }
`;

/** Framer stagger wrapper — grid children without breaking placement. */
export const SkillsStaggerSlot = styled(motion.div)`
  display: contents;
`;

/**
 * Generic section wrapper with bottom margin.
 */
export const Section = styled(motion.section)`
  margin-bottom: ${({ theme }) => theme.spacing.section};
  ${scrollAnchorOffset};
`;

/** Gradient mask on inner span — Framer must not filter the H2 directly. */
export const SectionTitleGradient = styled.span`
  display: inline;
  background: ${({ theme }) => theme.colors.gradientTextDisplay};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

/**
 * Section anchor title — gradient text mask + structural hairline rule.
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
  color: transparent;
  text-wrap: balance;

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
 * Grid for experience cards — asymmetric featured span at desktop.
 */
export const ExperienceGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export interface ExperienceCardLayoutProps {
  $featured: boolean;
}

/**
 * Production architecture card — marketing glass; featured keys span 2 columns on desktop.
 */
export const ExperienceCard = styled(motion.div)<ExperienceCardLayoutProps>`
  ${skillCardGlassArchetype};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  grid-column: span 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: span ${({ $featured }) => ($featured ? 2 : 1)};
  }

  & > * {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
  }

  @media (hover: none) {
    transform: none;
  }
`;

/**
 * Experience card title.
 */
export const ExperienceCardTitle = styled.h3`
  ${cardTitleClamp};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

/**
 * Experience card description (main body).
 */
export const ExperienceCardDescription = styled.p`
  ${cardBodyReadable};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

/**
 * Highlight copy — no per-card accent bar (section anchors only).
 */
export const ExperienceCardHighlight = styled.p`
  ${cardBodyReadable};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  margin-bottom: 0;
`;

/**
 * Root editorial layout — vertical chapter rhythm (hero → core → peripheral).
 */
export const SkillsEditorialLayout = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};
`;

/**
 * Core architecture chapter — eyebrow + lead + asymmetric grid.
 */
export const SkillsCoreChapter = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const SkillsCoreLead = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: ${({ theme }) => theme.layout.proseWide};
`;

/**
 * Featured hero row — React / primary architectural capability (magazine opener).
 */
export const SkillsHeroBlock = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl} 0
    ${({ theme }) => theme.spacing.xxl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 4.5rem minmax(0, 0.42fr) minmax(0, 1fr);
    align-items: end;
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`;

export const SkillsHeroSignal = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  opacity: 0.75;
  font-variant-numeric: tabular-nums;
`;

export const SkillsHeroName = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(2rem, 5.5vw, 3.5rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  color: ${({ theme }) => theme.colors.text};
`;

export const SkillsHeroIcon = styled.img`
  width: 44px;
  height: 44px;
  opacity: 0.9;
  flex-shrink: 0;
  object-fit: contain;
`;

export const SkillsHeroMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const SkillsHeroDesc = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: 36ch;
`;

export const SkillsHeroDomain = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

/**
 * Editorial skill matrix — fixed columns at desktop so featured cards can span 2.
 */
export const SkillsAsymmetricGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export interface SkillGridPlacementProps {
  $gridSpan: number;
}

export interface SkillEditorialCardProps extends SkillGridPlacementProps {
  $tier: SkillLayoutTier;
}

const skillGridPlacement = css<SkillGridPlacementProps>`
  grid-column: span 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: span ${({ $gridSpan }) => Math.min($gridSpan, 2)};
  }
`;

const skillTierCoreLarge = css`
  ${skillCardGlassArchetype};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  min-height: 9rem;
`;

const skillTierCoreMedium = css`
  ${skillCardGlassArchetype};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  min-height: 7.5rem;
`;

const skillTierPeripheralFeatured = css`
  ${skillCardGlassArchetype};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  min-height: 6.5rem;
`;

const skillTierPeripheralStandard = css`
  ${skillCardGlassArchetype};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const skillTierPeripheralInstrument = css`
  ${skillCardGlassArchetype};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 0;
  min-height: 8.5rem;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
`;

const skillTierPeripheralCompact = css`
  ${skillCardGlassArchetype};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
`;

const skillTierPeripheralMinimal = css`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: 0;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  box-shadow: none;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  @media (hover: none) {
    transform: none;
  }

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.borderLight};
    }
  }
`;

/**
 * Category label that slides up into view on editorial card hover (Framer spring).
 */
export const SkillCategoryLabel = styled(motion.span)`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  min-width: 0;
  overflow-wrap: anywhere;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    white-space: nowrap;
  }
`;

/**
 * Tier-driven skill card — each tier has a distinct visual weight.
 */
export const SkillEditorialCard = styled(motion.div)<SkillEditorialCardProps>`
  ${skillGridPlacement};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (hover: none) {
    transform: none !important;
  }

  & > * {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
  }

  & [data-skill-instrument-field] {
    z-index: 0;
  }

  ${({ $tier }) => {
    switch ($tier) {
      case SkillLayoutTier.CoreLarge:
        return skillTierCoreLarge;
      case SkillLayoutTier.CoreMedium:
        return skillTierCoreMedium;
      case SkillLayoutTier.PeripheralFeatured:
        return skillTierPeripheralFeatured;
      case SkillLayoutTier.PeripheralInstrument:
        return skillTierPeripheralInstrument;
      case SkillLayoutTier.PeripheralStandard:
        return skillTierPeripheralStandard;
      case SkillLayoutTier.PeripheralCompact:
        return skillTierPeripheralCompact;
      case SkillLayoutTier.PeripheralMinimal:
        return skillTierPeripheralMinimal;
      default:
        return skillTierPeripheralStandard;
    }
  }}
`;

export interface SkillIconSizeProps {
  $tier: SkillLayoutTier;
}

/**
 * Skill icon — scales with editorial tier hierarchy.
 */
export const SkillEditorialIcon = styled.div<SkillIconSizeProps>`
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  ${({ $tier }) => {
    switch ($tier) {
      case SkillLayoutTier.CoreLarge:
        return css`
          width: 64px;
          height: 64px;
        `;
      case SkillLayoutTier.CoreMedium:
        return css`
          width: 52px;
          height: 52px;
        `;
      case SkillLayoutTier.PeripheralFeatured:
        return css`
          width: 48px;
          height: 48px;
        `;
      case SkillLayoutTier.PeripheralStandard:
        return css`
          width: 44px;
          height: 44px;
        `;
      case SkillLayoutTier.PeripheralInstrument:
        return css`
          width: 40px;
          height: 40px;
        `;
      case SkillLayoutTier.PeripheralCompact:
        return css`
          width: 36px;
          height: 36px;
        `;
      case SkillLayoutTier.PeripheralMinimal:
        return css`
          width: 28px;
          height: 28px;
          opacity: 0.75;
        `;
      default:
        return css`
          width: 44px;
          height: 44px;
        `;
    }
  }}
`;

export interface SkillNameSizeProps {
  $tier: SkillLayoutTier;
}

/**
 * Skill name — typography scales with tier.
 */
export const SkillEditorialName = styled.h3<SkillNameSizeProps>`
  ${cardTitleClamp};
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text};

  ${({ $tier }) => {
    switch ($tier) {
      case SkillLayoutTier.CoreLarge:
        return css`
          font-size: clamp(1.35rem, 2.5vw, 1.75rem);
        `;
      case SkillLayoutTier.CoreMedium:
        return css`
          font-size: ${({ theme }) => theme.typography.fontSize.xl};
        `;
      case SkillLayoutTier.PeripheralFeatured:
        return css`
          font-size: ${({ theme }) => theme.typography.fontSize.lg};
        `;
      case SkillLayoutTier.PeripheralInstrument:
        return css`
          font-size: ${({ theme }) => theme.typography.fontSize.md};
        `;
      case SkillLayoutTier.PeripheralMinimal:
        return css`
          font-size: ${({ theme }) => theme.typography.fontSize.sm};
          font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
        `;
      default:
        return css`
          font-size: ${({ theme }) => theme.typography.fontSize.md};
        `;
    }
  }}
`;

export const SkillEditorialDomain = styled.span`
  ${cardBodyReadable};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SkillEditorialInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 0;
`;

/**
 * Bottom chrome row for instrument-tier skill cards (icon + copy above telemetry wash).
 */
export const SkillInstrumentBody = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: auto;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceGlass};
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.glass};
  -webkit-backdrop-filter: ${({ theme }) => theme.effects.backdrop.glass};
`;

export const SkillsPeripheralChapter = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

/**
 * Support-stack chapter — featured row + uniform tool matrix.
 */
/** Pass-through wrapper — keeps featured + compact grids without breaking stagger slots. */
export const SupportStackMatrix = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacing.md} * 0.85);
  width: 100%;
`;

/**
 * Featured support tools — equal-width pair, no column-span drift.
 */
export const SupportStackFeaturedRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(${({ theme }) => theme.spacing.md} * 0.85);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

/**
 * Compact support tools — uniform cells with aligned columns.
 */
export const SupportStackGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(${({ theme }) => theme.spacing.md} * 0.85);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(auto-fill, minmax(11.5rem, 1fr));
    gap: calc(${({ theme }) => theme.spacing.sm} * 0.85);
  }
`;

/**
 * Legacy grid — certificate loading skeleton only.
 */
export const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
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
  ${skillCardGlassArchetype};
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
  ${cardTitleClamp3};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  line-height: 1.4;
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
 * Empty state when the certificates API returns no rows.
 */
export const CertificatesEmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
  max-width: ${({ theme }) => theme.layout.prose};
  margin-left: auto;
  margin-right: auto;
`;

/**
 * Retry button for error states.
 */
export const RetryButton = styled.button`
  position: relative;
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
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.borderLight};
    pointer-events: none;
  };

  &:hover {
    filter: brightness(1.04);
  };
`;

/**
 * External link icon on certificate card.
 */
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
  ${panelChrome};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  max-width: 500px;
  width: 100%;
  overflow: hidden;
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
