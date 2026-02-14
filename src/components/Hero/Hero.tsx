import React from 'react';
import { motion } from 'framer-motion';
import {
  HeroSection,
  GlowBackdrop,
  HeroContent,
  HeroName,
  HeroTitle,
  CtaWrapper,
  CtaButtonWrapper,
} from './Hero.style';
import { Button } from '../Button';

const MotionHeroContent = motion(HeroContent);
const MotionHeroName = motion(HeroName);
const MotionHeroTitle = motion(HeroTitle);
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
  return (
    <HeroSection>
      <GlowBackdrop aria-hidden />
      <MotionHeroContent
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <MotionHeroName variants={itemVariants}>
          Vinicius
        </MotionHeroName>
        <MotionHeroTitle variants={itemVariants}>
          Front-end Developer
        </MotionHeroTitle>
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
              Ver Projetos
            </Button>
          </MotionCtaButtonWrapper>
        </MotionCtaWrapper>
      </MotionHeroContent>
    </HeroSection>
  );
};
