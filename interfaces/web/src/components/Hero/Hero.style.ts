// Libraries
import { motion } from 'framer-motion';
import styled, { keyframes, DefaultTheme } from 'styled-components';

// Components
import { AVATAR_PORTRAIT_FRAME_ASPECT_RATIO } from '@/config/avatarImage';
import { AvatarPortraitPhoto } from '@/components/AvatarPortrait';
import {
  cardPointerVars,
  operationalGlass,
  operationalGlassDeep,
  surfaceMotion,
} from '@/styles/surfaces';

const gridDrift = (theme: DefaultTheme) => keyframes`
  0% {
    transform: translateY(0);
  };
  100% {
    transform: translateY(${theme.motion.distance.gridDrift});
  };
`;

const scrollCueBounce = (theme: DefaultTheme) => keyframes`
  0%, 100% {
    transform: translateY(0);
    opacity: ${theme.effects.opacity.scrollCueMin};
  };
  50% {
    transform: translateY(${theme.motion.distance.scrollCue});
    opacity: ${theme.effects.opacity.scrollCueMax};
  };
`;

/**
 * @deprecated Warp 33/66% column guides removed — distracting vertical rails behind hero copy.
 */
export const HeroColumnGuides = styled.div`
  display: none;
  pointer-events: none;
`;

/** Background stack — dot grid + hero center wash (z-index 0, under WebGL). */
export const HeroBackgroundStack = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

/** Warp-style technical dot grid — cell size from theme.sizes.hero.gridCell. */
export const HeroDotGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    circle at 1px 1px,
    ${({ theme }) => theme.colors.borderSubtle} 1px,
    transparent 0
  );
  background-size: ${({ theme }) => theme.sizes.hero.gridCell}
    ${({ theme }) => theme.sizes.hero.gridCell};
  opacity: ${({ theme }) => theme.effects.opacity.decoGrid};
  mask-image: ${({ theme }) => theme.colors.gradientGridMask};
  pointer-events: none;
`;

/** HeroAmbient center orb — gradientHeroCenter, amber capped at 10% alpha in theme. */
export const HeroCenterWash = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.gradientHeroCenter};
  pointer-events: none;
`;

/**
 * Clip container for per-character headline mask reveal.
 */
export const HeroHeadlineCharClip = styled.span<{ $space?: boolean }>`
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  line-height: inherit;
  width: ${({ $space }) => ($space ? '0.34em' : 'auto')};
`;

export const HeroHeadlineChar = styled(motion.span)<{ $accent?: boolean }>`
  display: inline-block;
  color: ${({ $accent, theme }) => ($accent ? theme.colors.accent : theme.colors.text)};
`;

/** @deprecated Use HeroHeadlineCharClip */
export const HeroHeadlineWordClip = HeroHeadlineCharClip;

/** @deprecated Use HeroHeadlineChar */
export const HeroHeadlineWord = HeroHeadlineChar;

/** Outer measure shell — grid column owns width; no artificial H1 cap. */
export const HeroHeadlineClip = styled.div`
  width: 100%;
  max-width: 100%;
  min-width: 0;
`;

/** Inner mask — vertical clip only for headline entrance choreography. */
export const HeroHeadlineClipInner = styled(motion.div)`
  overflow: hidden;
  width: 100%;
  min-width: 0;
`;

export const HeroHeadline = styled(motion.h1)`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 3vw, 2rem);
  text-align: inherit;
  width: 100%;
  max-width: 100%;
  min-width: 0;
`;

export const HeroHeadlineBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: flex-start;
  width: 100%;
  min-width: 0;
`;

/** Microscopic mono channel label above each headline line (rauno-style contrast). */
export const HeroHeadlineBlockLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: clamp(0.5625rem, 1.6vw, ${({ theme }) => theme.typography.fontSize.xs});
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  line-height: 1.2;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
  opacity: ${({ theme }) => theme.effects.opacity.subtle};
`;

export const HeroMicroLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: clamp(0.5625rem, 1.6vw, ${({ theme }) => theme.typography.fontSize.xs});
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  line-height: 1.2;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
`;

export const HeroEyebrowRow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

/** Live-demo micro-eyebrow — outside H1, does not split the headline semantics. */
export const HeroLiveIndicatorRow = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-width: 0;
`;

/** Uppercase technical eyebrows — micro-gap so labels do not read as one block. */
export const HeroEyebrowStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  min-width: 0;
`;

/** Animated technical rule — expands 0 → 24px via Framer (Hero.motion). */
export const HeroEyebrowLine = styled(motion.span)`
  display: block;
  height: 1px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.accent};
  opacity: 0.5;
`;

export const HeroHeadlineLine = styled.span<{ $accent?: boolean }>`
  display: block;
  line-height: 0.94;
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(2.5rem, 4.5vw, 4.25rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ $accent, theme }) => ($accent ? theme.colors.accent : theme.colors.text)};
  hyphens: none;
  overflow-wrap: break-word;
  word-break: normal;
  text-wrap: pretty;
  max-width: 100%;
  min-width: 0;
