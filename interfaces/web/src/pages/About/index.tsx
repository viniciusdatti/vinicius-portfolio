// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styles
import { staggerContainer, staggerItem, fadeInUp } from '../../styles/animations';

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const PageTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
`;

const Section = styled(motion.section)`
  margin-bottom: ${({ theme }) => theme.spacing.section};
`;

const IntroSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Avatar = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary}, 
    ${({ theme }) => theme.colors.primaryHover}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: white;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 150px;
    height: 150px;
    font-size: 3rem;
  }
`;

const IntroContent = styled.div`
  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize.xxl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  }
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const PhilosophyCard = styled(motion.div)`
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary}10, 
    ${({ theme }) => theme.colors.surface}
  );
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-style: italic;
  }
`;

const EducationCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const EducationMain = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;

const EducationIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const EducationInfo = styled.div`
  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    margin: 0;
  }
`;

const EducationStatus = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.success}20;
  color: ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const ComplementaryText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <PageTitle
        variants={fadeInUp}
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
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          VD
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

      <Section
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <SectionTitle>{t('about.philosophy.title')}</SectionTitle>
        <PhilosophyCard>
          <p>"{t('about.philosophy.description')}"</p>
        </PhilosophyCard>
      </Section>

      <Section
        variants={fadeInUp}
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

export default About;
