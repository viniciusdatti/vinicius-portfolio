// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styles
import {
  cardBodyReadable,
  cardTitleClamp,
} from '../../../styles/surfaces';
import { Section, skillsCardGlassArchetype } from '../Skills.style';

export const ExperienceSection = styled(Section)`
  margin-top: ${({ theme }) => theme.spacing.section};
`;

export const ExperienceIntro = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  max-width: ${({ theme }) => theme.layout.proseWide};
`;

export const ExperienceSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: ${({ theme }) => theme.layout.prose};
`;

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

export const ExperienceCard = styled(motion.div)<ExperienceCardLayoutProps>`
  ${skillsCardGlassArchetype};
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

export const ExperienceCardTitle = styled.h3`
  ${cardTitleClamp};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

export const ExperienceCardDescription = styled.p`
  ${cardBodyReadable};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ExperienceCardHighlight = styled.p`
  ${cardBodyReadable};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  margin-bottom: 0;
`;