`;

/** Default headline tone — crisp primary text inside the unified H1 line. */
export const HeroHeadlineText = styled.span`
  display: inline;
  color: ${({ theme }) => theme.colors.text};
`;

/** Amber display gradient — second half of the hero headline (theme gradientTextDisplay). */
export const HeroHeadlineHighlight = styled.span`
  display: inline-block;
  background-image: ${({ theme }) => theme.colors.gradientTextDisplay};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

export const HeroVisualCard = styled.div`
  ${operationalGlass};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  width: min(100%, 400px);
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
`;

export const HeroPortrait = styled.div`
  position: relative;
  width: clamp(14rem, 20vw, 20rem);
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  aspect-ratio: ${AVATAR_PORTRAIT_FRAME_ASPECT_RATIO};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.primaryBorderFaint};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  box-shadow:
    ${({ theme }) => theme.elevation.md},
    ${({ theme }) => theme.shadows.glow},
    0 0 28px ${({ theme }) => theme.colors.primary}22;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${({ theme }) => theme.colors.gradientSurfaceRim};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.primaryBorderFaint};
    pointer-events: none;
    z-index: 1;
  };

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.primaryBorderStrong};
    };
  };

  ${AvatarPortraitPhoto} {
    filter: contrast(1.05) saturate(0.94);
    position: relative;
    z-index: 0;
  }
`;

export const HeroSection = styled.section`
  position: relative;
  z-index: 5;
  min-height: ${({ theme }) => theme.sizes.hero.minHeightMobile};
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.pageX}
    ${({ theme }) => theme.spacing.sectionSm};
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  touch-action: manipulation;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: ${({ theme }) => theme.sizes.hero.minHeight};
    padding-top: ${({ theme }) => theme.spacing.xl};
    padding-bottom: ${({ theme }) => theme.spacing.sectionSm};
  };
`;

/** @deprecated Superseded by HeroAmbient operational grid — kept for export stability. */
export const HeroDecoGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    circle at 1px 1px,
    ${({ theme }) => theme.colors.borderSubtle} 1px,
    transparent 0
  );
  background-size: ${({ theme }) => theme.sizes.hero.gridCell}
    ${({ theme }) => theme.sizes.hero.gridCell};
  opacity: ${({ theme }) => theme.effects.opacity.decoGrid};
  pointer-events: none;
  z-index: 0;
  mask-image: ${({ theme }) => theme.colors.gradientGridMask};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    animation: ${({ theme }) => gridDrift(theme)} 12s ease-in-out infinite alternate;
  };

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/** Framer stagger root — editorial cubic entrance choreography. */
export const HeroMotionStack = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  width: 100%;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    align-items: flex-start;
  };
`;

/** Canonical 2-column hero shell — content column + portrait (desktop). */
export const HeroLayoutGrid = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentWide};
  margin: 0 auto;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;
  text-align: center;
  min-height: 0;
  box-sizing: border-box;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 40px;
    align-items: center;
    justify-items: stretch;
    text-align: left;
  };
`;

/** @deprecated Use HeroLayoutGrid */
export const HeroControlRoomGrid = HeroLayoutGrid;

/** Negative space bay — cols 8–12 reserved for HeroVisual3D particles (desktop). */
export const HeroVoidReserve = styled.div`
  display: none;
  min-width: 0;
  pointer-events: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
    grid-column: 9 / 13;
    grid-row: 1;
    min-height: 0;
    align-self: stretch;
  };
`;

/**
 * Desktop portrait column — integrated second grid cell beside narrative content.
 */
export const HeroPortraitDesktopSlot = styled(motion.div)`
  display: none;
  position: relative;
  z-index: 4;
  width: 100%;
  min-width: 0;
  pointer-events: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-column: 2;
    grid-row: 1;
    align-self: center;
    justify-self: center;
    place-self: center;
  };

  ${HeroPortrait} {
    position: relative;
    z-index: 4;
    pointer-events: auto;
  };
`;

/** Portrait reveal wrapper — mobile/tablet only; omitted from desktop grid flow. */
export const HeroPortraitMobileReveal = styled(motion.div)`
  width: 100%;
  display: block;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  };
`;

/** Portrait in document flow on mobile/tablet — stacked above centered narrative. */
export const HeroPortraitMobileSlot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 100%;
  max-width: 100%;
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  };
`;

export const HeroNarrativeColumn = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: contents;
  };
`;

/**
 * Unified narrative cell — eyebrows through CTAs; grid centering targets this block.
 */
export const HeroNarrativeContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 1;
    grid-row: 1;
    align-items: flex-start;
    align-self: center;
    justify-content: center;
    text-align: left;
  };
`;

/** Scroll cue — row 2 on desktop so it does not pull portrait off the content midline. */
export const HeroScrollCueSlot = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 1;
    grid-row: 2;
    justify-content: flex-start;
    align-self: start;
  };
`;

