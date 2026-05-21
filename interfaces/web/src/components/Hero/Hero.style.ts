// Libraries
import styled, { keyframes, DefaultTheme } from 'styled-components';

// Components
import { glassSurface } from '../../styles/surfaces';

const pulseGlow = (theme: DefaultTheme) => keyframes`
  0%, 100% {
    opacity: ${theme.effects.opacity.heroGlowMin};
    transform: translate(-50%, -50%) scale(1);
  };
  50% {
    opacity: ${theme.effects.opacity.heroGlowMax};
    transform: translate(-50%, -50%) scale(1.04);
  };
`;

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

export const HeroAtmosphere = styled.div`
  position: absolute;
  top: 8%;
  right: -8%;
  width: ${({ theme }) => theme.sizes.hero.atmosphereWidth};
  height: ${({ theme }) => theme.sizes.hero.atmosphereHeight};
  background: ${({ theme }) => theme.colors.gradientHeroAtmosphere};
  transform: rotate(-12deg);
  pointer-events: none;
  z-index: 0;
  opacity: ${({ theme }) => theme.effects.opacity.heroGlowMin};
  filter: blur(${({ theme }) => theme.effects.blur.md});
  mask-image: ${({ theme }) => theme.colors.gradientGridMask};
`;

export const HeroColumnGuides = styled.div`
  position: absolute;
  inset: 0;
  max-width: ${({ theme }) => theme.layout.contentWide};
  margin: 0 auto;
  pointer-events: none;
  z-index: 0;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    display: block;
  };

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 12%;
    bottom: 18%;
    width: 1px;
    background: ${({ theme }) => theme.colors.borderSubtle};
    opacity: ${({ theme }) => theme.effects.opacity.subtle};
  };

  &::before {
    left: 33.33%;
  };

  &::after {
    left: 66.66%;
  };
`;

export const HeroWorkspaceTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.heroDisplay};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  color: ${({ theme }) => theme.colors.text};
`;

export const HeroOperatorLine = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

export const SystemPanel = styled.div`
  width: min(100%, 420px);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
`;

export const SystemPanelHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

export const SystemPanelTitle = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-transform: uppercase;
`;

export const SystemPanelBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const SystemReadoutRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const SystemReadoutLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
`;

export const SystemReadoutValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const SystemOperatorRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xs};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

export const HeroSection = styled.section`
  position: relative;
  min-height: ${({ theme }) => theme.sizes.hero.minHeight};
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl}
    ${({ theme }) => theme.spacing.pageX}
    ${({ theme }) => theme.spacing.section};
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: ${({ theme }) => theme.sizes.hero.minHeightMobile};
    padding-top: ${({ theme }) => theme.spacing.xl};
  };
`;

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
`;

export const GlowBackdrop = styled.div`
  position: absolute;
  top: 38%;
  left: 62%;
  transform: translate(-50%, -50%);
  width: ${({ theme }) => theme.sizes.hero.glowWidth};
  height: ${({ theme }) => theme.sizes.hero.glowHeight};
  max-width: 100%;
  background: ${({ theme }) => theme.colors.gradientHeroCenter};
  pointer-events: none;
  animation: ${({ theme }) => pulseGlow(theme)} 5s ease-in-out infinite;
  z-index: 1;
  filter: blur(${({ theme }) => theme.effects.blur.xs});
  will-change: transform;
`;

export const GlowBackdropSecondary = styled.div`
  position: absolute;
  top: 12%;
  left: 4%;
  width: ${({ theme }) => theme.sizes.hero.orbAccent};
  height: ${({ theme }) => theme.sizes.hero.orbAccent};
  background: ${({ theme }) => theme.colors.gradientHeroOrbAccent};
  pointer-events: none;
  z-index: 0;
  will-change: transform;
`;

export const GlowBackdropTertiary = styled.div`
  position: absolute;
  bottom: 8%;
  right: 8%;
  width: ${({ theme }) => theme.sizes.hero.orbPrimary};
  height: ${({ theme }) => theme.sizes.hero.orbPrimary};
  background: ${({ theme }) => theme.colors.gradientHeroOrbPrimary};
  pointer-events: none;
  z-index: 0;
  will-change: transform;
`;

export const HeroEditorialGrid = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentWide};
  margin: 0 auto;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1.18fr 0.82fr;
    text-align: left;
    gap: ${({ theme }) => theme.spacing.sectionSm};
  };

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    text-align: center;
  };
`;

export const HeroCopyColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    align-items: center;
  };
`;

export const HeroVisualColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    align-items: flex-end;
    padding-bottom: ${({ theme }) => theme.spacing.xxl};
    transform: translateY(${({ theme }) => theme.spacing.lg});
  };
`;

export const HeroAvatarFrame = styled.div`
  position: relative;
  width: min(100%, ${({ theme }) => theme.sizes.hero.avatarFrame});
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeroAvatarRing = styled.div`
  position: absolute;
  inset: -${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.gradientHeroRing};
  opacity: ${({ theme }) => theme.effects.opacity.heroRing};
  pointer-events: none;
`;

export const HeroAvatar = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.surfaceElevated};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  };
`;

export const HeroDecoTag = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceGlass};
`;

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
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
`;

export const HeroDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: ${({ theme }) => theme.layout.prose};
  margin-top: ${({ theme }) => theme.spacing.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  };
`;

export const HeroStatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    justify-content: center;
  };
`;

export const HeroStat = styled.div`
  min-width: ${({ theme }) => theme.sizes.hero.statMinWidth};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    text-align: center;
  };
`;

export const HeroStatValue = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

export const HeroStatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: ${({ theme }) => theme.spacing.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
`;

export const CtaWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    justify-content: center;
  };
`;

export const CtaButtonWrapper = styled.div`
  flex-shrink: 0;
`;

export const HeroScrollCue = styled.button`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.zIndex.content};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  padding: ${({ theme }) => theme.spacing.sm};
  animation: ${({ theme }) => scrollCueBounce(theme)} 2.4s ease-in-out infinite;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 4px;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  };
`;

export const ScrollCueLine = styled.span`
  display: block;
  width: 1px;
  height: ${({ theme }) => theme.sizes.hero.scrollCueHeight};
  background: ${({ theme }) => theme.colors.gradientScrollCue};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;
