// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Components
import { Hero } from '../../components/Hero';
import { ProjectGrid } from '../../components/ProjectGrid';
import { ProjectCardSkeleton } from '../../components/ProjectCardSkeleton';

// Hooks
import { useProjects } from '../../hooks';

// Styles
import { staggerContainer, staggerItem, fadeInUp } from '../../styles/animations';

// Styled Components
const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const RetryButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

// Skills Preview Section
const SkillsPreviewSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  max-width: 100%;
  
  > div {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const SkillIcon = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: border-color ${({ theme }) => theme.transitions.fast},
              transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-4px);
  }

  img {
    width: 40px;
    height: 40px;
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  &:hover {
    text-decoration: underline;
  }
`;

// Live Lab Preview
const LiveLabCard = styled(motion.div)`
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary}15, 
    ${({ theme }) => theme.colors.surface}
  );
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const LiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.success};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background-color: white;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const LiveLabTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const LiveLabDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: background-color ${({ theme }) => theme.transitions.fast},
              transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
    color: white;
  }
`;

// Skills data
const previewSkills = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
];

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { data: projects, isLoading, isError, refetch } = useProjects();

  const currentLanguage = i18n.language?.startsWith('pt') ? 'pt' : 'en';

  const renderProjects = () => {
    if (isLoading) {
      return (
        <SkeletonGrid>
          {[1, 2, 3].map((i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </SkeletonGrid>
      );
    }

    if (isError) {
      return (
        <ErrorMessage>
          <p>{t('home.projectsError')}</p>
          <RetryButton onClick={() => refetch()}>
            {t('common.retry')}
          </RetryButton>
        </ErrorMessage>
      );
    }

    return <ProjectGrid projects={projects || []} language={currentLanguage} />;
  };

  return (
    <>
      <Hero />

      {/* Skills Preview */}
      <SkillsPreviewSection>
        <div>
          <SectionTitle
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {t('home.skillsPreview.title')}
          </SectionTitle>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            {t('home.skillsPreview.description')}
          </p>
          <SkillsGrid
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {previewSkills.map((skill) => (
              <SkillIcon
                key={skill.name}
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
              >
                <img src={skill.icon} alt={skill.name} />
                <span>{skill.name}</span>
              </SkillIcon>
            ))}
          </SkillsGrid>
          <div style={{ textAlign: 'center' }}>
            <ViewAllLink to="/skills">
              {t('home.skillsPreview.viewAll')} →
            </ViewAllLink>
          </div>
        </div>
      </SkillsPreviewSection>

      {/* Live Lab Preview */}
      <Section>
        <LiveLabCard
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <LiveBadge>{t('home.liveLabPreview.badge')}</LiveBadge>
          <LiveLabTitle>{t('home.liveLabPreview.title')}</LiveLabTitle>
          <LiveLabDescription>
            {t('home.liveLabPreview.description')}
          </LiveLabDescription>
          <CTAButton to="/live-lab">
            {t('home.liveLabPreview.cta')}
          </CTAButton>
        </LiveLabCard>
      </Section>

      {/* Projects */}
      <Section id="projetos">
        <SectionTitle
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {t('projects.sectionTitle')}
        </SectionTitle>
        {renderProjects()}
      </Section>

      {/* Contact CTA */}
      <Section style={{ textAlign: 'center' }}>
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <SectionTitle>{t('home.contactCta.title')}</SectionTitle>
          <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
            {t('home.contactCta.description')}
          </p>
          <CTAButton to="/contact">
            {t('home.contactCta.cta')}
          </CTAButton>
        </motion.div>
      </Section>
    </>
  );
};

export default Home;
