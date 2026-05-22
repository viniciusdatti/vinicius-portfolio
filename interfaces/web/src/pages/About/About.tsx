/**
 * About page component displaying personal information and stats.
 */

// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Components
import {
  scrollReveal,
  scrollRevealStagger,
  scrollRevealItem,
} from '../../styles/animations';
import { publicAssetUrl } from '../../config/env';
import { useCountUp } from '../../hooks';
import {
  PageContainer,
  PageTitle,
  IntroSection,
  Avatar,
  IntroContent,
  StatsGrid,
  StatCard,
  StatNumber,
  StatLabel,
  Section,
  PhilosophySection,
  SectionTitle,
  PhilosophyCard,
  EducationCard,
  EducationMain,
  EducationIcon,
  EducationInfo,
  EducationStatus,
  ComplementaryText,
  ExperienceCard,
  ExperienceCardHeader,
  ExperienceCardTitle,
  ExperienceCardRole,
  ExperienceCardSummary,
  ExperienceBullets,
  ExperienceBullet,
} from './About.style';

/* *************************************************************************************************
 **************************************** COMPONENT HANDLING ***************************************
 ************************************************************************************************ */

interface StatCounterProps {
  target: number;
  suffix?: string;
  label: string;
}

/**
 * Individual stat card with count-up animation triggered on viewport enter.
 */
const StatCounter: React.FC<StatCounterProps> = ({
  target,
  suffix = '',
  label,
}): React.ReactElement => {
  const { count, ref } = useCountUp({ target, duration: 1400 });

  return (
    <StatCard variants={scrollRevealItem} whileHover={{ y: -5 }}>
      <StatNumber ref={ref}>
        {count}
        {suffix}
      </StatNumber>
      <StatLabel>{label}</StatLabel>
    </StatCard>
  );
};

/**
 * About page with personal introduction, stats, philosophy, and education.
 */
export const About: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <PageTitle
        variants={scrollReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-80px' }}
      >
        {t('about.title')}
      </PageTitle>

      <IntroSection
        variants={scrollRevealStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-60px' }}
      >
        <Avatar
          variants={scrollRevealItem}
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={publicAssetUrl('avatar.png')}
            alt="Vinicius"
          />
        </Avatar>
        <IntroContent>
          <motion.h2 variants={scrollRevealItem}>
            {t('about.intro.title')}
          </motion.h2>
          <motion.p variants={scrollRevealItem}>
            {t('about.intro.description')}
          </motion.p>
        </IntroContent>
      </IntroSection>

      <Section>
        <SectionTitle>{t('about.industrialExperience.sectionTitle')}</SectionTitle>
        <ExperienceCard
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          whileHover={{ y: -2 }}
        >
          <ExperienceCardHeader>
            <ExperienceCardTitle>{t('about.industrialExperience.title')}</ExperienceCardTitle>
          </ExperienceCardHeader>
          <ExperienceCardRole>{t('about.industrialExperience.role')}</ExperienceCardRole>
          <ExperienceCardSummary>{t('about.industrialExperience.summary')}</ExperienceCardSummary>
          <ExperienceBullets>
            <ExperienceBullet>{t('about.industrialExperience.items.dashboards')}</ExperienceBullet>
            <ExperienceBullet>{t('about.industrialExperience.items.realtime')}</ExperienceBullet>
            <ExperienceBullet>{t('about.industrialExperience.items.responsive')}</ExperienceBullet>
            <ExperienceBullet>{t('about.industrialExperience.items.auth')}</ExperienceBullet>
          </ExperienceBullets>
        </ExperienceCard>
      </Section>

      <StatsGrid
        variants={scrollRevealStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <StatCounter target={3} suffix="+" label={t('about.stats.experience')} />
        <StatCounter target={2} label={t('about.stats.dashboards')} />
        <StatCounter target={5} label={t('about.stats.breakpoints')} />
      </StatsGrid>

      <PhilosophySection
        variants={scrollReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <SectionTitle>{t('about.philosophy.title')}</SectionTitle>
        <PhilosophyCard>
          <p>"{t('about.philosophy.description')}"</p>
        </PhilosophyCard>
      </PhilosophySection>

      <Section
        variants={scrollReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <SectionTitle>{t('about.education.title')}</SectionTitle>
        <EducationCard>
          <EducationMain>
            <EducationIcon>🎓</EducationIcon>
            <EducationInfo>
              <h4>{t('about.education.degree')}</h4>
              <p>{t('about.education.institution')}</p>
              <EducationStatus>{t('about.education.status')}</EducationStatus>
            </EducationInfo>
          </EducationMain>
          <ComplementaryText>
            {t('about.education.complementary')}
          </ComplementaryText>
        </EducationCard>
      </Section>
    </PageContainer>
  );
};
