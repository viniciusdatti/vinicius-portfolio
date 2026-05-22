// Core
import React, { useRef } from 'react';

// Libraries
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Components
import { motionPresets } from '../../styles/motionPresets';
import { motionEase, heroClipReveal } from '../../styles/animations';
import { publicAssetUrl } from '../../config/env';
import { Button } from '../Button';
import { HeroLiveMicro } from './HeroLiveMicro';
import {
  HeroSection,
  HeroAtmosphere,
  HeroDecoGrid,
  HeroColumnGuides,
  GlowBackdrop,
  GlowBackdropSecondary,
  GlowBackdropTertiary,
  HeroEditorialGrid,
  HeroCopyColumn,
  HeroVisualColumn,
  HeroDecoTag,
  HeroHeadline,
  HeroStackLine,
  HeroDescription,
  HeroStatsRow,
  HeroStat,
  HeroStatValue,
  HeroStatLabel,
  CtaWrapper,
  CtaButtonWrapper,
  HeroScrollCue,
  ScrollCueLine,
  HeroVisualCard,
  HeroAvatarFrame,
  HeroAvatarRing,
  HeroPortrait,
} from './Hero.style';

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

/* ***********************************************************************************************
 ****************************************** METHODS ***********************************************
 *********************************************************************************************** */

const scrollToNarrative = (): void => {
  document.getElementById('section-capabilities')?.scrollIntoView({ behavior: 'smooth' });
};

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

export const Hero: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const avatarSrc: string = publicAssetUrl('avatar.png');

  const stats: { valueKey: string; labelKey: string }[] = [
    { valueKey: 'home.hero.stats.productionValue', labelKey: 'home.hero.stats.production' },
    { valueKey: 'home.hero.stats.realtimeValue', labelKey: 'home.hero.stats.realtime' },
    { valueKey: 'home.hero.stats.architectureValue', labelKey: 'home.hero.stats.architecture' },
  ];

  return (
    <HeroSection ref={sectionRef}>
      <HeroAtmosphere aria-hidden />
      <GlowBackdropSecondary aria-hidden />
      <GlowBackdropTertiary aria-hidden />
      <GlowBackdrop aria-hidden />
      <HeroDecoGrid aria-hidden />
      <HeroColumnGuides aria-hidden />
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
            <motion.div variants={heroClipReveal}>
              <HeroHeadline>{t('home.hero.headline')}</HeroHeadline>
            </motion.div>
            <motion.div variants={itemVariants}>
              <HeroStackLine>{t('home.hero.stackLine')}</HeroStackLine>
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
              <HeroVisualCard>
                <HeroAvatarFrame>
                  <HeroAvatarRing aria-hidden />
                  <HeroPortrait>
                    <img src={avatarSrc} alt={t('home.hero.portraitAlt')} />
                  </HeroPortrait>
                </HeroAvatarFrame>
                <HeroLiveMicro />
              </HeroVisualCard>
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
      </HeroScrollCue>
    </HeroSection>
  );
};
