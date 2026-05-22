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
  IntroHighlight,
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
  VantageCard,
  VantageCardHeader,
  VantageCardTitle,
  VantageCardRole,
  VantageCardSummary,
  VantageBullets,
  VantageBullet,
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
function StatCounter({
  target,
  suffix = '',
  label,
}: StatCounterProps): React.ReactElement {
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
}

/**
 * About page with personal introduction, stats, philosophy, and education.
 */
export function About(): React.ReactElement {
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
            {t('about.intro.lead')}
          </motion.p>
          <IntroHighlight variants={scrollRevealItem}>
            {t('about.intro.highlight')}
          </IntroHighlight>
          <motion.p variants={scrollRevealItem}>
            {t('about.intro.impact')}
          </motion.p>
        </IntroContent>
      </IntroSection>

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

      <Section>
        <SectionTitle>{t('about.vantage.sectionTitle')}</SectionTitle>
        <VantageCard
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          whileHover={{ y: -2 }}
        >
          <VantageCardHeader>
            <VantageCardTitle>{t('about.vantage.title')}</VantageCardTitle>
          </VantageCardHeader>
          <VantageCardRole>{t('about.vantage.role')}</VantageCardRole>
          <VantageCardSummary>{t('about.vantage.summary')}</VantageCardSummary>
          <VantageBullets>
            <VantageBullet>{t('about.vantage.items.dashboards')}</VantageBullet>
            <VantageBullet>{t('about.vantage.items.realtime')}</VantageBullet>
            <VantageBullet>{t('about.vantage.items.responsive')}</VantageBullet>
            <VantageBullet>{t('about.vantage.items.auth')}</VantageBullet>
          </VantageBullets>
        </VantageCard>
      </Section>

      <PhilosophySection
        variants={scrollReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <SectionTitle>{t('about.philosophy.title')}</SectionTitle>
        <PhilosophyCard>
          <p>
            &ldquo;
            {t('about.philosophy.description')}
            &rdquo;
          </p>
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
}
