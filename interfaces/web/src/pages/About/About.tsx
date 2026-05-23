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
import { PortraitSceneR3D } from '@/components/Atmosphere/PortraitSceneR3D';
import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageTitleGradient,
  PageSubtitle,
  SectionEyebrow,
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
  ExperienceSectionHeader,
  ExperienceTimelineWrap,
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
  ExperienceNode,
  ExperienceCardBody,
  ExperienceCardHeader,
  ExperienceCardTitle,
  ExperienceCardPeriod,
  ExperienceCardRole,
  ExperienceCardSummary,
  ExperienceLogStream,
  ExperienceLogEntry,
  ExperienceLogIndex,
  ExperienceLogMessage,
} from '@/pages/About/About.style';

const viewportSection = { once: true, margin: '-60px' as const };
const viewportTight = { once: true, margin: '-40px' as const };

const SUPERIOR_LOG_KEYS: readonly string[] = [
  'about.superior.items.realtime',
  'about.superior.items.designSystem',
  'about.superior.items.auth',
  'about.superior.items.quality',
] as const;

interface StatCounterProps {
  target: number;
  suffix?: string;
  label: string;
}

const StatCounter = ({
  target,
  suffix = '',
  label,
}: StatCounterProps): React.ReactElement => {
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
};

export const About = (): React.ReactElement => {
  const { t } = useTranslation();
  const {
    section,
    title,
    stagger,
    item,
  } = useScrollMotion();

  return (
    <PageContainer>
      <PageHeader>
        <SectionEyebrow>{t('home.sections.about.eyebrow')}</SectionEyebrow>
        <PageTitle
          variants={title}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSection}
        >
          <PageTitleGradient>{t('about.title')}</PageTitleGradient>
        </PageTitle>
        <PageSubtitle
          variants={section}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSection}
        >
          {t('about.subtitle')}
        </PageSubtitle>
      </PageHeader>

      <IntroSection
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSection}
      >
        <Avatar variants={item} aria-label={t('home.hero.portraitAlt')}>
          <PortraitSceneR3D imageSrc={publicAssetUrl('avatar.png')} />
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
        <ExperienceSectionHeader>
          <SectionEyebrow>{t('about.experience.eyebrow')}</SectionEyebrow>
          <ExperienceSectionTitle>{t('about.superior.sectionTitle')}</ExperienceSectionTitle>
        </ExperienceSectionHeader>
        <ExperienceTimelineWrap>
          <ExperienceTimeline
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportTight}
          >
            <ExperienceCard variants={section} $isActive>
              <ExperienceNode $isActive aria-hidden />
              <ExperienceCardBody $isActive>
                <ExperienceCardHeader>
                  <ExperienceCardTitle>{t('about.superior.title')}</ExperienceCardTitle>
                  <ExperienceCardPeriod>{t('about.superior.period')}</ExperienceCardPeriod>
                </ExperienceCardHeader>
                <ExperienceCardRole>{t('about.superior.role')}</ExperienceCardRole>
                <ExperienceCardSummary>{t('about.superior.summary')}</ExperienceCardSummary>
                <ExperienceLogStream>
                  {SUPERIOR_LOG_KEYS.map((logKey: string, index: number) => (
                    <ExperienceLogEntry key={logKey}>
                      <ExperienceLogIndex>
                        {String(index + 1).padStart(2, '0')}
                      </ExperienceLogIndex>
                      <ExperienceLogMessage>{t(logKey)}</ExperienceLogMessage>
                    </ExperienceLogEntry>
                  ))}
                </ExperienceLogStream>
              </ExperienceCardBody>
            </ExperienceCard>
          </ExperienceTimeline>
        </ExperienceTimelineWrap>
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
    </PageContainer>
  );
};
