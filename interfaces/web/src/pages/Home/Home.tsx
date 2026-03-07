/**
 * @fileoverview Home page component for the portfolio website.
 * Displays hero section, skills preview, live lab preview, projects grid,
 * and contact call-to-action sections.
 */

// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Types
import type { Language } from '../../types';

// Components
import { Hero } from '../../components/Hero';
import { ProjectGrid } from '../../components/ProjectGrid';
import { ProjectCardSkeleton } from '../../components/ProjectCardSkeleton';
import { useProjects } from '../../hooks';
import { staggerContainer, staggerItem, fadeInUp } from '../../styles/animations';
import {
  Section,
  SectionTitle,
  SkeletonGrid,
  ErrorMessage,
  RetryButton,
  SkillsPreviewSection,
  SkillsPreviewDescription,
  SkillsGrid,
  SkillIcon,
  ViewAllLinkWrapper,
  ViewAllLink,
  LiveLabCard,
  LiveBadge,
  LiveLabTitle,
  LiveLabDescription,
  CTAButton,
  ContactCtaSection,
  ContactCtaDescription,
} from './Home.style';

/** Represents a skill item with name and icon URL. */
interface SkillItem {
  name: string;
  icon: string;
}

/** Preview skills displayed on the home page. */
const PREVIEW_SKILLS: SkillItem[] = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
];

/**
 * Home page component displaying the main landing page content.
 * Includes hero, skills preview, live lab preview, projects, and contact CTA.
 */
export const Home: React.FC = (): React.ReactElement => {
  const { t, i18n } = useTranslation();
  const { data: projects, isLoading, isError, refetch } = useProjects();

  /* ***********************************************************************************************
   **************************************** DERIVED STATE ********************************************
   *********************************************************************************************** */

  const currentLanguage: Language =
    i18n.language?.startsWith('pt') ? Language.Pt : Language.En;

  /* ***********************************************************************************************
   ****************************************** METHODS ***********************************************
   *********************************************************************************************** */

  /** Renders the projects section content based on loading/error state. */
  const renderProjects = (): React.ReactElement => {
    if (isLoading) {
      return (
        <SkeletonGrid>
          {[1, 2, 3].map((i: number) => (
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

  /* ***********************************************************************************************
   *************************************** COMPONENT HANDLING **************************************
   *********************************************************************************************** */

  return (
    <>
      <Hero />

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
          <SkillsPreviewDescription>
            {t('home.skillsPreview.description')}
          </SkillsPreviewDescription>
          <SkillsGrid
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {PREVIEW_SKILLS.map((skill: SkillItem) => (
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
          <ViewAllLinkWrapper>
            <ViewAllLink to="/skills">
              {t('home.skillsPreview.viewAll')} →
            </ViewAllLink>
          </ViewAllLinkWrapper>
        </div>
      </SkillsPreviewSection>

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

      <ContactCtaSection>
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <SectionTitle>{t('home.contactCta.title')}</SectionTitle>
          <ContactCtaDescription>
            {t('home.contactCta.description')}
          </ContactCtaDescription>
          <CTAButton to="/contact">
            {t('home.contactCta.cta')}
          </CTAButton>
        </motion.div>
      </ContactCtaSection>
    </>
  );
};
