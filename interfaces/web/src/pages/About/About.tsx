/**
 * About page component displaying personal information and stats.
 */

// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Hooks
import { useCountUp } from '@/hooks';

// Config
import { publicAssetUrl } from '@/config/env';

// Components
import {
  scrollReveal,
  scrollRevealStagger,
  scrollRevealItem,
} from '@/styles/animations';

// View
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
  ExperienceSection,
  ExperienceSectionTitle,
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
} from '@/pages/About/About.style';

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
        <StatCounter target={2} label={t('about.stats.testing')} />
        <StatCounter target={400} suffix="+" label={t('about.stats.certifiedHours')} />
      </StatsGrid>

      <ExperienceSection>
        <ExperienceSectionTitle>{t('about.superior.sectionTitle')}</ExperienceSectionTitle>
        <ExperienceCard
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          whileHover={{ y: -2 }}
        >
          <ExperienceCardHeader>
            <ExperienceCardTitle>{t('about.superior.title')}</ExperienceCardTitle>
          </ExperienceCardHeader>
          <ExperienceCardRole>{t('about.superior.role')}</ExperienceCardRole>
          <ExperienceCardSummary>{t('about.superior.summary')}</ExperienceCardSummary>
          <ExperienceBullets>
            <ExperienceBullet>{t('about.superior.items.realtime')}</ExperienceBullet>
            <ExperienceBullet>{t('about.superior.items.designSystem')}</ExperienceBullet>
            <ExperienceBullet>{t('about.superior.items.auth')}</ExperienceBullet>
            <ExperienceBullet>{t('about.superior.items.quality')}</ExperienceBullet>
          </ExperienceBullets>
        </ExperienceCard>
      </ExperienceSection>

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
