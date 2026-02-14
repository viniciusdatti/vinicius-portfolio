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
  GlowBackdrop,
  HeroContent,
  HeroName,
  HeroTitle,
  HeroSubtitle,
  HeroDescription,
  CtaWrapper,
  CtaButtonWrapper,
} from './Hero.style';

const MotionHeroContent = motion(HeroContent);
const MotionHeroName = motion(HeroName);
const MotionHeroTitle = motion(HeroTitle);
const MotionHeroSubtitle = motion(HeroSubtitle);
const MotionHeroDescription = motion(HeroDescription);
const MotionCtaWrapper = motion(CtaWrapper);
const MotionCtaButtonWrapper = motion(CtaButtonWrapper);

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

  return (
    <HeroSection>
      <GlowBackdrop aria-hidden />
      <MotionHeroContent
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
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
