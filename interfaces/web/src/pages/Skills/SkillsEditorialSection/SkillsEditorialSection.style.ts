// Libraries
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

// Styles
import {
  cardBodyReadable,
  cardTitleClamp,
} from '../../../styles/surfaces';
import { skillsCardGlassArchetype } from '../Skills.style';

// Types
import { SkillLayoutTier } from '../../../domain/skills/skillLayoutDomain';

export const SkillsEditorialLayout = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};
`;

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
  ${skillsCardGlassArchetype};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  min-height: 9rem;
`;

const skillTierCoreMedium = css`
  ${skillsCardGlassArchetype};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  min-height: 7.5rem;
`;

const skillTierPeripheralFeatured = css`
  ${skillsCardGlassArchetype};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  min-height: 6.5rem;
`;

const skillTierPeripheralStandard = css`
  ${skillsCardGlassArchetype};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const skillTierPeripheralInstrument = css`
  ${skillsCardGlassArchetype};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 0;
  min-height: 8.5rem;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
`;

const skillTierPeripheralCompact = css`
  ${skillsCardGlassArchetype};
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

export const SkillsPeripheralChapter = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

export const SupportStackMatrix = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacing.md} * 0.85);
  width: 100%;
`;

export const SupportStackFeaturedRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(${({ theme }) => theme.spacing.md} * 0.85);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

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
