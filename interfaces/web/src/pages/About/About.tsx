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
import { useScrollMotion } from '@/hooks/useScrollMotion';

// Config
import { publicAssetUrl } from '@/config/env';

// Components
import {
  PageContainerNarrow,
  PageHeaderLeft,
  PageTitleLeft,
} from '@/styles/pageLayout.style';

// View
import {
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
  ExperienceTimeline,
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

const viewportSection = { once: true, margin: '-60px' as const };
const viewportTight = { once: true, margin: '-40px' as const };

interface StatCounterProps {
  target: number;
  suffix?: string;
  label: string;
}

function StatCounter({
  target,
  suffix = '',
  label,
}: StatCounterProps): React.ReactElement {
  const { count, ref } = useCountUp({ target, duration: 1400 });
  const { item } = useScrollMotion();

  return (
    <StatCard variants={item}>
      <StatNumber ref={ref}>
        {count}
        {suffix}
      </StatNumber>
      <StatLabel>{label}</StatLabel>
    </StatCard>
  );
}

export function About(): React.ReactElement {
  const { t } = useTranslation();
  const { section, stagger, item } = useScrollMotion();

  return (
    <PageContainerNarrow>
      <PageHeaderLeft>
        <PageTitleLeft
          variants={section}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSection}
        >
          {t('about.title')}
        </PageTitleLeft>
      </PageHeaderLeft>

      <IntroSection
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSection}
      >
        <Avatar variants={item}>
          <img
            src={publicAssetUrl('avatar.png')}
            alt="Vinicius"
          />
        </Avatar>
        <IntroContent>
          <motion.h2 variants={item}>
            {t('about.intro.title')}
          </motion.h2>
          <motion.p variants={item}>
            {t('about.intro.lead')}
          </motion.p>
          <IntroHighlight variants={item}>
            {t('about.intro.highlight')}
          </IntroHighlight>
          <motion.p variants={item}>
            {t('about.intro.impact')}
          </motion.p>
        </IntroContent>
      </IntroSection>

      <StatsGrid
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSection}
      >
        <StatCounter target={3} suffix="+" label={t('about.stats.experience')} />
        <StatCounter target={2} label={t('about.stats.testing')} />
        <StatCounter target={400} suffix="+" label={t('about.stats.certifiedHours')} />
      </StatsGrid>

      <ExperienceSection>
        <ExperienceSectionTitle>{t('about.superior.sectionTitle')}</ExperienceSectionTitle>
        <ExperienceTimeline
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportTight}
        >
          <ExperienceCard variants={item}>
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
        </ExperienceTimeline>
      </ExperienceSection>

      <PhilosophySection
        variants={section}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSection}
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
        variants={section}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSection}
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
    </PageContainerNarrow>
  );
}