/** @deprecated Use HeroNarrativeColumn */
export const HeroPrimaryColumn = HeroNarrativeColumn;

export const HeroVoidTerminal = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  ${operationalGlassDeep};
  ${cardPointerVars};
  ${surfaceMotion};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  opacity: 0.58;
  pointer-events: none;
  touch-action: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    position: relative;
    grid-column: 2;
    min-height: 100%;
    align-self: stretch;
    opacity: 1;
    pointer-events: auto;
  };

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.borderLight};
    }
  };
`;

export const HeroVoidColumn = styled.div`
  position: relative;
  width: 100%;
  min-height: inherit;
`;

/** Mono label — instrumented void bay (desktop). */
export const HeroVoidTerminalLabel = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  z-index: 3;
  display: none;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  pointer-events: none;
  user-select: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
  };
`;

/** @deprecated Use HeroVoidTerminal layout shell */
export const HeroBootRailWrap = styled(motion.div)``;

/** @deprecated Boot rail merged into headline micro-labels */
export const HeroBootRail = styled.div``;

/** @deprecated Use HeroMicroLabel */
export const HeroBootStatusLine = styled(motion.span)``;

export const HeroSectionIndex = styled.span`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  bottom: ${({ theme }) => theme.spacing.md};
  z-index: 2;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
  };
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.sectionIndex};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: 0.9;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.14;
  pointer-events: none;
  user-select: none;
`;

export const HeroPanelColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 9 / 12;
    grid-row: 2 / 4;
    justify-self: end;
    align-self: start;
    margin-top: clamp(1.5rem, 4vw, 3.5rem);
    width: min(100%, ${({ theme }) => theme.sizes.hero.avatarFrame});
  };
`;

export const HeroPortraitPanel = styled.div`
  ${operationalGlassDeep};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: min(100%, 320px);
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 100%;
  };
`;

/** @deprecated Use HeroControlRoomGrid — kept for type compatibility during migration. */
export const HeroEditorialGrid = HeroControlRoomGrid;

/** @deprecated Use HeroPrimaryColumn. */
export const HeroCopyColumn = HeroPrimaryColumn;

/** @deprecated Use HeroPanelColumn. */
export const HeroVisualColumn = HeroPanelColumn;

export const HeroAvatarFrame = styled(motion.div)`
  position: relative;
  width: min(100%, ${({ theme }) => theme.sizes.hero.avatarFrame});
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  transform: perspective(900px)
    rotateX(var(--hero-tilt-x, 0deg))
    rotateY(var(--hero-tilt-y, 0deg));

  @media (hover: hover) and (pointer: fine) {
    will-change: transform;
  };

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 100%;
  }
`;

export const HeroBootStatusStagger = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: inherit;
`;

/** @deprecated Pill tag replaced by HeroMicroLabel stack */
export const HeroDecoTag = HeroMicroLabel;

export const HeroGreeting = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
`;

export const HeroName = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.heroDisplay};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  background: ${({ theme }) => theme.colors.gradientTextHero};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

export const HeroTitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: ${({ theme }) => theme.typography.fontSize.heroSubtitle};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
`;

export const HeroSubtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.accent};
  margin: 0;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
`;

export const HeroStackLine = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.accent};
  margin: 0;
  letter-spacing: 0.14em;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;
  max-width: 100%;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    justify-content: flex-start;
  };

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
  };
`;

export const HeroStackTech = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.primaryBorderFaint};
  background: ${({ theme }) => theme.colors.primarySurface};
  margin-right: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const HeroStackSeparator = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  opacity: 0.4;
  margin: 0 ${({ theme }) => theme.spacing.sm};
  user-select: none;
  font-size: 0.6em;
  line-height: 1;
`;

export const HeroDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 100%;
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  text-align: inherit;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: ${({ theme }) => theme.layout.prose};
  };
`;

export const CtaWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.md};
  };

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
  };
`;

export const CtaButtonWrapper = styled.div`
  flex-shrink: 0;
`;

export const HeroScrollCue = styled.button`
  display: none;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.lg};
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  align-self: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    align-self: flex-start;
  };

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 4px;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  };
`;

/**
 * Chevron that bounces independently below the scroll cue text.
 * Separate from HeroScrollCue so only the chevron animates, not the label.
 */
export const HeroScrollChevron = styled.span`
  display: block;
  font-size: 0.65em;
  opacity: ${({ theme }) => theme.effects.opacity.scrollCueMin};
  animation: ${({ theme }) => scrollCueBounce(theme)} 2.4s ease-in-out infinite;
  line-height: 1;
  margin-top: 2px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const ScrollCueLine = styled.span`
  display: block;
  width: 1px;
  height: ${({ theme }) => theme.sizes.hero.scrollCueHeight};
  background: ${({ theme }) => theme.colors.gradientScrollCue};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  flex-shrink: 0;
`;
