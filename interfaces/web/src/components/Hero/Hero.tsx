// Core
import React from 'react';

// Libraries
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useSpring } from 'framer-motion';

// Hooks
import { usePointerPosition } from '@/hooks/usePointerPosition';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Components
import { motionPresets } from '@/styles/motionPresets';
import { motionEase, heroClipReveal } from '@/styles/animations';
import { publicAssetUrl } from '@/config/env';
import { Button } from '@/components/Button';
import { HeroLiveMicro } from '@/components/Hero/HeroLiveMicro';
import { HeroAmbient } from '@/components/Hero/HeroAmbient';
import {
  HeroSection,
  HeroColumnGuides,
  HeroDecoGrid,
  HeroEditorialGrid,
  HeroCopyColumn,
  HeroVisualColumn,
  HeroDecoTag,
  HeroHeadlineClip,
  HeroHeadline,
  HeroStackLine,
  HeroStackTech,
  HeroStackSeparator,
  HeroDescription,
  HeroStatsRow,
  HeroStat,
  HeroStatValue,
  HeroStatLabel,
  CtaWrapper,
  CtaButtonWrapper,
  HeroScrollCue,
  HeroScrollChevron,
  ScrollCueLine,
  HeroAvatarFrame,
  HeroPortrait,
} from '@/components/Hero/Hero.style';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: motionPresets.stagger.heroChild,
      delayChildren: motionPresets.stagger.heroDelay,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: motionPresets.distance.item },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionPresets.duration.hero, ease: motionEase },
  },
};

const scrollToNarrative = (): void => {
  document.getElementById('section-work')?.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Hero — wrapped in React.memo so language changes (i18n re-renders)
 * do not trigger re-animation. The motion.div keeps its internal state
 * stable across re-renders as long as the component stays mounted.
 */
function HeroComponent(): React.ReactElement {
  const { t } = useTranslation();
  const reduced = usePrefersReducedMotion();
  const { ref: heroRef, position } = usePointerPosition<HTMLElement>(reduced);
  const portraitRotateX = useSpring(0, { stiffness: 200, damping: 26 });
  const portraitRotateY = useSpring(0, { stiffness: 200, damping: 26 });
  const avatarSrc: string = publicAssetUrl('avatar.png');

  React.useEffect(() => {
    if (reduced) return;
    portraitRotateX.set((position.y - 0.5) * -4);
    portraitRotateY.set((position.x - 0.5) * 5);
  }, [position.x, position.y, portraitRotateX, portraitRotateY, reduced]);

  const stats: { valueKey: string; labelKey: string }[] = [
    { valueKey: 'home.hero.stats.productionValue', labelKey: 'home.hero.stats.production' },
    { valueKey: 'home.hero.stats.realtimeValue', labelKey: 'home.hero.stats.realtime' },
    { valueKey: 'home.hero.stats.architectureValue', labelKey: 'home.hero.stats.architecture' },
  ];

  return (
    <HeroSection ref={heroRef}>
      <HeroAmbient />
      <HeroColumnGuides aria-hidden />
      <HeroDecoGrid aria-hidden />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroEditorialGrid>
          <HeroCopyColumn>
            <motion.div variants={itemVariants}>
              <HeroDecoTag>{t('home.hero.eyebrow')}</HeroDecoTag>
            </motion.div>
            <HeroHeadlineClip>
              <motion.div variants={heroClipReveal}>
                <HeroHeadline>{t('home.hero.headline')}</HeroHeadline>
              </motion.div>
            </HeroHeadlineClip>
            <motion.div variants={itemVariants}>
              <HeroStackLine>
                <HeroStackTech>React</HeroStackTech>
                <HeroStackSeparator aria-hidden>●</HeroStackSeparator>
                <HeroStackTech>TypeScript</HeroStackTech>
                <HeroStackSeparator aria-hidden>●</HeroStackSeparator>
                <HeroStackTech>WebSocket</HeroStackTech>
                <HeroStackSeparator aria-hidden>●</HeroStackSeparator>
                <HeroStackTech>FastAPI</HeroStackTech>
              </HeroStackLine>
            </motion.div>
            <motion.div variants={itemVariants}>
              <HeroDescription>{t('home.hero.description')}</HeroDescription>
            </motion.div>
            <motion.div variants={itemVariants}>
              <HeroStatsRow>
                {stats.map((stat) => (
                  <HeroStat key={stat.labelKey}>
                    <HeroStatValue>{t(stat.valueKey)}</HeroStatValue>
                    <HeroStatLabel>{t(stat.labelKey)}</HeroStatLabel>
                  </HeroStat>
                ))}
              </HeroStatsRow>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CtaWrapper>
                <CtaButtonWrapper>
                  <Button as={Link} to="/projects">
                    {t('home.hero.ctaPrimary')}
                  </Button>
                </CtaButtonWrapper>
                <CtaButtonWrapper>
                  <Button variant="secondary" as={Link} to="/live-lab">
                    {t('home.hero.ctaSecondary')}
                  </Button>
                </CtaButtonWrapper>
              </CtaWrapper>
            </motion.div>
          </HeroCopyColumn>
          <HeroVisualColumn>
            <motion.div variants={itemVariants}>
              <HeroAvatarFrame
                style={
                  reduced
                    ? undefined
                    : {
                      rotateX: portraitRotateX,
                      rotateY: portraitRotateY,
                      transformPerspective: 900,
                    }
                }
              >
                <HeroPortrait>
                  <img src={avatarSrc} alt={t('home.hero.portraitAlt')} />
                </HeroPortrait>
              </HeroAvatarFrame>
              <HeroLiveMicro />
            </motion.div>
          </HeroVisualColumn>
        </HeroEditorialGrid>
      </motion.div>
      <HeroScrollCue
        type="button"
        onClick={scrollToNarrative}
        aria-label={t('home.hero.scrollCue')}
      >
        <ScrollCueLine aria-hidden />
        {t('home.hero.scrollCue')}
        <HeroScrollChevron aria-hidden>▼</HeroScrollChevron>
      </HeroScrollCue>
    </HeroSection>
  );
}

export const Hero = React.memo(HeroComponent);
