// Libraries
import styled, { keyframes, DefaultTheme } from 'styled-components';
import { motion } from 'framer-motion';

// Components
import { cardShowcaseSurface } from '@/styles/surfaces';
import {
  ProjectShowcaseVariant,
  ProjectCanvasTone,
} from '@/components/ProjectShowcase/ProjectShowcase.types';

const getPreviewMinHeight = (
  variant: ProjectShowcaseVariant | undefined,
  theme: DefaultTheme,
): string => {
  if (variant === ProjectShowcaseVariant.Featured) {
    return theme.sizes.project.previewHeightFeatured;
  }
  if (variant === ProjectShowcaseVariant.Compact) {
    return theme.sizes.project.previewHeightCompact;
  }
  return theme.sizes.project.previewHeight;
};

const getCanvasBackground = (
  canvasTone: ProjectCanvasTone | undefined,
  theme: DefaultTheme,
): string => {
  if (canvasTone === ProjectCanvasTone.B) return theme.colors.gradientProjectCanvasB;
  if (canvasTone === ProjectCanvasTone.C) return theme.colors.gradientProjectCanvasC;
  return theme.colors.gradientProjectCanvasA;
};

// =================================================================================================
// ============================================= GRID ==============================================
// =================================================================================================

export const ShowcaseGrid = styled(motion.div)<{ $compact?: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(12, 1fr);
    ${({ $compact }) => ($compact
    ? `
          & > [data-variant='featured'] {
            grid-column: 1 / span 7;
            grid-row: span 2;
          };
          & > [data-variant='compact']:nth-of-type(2) {
            grid-column: 8 / span 5;
            grid-row: 1;
          };
          & > [data-variant='compact']:nth-of-type(3) {
            grid-column: 8 / span 5;
            grid-row: 2;
          };
          & > [data-variant='compact']:nth-of-type(4) {
            grid-column: 1 / -1;
            grid-row: 3;
          };
        `
    : `
          & > [data-variant='featured'] {
            grid-column: span 8;
          };
          & > [data-variant='standard']:nth-of-type(2) {
            grid-column: span 4;
          };
          & > [data-variant='standard'] {
            grid-column: span 4;
          };
        `)};
  };
`;

// =================================================================================================
// ============================================= CARD ==============================================
// =================================================================================================

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
  ${cardShowcaseSurface};
  border-color: ${({ $selected, theme }) => ($selected ? theme.colors.primaryBorderFaint : theme.colors.borderSubtle)};
  box-shadow: ${({ $selected, theme }) => ($selected ? theme.elevation.md : theme.elevation.sm)};
  transition:
    box-shadow ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.fast};


  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    ${({ $variant, theme }) => ($variant === ProjectShowcaseVariant.Featured
    ? `
          flex-direction: row;
          min-height: ${theme.sizes.project.previewHeightFeatured};
        `
    : '')};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }
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
  min-height: ${({ theme, $variant }) => getPreviewMinHeight($variant, theme)};
  background: ${({ theme, $canvasTone }) => getCanvasBackground($canvasTone, theme)};
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

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    ${({ $variant, theme }) => ($variant === ProjectShowcaseVariant.Featured
    ? `
          flex: 0 0 44%;
          min-height: unset;
          border-bottom: none;
          border-right: 1px solid ${theme.colors.borderSubtle};
        `
    : '')};
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

/**
 * Keyframe that simulates "data loading" activity by gently shifting the line width.
 * Each MockLine gets a different animation-delay so they feel async.
 */
const lineActivity = keyframes`
  0%   { width: var(--line-w); }
  30%  { width: calc(var(--line-w) - 14%); }
  60%  { width: calc(var(--line-w) + 8%); }
  100% { width: var(--line-w); }
`;

export const MockLine = styled.div<{ $width?: string; $delay?: string }>`
  height: ${({ theme }) => theme.sizes.badge.dot};
  width: ${({ $width }) => $width ?? '72%'};
  --line-w: ${({ $width }) => $width ?? '72%'};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.borderSubtle};
  animation: ${lineActivity} 4s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay ?? '0s'};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  };
`;

export const MockLineAccent = styled(MockLine)`
  background: ${({ theme }) => theme.colors.primaryLight};
  --line-w: 48%;
  width: 48%;
  animation-delay: 0.8s;
`;

/**
 * Grid layout for the data-table MockWindow scene.
 * Arranges three MockLine items side by side as table columns.
 */
export const MockRowGroup = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`;

/**
 * Left-accent block for the code/config MockWindow scene.
 * Gives a terminal / editor feel via a left gold border.
 */
export const MockCodeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding-left: ${({ theme }) => theme.spacing.sm};
  border-left: 2px solid ${({ theme }) => theme.colors.primaryBorderFaint};
`;

export const TechFloatingRow = styled.div<{ $hideOnDesktop?: boolean }>`
  position: absolute;
  right: ${({ theme }) => theme.spacing.lg};
  bottom: ${({ theme }) => theme.spacing.lg};
  z-index: ${({ theme }) => theme.zIndex.content};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: 55%;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    ${({ $hideOnDesktop }) => ($hideOnDesktop ? 'display: none;' : '')};
  };
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

  ${ShowcaseCard}[data-variant='featured'] & {
    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xxl};
      gap: ${({ theme }) => theme.spacing.lg};
    };
  };
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

export const RepoSlug = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const DemoPill = styled.span`
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
    font-size: clamp(1.5rem, 2.2vw, 2.125rem);
    letter-spacing: -0.035em;
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
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

  ${ShowcaseCard}[data-variant='featured'] & {
    display: block;
    overflow: visible;
    -webkit-box-orient: initial;
    -webkit-line-clamp: unset;
  };
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

/**
 * Architecture stack thread — appears in featured card body on desktop.
 * Replaces floating tech chips to give a cleaner engineering narrative.
 */
export const TechStackLine = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    color: ${({ theme }) => theme.colors.textMuted};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
    text-transform: uppercase;
    opacity: ${({ theme }) => theme.effects.opacity.subtle};
  };
`;

export const TechStackSep = styled.span`
  margin: 0 ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.borderLight};
  opacity: 1;
`;
