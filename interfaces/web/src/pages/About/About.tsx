/**
 * About page component displaying personal information and stats.
 */

// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Styles
import {
  staggerContainer,
  staggerItem,
  sectionReveal,
} from '../../styles/animations';

// Components
import { publicAssetUrl } from '../../config/env';
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
} from './About.style';

/**
 * About page with personal introduction, stats, philosophy, and education.
 */
export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <PageTitle
        variants={sectionReveal}
        initial="initial"
        animate="animate"
      >
        {t('about.title')}
      </PageTitle>

      <IntroSection
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <Avatar
          variants={staggerItem}
          whileHover={{ scale: 1.03 }}
        >
          <img
            src={publicAssetUrl('avatar.png')}
            alt="Vinicius"
          />
        </Avatar>
        <IntroContent>
          <motion.h2 variants={staggerItem}>
            {t('about.intro.title')}
          </motion.h2>
          <motion.p variants={staggerItem}>
            {t('about.intro.description')}
          </motion.p>
        </IntroContent>
      </IntroSection>

      <StatsGrid
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <StatCard variants={staggerItem} whileHover={{ y: -5 }}>
          <StatNumber>3+</StatNumber>
          <StatLabel>{t('about.stats.experience')}</StatLabel>
        </StatCard>
        <StatCard variants={staggerItem} whileHover={{ y: -5 }}>
          <StatNumber>7</StatNumber>
          <StatLabel>{t('about.stats.certificates')}</StatLabel>
        </StatCard>
        <StatCard variants={staggerItem} whileHover={{ y: -5 }}>
          <StatNumber>10+</StatNumber>
          <StatLabel>{t('about.stats.technologies')}</StatLabel>
        </StatCard>
      </StatsGrid>

      <PhilosophySection
        variants={sectionReveal}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <SectionTitle>{t('about.philosophy.title')}</SectionTitle>
        <PhilosophyCard>
          <p>"{t('about.philosophy.description')}"</p>
        </PhilosophyCard>
      </PhilosophySection>

      <Section
        variants={sectionReveal}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
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
