// Core
import React from 'react';

// Libraries
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Components
import { Button } from '../Button';
import {
  HeroSection,
  HeroDecoGrid,
  GlowBackdrop,
  GlowBackdropSecondary,
  GlowBackdropTertiary,
  HeroContent,
  HeroAvatar,
  HeroDecoTag,
  HeroName,
  HeroTitle,
  HeroSubtitle,
  HeroDescription,
  CtaWrapper,
  CtaButtonWrapper,
} from './Hero.style';

const MotionHeroContent = motion.create(HeroContent);
const MotionHeroAvatar = motion.create(HeroAvatar);
const MotionHeroDecoTag = motion.create(HeroDecoTag);
const MotionHeroName = motion.create(HeroName);
const MotionHeroTitle = motion.create(HeroTitle);
const MotionHeroSubtitle = motion.create(HeroSubtitle);
const MotionHeroDescription = motion.create(HeroDescription);
const MotionCtaWrapper = motion.create(CtaWrapper);
const MotionCtaButtonWrapper = motion.create(CtaButtonWrapper);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  const publicUrl: string = process.env.PUBLIC_URL ?? '';

  return (
    <HeroSection>
      <HeroDecoGrid aria-hidden />
      <GlowBackdropSecondary aria-hidden />
      <GlowBackdropTertiary aria-hidden />
      <GlowBackdrop aria-hidden />
      <MotionHeroContent
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <MotionHeroAvatar variants={itemVariants}>
          <img
            src={`${publicUrl}/avatar.png`}
            alt="Vinicius Datti"
          />
        </MotionHeroAvatar>
        <MotionHeroDecoTag variants={itemVariants}>
          &lt;/&gt;
        </MotionHeroDecoTag>
        <MotionHeroSubtitle variants={itemVariants}>
          {t('home.hero.greeting')}
        </MotionHeroSubtitle>
        <MotionHeroName variants={itemVariants}>
          {t('home.hero.name')}
        </MotionHeroName>
        <MotionHeroTitle variants={itemVariants}>
          {t('home.hero.title')}
        </MotionHeroTitle>
        <MotionHeroDescription variants={itemVariants}>
          {t('home.hero.description')}
        </MotionHeroDescription>
        <MotionCtaWrapper variants={itemVariants}>
          <MotionCtaButtonWrapper
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() =>
                document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              {t('home.hero.cta')}
            </Button>
          </MotionCtaButtonWrapper>
          <MotionCtaButtonWrapper
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button as={Link} to="/contact" variant="secondary">
              {t('home.hero.contact')}
            </Button>
          </MotionCtaButtonWrapper>
        </MotionCtaWrapper>
      </MotionHeroContent>
    </HeroSection>
  );
};
