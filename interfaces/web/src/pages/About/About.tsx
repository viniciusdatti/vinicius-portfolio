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
import { useAvatarPortraitObjectPosition } from '@/hooks/useAvatarPortraitObjectPosition';
import { useScrollMotion } from '@/hooks/useScrollMotion';

// Config
import { publicAssetUrl } from '@/config/env';

// Components
import { AvatarPortraitPhoto } from '@/components/AvatarPortrait';
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
  IntroLead,
  IntroImpact,
  IntroHighlight,
  StatsGrid,
  StatCard,
  StatNumber,
  StatValue,
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

interface StatMetricProps {
  value: string;
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

const StatMetric = ({
  value,
  label,
}: StatMetricProps): React.ReactElement => {
  const { item } = useScrollMotion();

  return (
    <StatCard variants={item}>
      <StatValue>{value}</StatValue>
      <StatLabel>{label}</StatLabel>
    </StatCard>
  );
};

export const About = (): React.ReactElement => {
  const { t } = useTranslation();
  const { frameRef, objectPosition } = useAvatarPortraitObjectPosition();
  const {
    section,
    title,
    stagger,
    item,
    viewport,
  } = useScrollMotion();

  return (
    <PageContainer>
      <PageHeader>
        <SectionEyebrow>{t('home.sections.about.eyebrow')}</SectionEyebrow>
        <PageTitle
          variants={title}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <PageTitleGradient>{t('about.title')}</PageTitleGradient>
        </PageTitle>
        <PageSubtitle
          variants={section}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {t('about.subtitle')}
        </PageSubtitle>
      </PageHeader>

      <IntroSection
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <Avatar
          ref={frameRef}
          variants={item}
          aria-label={t('home.hero.portraitAlt')}
        >
          <AvatarPortraitPhoto
            src={publicAssetUrl('avatar.png')}
            alt=""
            $objectPosition={objectPosition}
          />
        </Avatar>
        <IntroContent>
          <motion.h2 variants={item}>
            {t('about.intro.title')}
          </motion.h2>
          <IntroLead variants={item}>
            {t('about.intro.lead')}
          </IntroLead>
          <IntroHighlight variants={item}>
            {t('about.intro.highlight')}
          </IntroHighlight>
          <IntroImpact variants={item}>
            {t('about.intro.impact')}
          </IntroImpact>
        </IntroContent>
      </IntroSection>

      <StatsGrid
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <StatCounter target={3} suffix="+" label={t('about.stats.experience')} />
        <StatMetric
          value={t('about.stats.testing.value')}
          label={t('about.stats.testing.label')}
        />
        <StatCounter target={400} suffix="+" label={t('about.stats.certifiedHours')} />
      </StatsGrid>

      <ExperienceSection
        variants={section}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <ExperienceSectionHeader
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <SectionEyebrow>{t('about.experience.eyebrow')}</SectionEyebrow>
          <ExperienceSectionTitle>{t('about.superior.sectionTitle')}</ExperienceSectionTitle>
        </ExperienceSectionHeader>
        <ExperienceTimelineWrap>
          <ExperienceTimeline
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <ExperienceCard variants={item} $isActive>
              <ExperienceNode $isActive aria-hidden />
              <ExperienceCardBody $isActive>
                <ExperienceCardHeader>
                  <ExperienceCardTitle>{t('about.superior.title')}</ExperienceCardTitle>
                  <ExperienceCardPeriod>{t('about.superior.period')}</ExperienceCardPeriod>
                </ExperienceCardHeader>
                <ExperienceCardRole>{t('about.superior.role')}</ExperienceCardRole>
                <ExperienceCardSummary>{t('about.superior.summary')}</ExperienceCardSummary>
                <ExperienceLogStream
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                >
                  {SUPERIOR_LOG_KEYS.map((logKey: string, index: number) => (
                    <ExperienceLogEntry key={logKey} variants={item}>
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
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div variants={item}>
          <SectionTitle>{t('about.philosophy.title')}</SectionTitle>
        </motion.div>
        <PhilosophyCard variants={item}>
          <p>
            &ldquo;
            {t('about.philosophy.description')}
            &rdquo;
          </p>
        </PhilosophyCard>
      </PhilosophySection>

      <Section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div variants={item}>
          <SectionTitle>{t('about.education.title')}</SectionTitle>
        </motion.div>
        <EducationCard variants={item}>
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
