// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Components
import { livingSurface, featuredSpotlight } from '../../styles/surfaces';

// Types
import {
  ProjectShowcaseVariant,
  ProjectCanvasTone,
} from './ProjectShowcase.types';

/* ************** GRID ******************* */

export const ShowcaseGrid = styled(motion.div)<{ $compact?: boolean }>`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  };

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    ${({ $compact }) =>
      $compact
        ? `
          & > [data-variant='featured'] {
            grid-column: span 12;
          };
          & > [data-variant='compact']:nth-of-type(2),
          & > [data-variant='compact']:nth-of-type(3) {
            grid-column: span 6;
          };
          & > [data-variant='compact']:nth-of-type(4) {
            grid-column: span 12;
          };
        `
        : `
          & > [data-variant='featured'] {
            grid-column: span 7;
          };
          & > [data-variant='standard']:nth-of-type(2) {
            grid-column: span 5;
          };
          & > [data-variant='standard'] {
            grid-column: span 4;
          };
        `};
  };
`;

/* ************** CARD ******************* */

export interface ShowcaseCardStyleProps {
  $variant: ProjectShowcaseVariant;
  $canvasTone: ProjectCanvasTone;
  $selected?: boolean;
}

export const ShowcaseCard = styled(motion.article)<ShowcaseCardStyleProps>`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  overflow: hidden;
  cursor: pointer;
  position: relative;
  ${livingSurface};
  transition:
    transform ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.fast};
  border-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary : theme.colors.borderSubtle};
  box-shadow: ${({ $selected, theme }) =>
    $selected ? theme.elevation.lg : theme.elevation.sm};

  ${({ $variant }) =>
    $variant === ProjectShowcaseVariant.Featured ? featuredSpotlight : ''};

  & > * {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
  };

  &:hover {
    transform: translateY(-${({ theme }) => theme.motion.distance.liftMd});
    border-color: ${({ theme }) => theme.colors.borderLight};
    box-shadow: ${({ theme }) => theme.shadows.lg};
  };

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  };
`;

export const PreviewIndexWatermark = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.lg};
  z-index: ${({ theme }) => theme.zIndex.content};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.sectionIndex};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text};
  opacity: ${({ theme }) => theme.effects.opacity.scrollCueMin};
  pointer-events: none;
`;

export const PreviewPanel = styled.div<ShowcaseCardStyleProps>`
  position: relative;
  min-height: ${({ theme, $variant }) =>
    $variant === ProjectShowcaseVariant.Featured
      ? theme.sizes.project.previewHeightFeatured
      : $variant === ProjectShowcaseVariant.Compact
        ? theme.sizes.project.previewHeightCompact
        : theme.sizes.project.previewHeight};
  background: ${({ theme, $canvasTone }) =>
    $canvasTone === ProjectCanvasTone.B
      ? theme.colors.gradientProjectCanvasB
      : $canvasTone === ProjectCanvasTone.C
        ? theme.colors.gradientProjectCanvasC
        : theme.colors.gradientProjectCanvasA};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  padding: ${({ theme }) => theme.spacing.lg};
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.gradientLiveLabGlow};
    pointer-events: none;
  };
`;

export const MockWindow = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  box-shadow: ${({ theme }) => theme.elevation.md};
  overflow: hidden;
`;

export const MockWindowBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

export const MockDot = styled.span`
  width: ${({ theme }) => theme.sizes.badge.dotSm};
  height: ${({ theme }) => theme.sizes.badge.dotSm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.borderLight};
`;

export const MockBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const MockLine = styled.div<{ $width?: string }>`
  height: ${({ theme }) => theme.sizes.badge.dot};
  width: ${({ $width }) => $width ?? '72%'};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.borderSubtle};
`;

export const MockLineAccent = styled(MockLine)`
  background: ${({ theme }) => theme.colors.primaryLight};
  width: 48%;
`;

export const TechFloatingRow = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.lg};
  bottom: ${({ theme }) => theme.spacing.lg};
  z-index: ${({ theme }) => theme.zIndex.content};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: 55%;
`;

export const TechChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceGlass};
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.glass};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};

  img {
    width: ${({ theme }) => theme.sizes.icon.sm};
    height: ${({ theme }) => theme.sizes.icon.sm};
  };
`;

export const TechChipFallback = styled.span`
  width: ${({ theme }) => theme.sizes.icon.sm};
  height: ${({ theme }) => theme.sizes.icon.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.primaryLight};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
`;

export const CardMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const IndexLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  color: ${({ theme }) => theme.colors.accent};
  text-transform: uppercase;
`;

export const LivePill = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.success};
  background: ${({ theme }) => theme.colors.successSurface};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

export const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  color: ${({ theme }) => theme.colors.text};

  ${ShowcaseCard}[data-variant='featured'] & {
    font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  };
`;

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.textMuted};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardFooter = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ViewCaseLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.primary};
`;

export const ArrowIcon = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  transition: transform ${({ theme }) => theme.transitions.fast};

  ${ShowcaseCard}:hover & {
    transform: translateX(${({ theme }) => theme.motion.distance.liftSm});
  };
`;
