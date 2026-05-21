/**
 * @fileoverview Home page component for the portfolio website.
 * Displays hero section, skills preview, live lab preview, projects grid,
 * and contact call-to-action sections.
 */

// Core
import React, { useCallback } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// Types
import type { Project } from '../../data/types';
import { Language } from '../../types';

// Components
import { publicAssetUrl } from '../../config/env';
import { Hero } from '../../components/Hero';
import { RealtimePresence } from '../../components/home/RealtimePresence';
import { LiveLabPreviewMock } from '../../components/home/LiveLabPreviewMock';
import { ProjectShowcaseGrid } from '../../components/ProjectShowcase';
import { ProjectCardSkeleton } from '../../components/ProjectCardSkeleton';
import { useProjects } from '../../hooks';
import {
  editorialStaggerContainer,
  editorialStaggerItem,
  fadeInUp,
} from '../../styles/animations';
import {
  Section,
  SectionTitle,
  SectionLead,
  SectionEyebrow,
  SectionIndex,
  SectionStory,
  ProjectsSectionHeader,
  ProjectsSectionMain,
  EditorialHeaderAside,
  ViewAllProjectsLink,
  SkeletonGrid,
  ErrorMessage,
  RetryButton,
  SkillsPreviewSection,
  SkillsPreviewDescription,
  SkillsEditorialLayout,
  SkillsEditorialIntro,
  SkillsGrid,
  SkillIcon,
  ViewAllLinkWrapper,
  ViewAllLink,
  LiveLabSection,
  LiveLabCard,
  LiveLabCopy,
  LiveLabVisual,
  LiveBadge,
  LiveLabSectionTitle,
  LiveLabDescription,
  CTAButton,
  ContactCtaSection,
  ContactCtaInner,
  ContactCtaDescription,
  ContactCtaActions,
} from './Home.style';

/** Represents a skill item with name and icon URL. */
interface SkillItem {
  name: string;
  icon: string;
}

/** Preview skills displayed on the home page. Icons are local so they work offline. */
const PREVIEW_SKILLS: SkillItem[] = [
  { name: 'React', icon: publicAssetUrl('icons/react.svg') },
  { name: 'TypeScript', icon: publicAssetUrl('icons/typescript.svg') },
  { name: 'Python', icon: publicAssetUrl('icons/python.svg') },
  { name: 'FastAPI', icon: publicAssetUrl('icons/fastapi.svg') },
  { name: 'PostgreSQL', icon: publicAssetUrl('icons/postgresql.svg') },
  { name: 'Docker', icon: publicAssetUrl('icons/docker.svg') },
];

/**
 * Home page component displaying the main landing page content.
 * Includes hero, skills preview, live lab preview, projects, and contact CTA.
 */
export const Home: React.FC = (): React.ReactElement => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { data: projects, isLoading, isError, refetch } = useProjects();

  /* ***********************************************************************************************
  **************************************** DERIVED STATE ********************************************
  *********************************************************************************************** */

  const currentLanguage: Language =
    i18n.language?.startsWith('pt') ? Language.Pt : Language.En;

  /* ***********************************************************************************************
  ****************************************** METHODS ***********************************************
  *********************************************************************************************** */

  const handleSelectProject = useCallback(
    (project: Project): void => {
      if (project.demo_url) {
        window.open(project.demo_url, '_blank', 'noopener,noreferrer');
        return;
      }
      navigate('/projects');
    },
    [navigate]
  );

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

    const list = (projects || []).slice(0, 4);
    return (
      <ProjectShowcaseGrid
        projects={list}
        language={currentLanguage}
        compact
        onSelectProject={handleSelectProject}
      />
    );
  };

  /* ***********************************************************************************************
  *************************************** COMPONENT HANDLING ***************************************
  *********************************************************************************************** */

  return (
    <>
      <Hero />

      <RealtimePresence />

      <LiveLabSection id="workspace-modules">
        <SectionEyebrow>{t('home.sections.liveLab.eyebrow')}</SectionEyebrow>
        <LiveLabSectionTitle>{t('home.liveLabPreview.title')}</LiveLabSectionTitle>
        <LiveLabCard
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <LiveLabCopy>
            <LiveBadge>{t('home.liveLabPreview.badge')}</LiveBadge>
            <LiveLabDescription>
              {t('home.liveLabPreview.description')}
            </LiveLabDescription>
            <CTAButton to="/live-lab">
              {t('home.liveLabPreview.cta')}
            </CTAButton>
          </LiveLabCopy>
          <LiveLabVisual>
            <LiveLabPreviewMock />
          </LiveLabVisual>
        </LiveLabCard>
      </LiveLabSection>

      <SkillsPreviewSection>
        <SkillsEditorialLayout>
          <SkillsEditorialIntro>
            <SectionEyebrow>{t('home.sections.skills.eyebrow')}</SectionEyebrow>
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
            <ViewAllLinkWrapper>
              <ViewAllLink to="/skills">
                {t('home.skillsPreview.viewAll')} →
              </ViewAllLink>
            </ViewAllLinkWrapper>
          </SkillsEditorialIntro>
          <SkillsGrid
            variants={editorialStaggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
          >
            {PREVIEW_SKILLS.map((skill: SkillItem) => (
              <SkillIcon key={skill.name} variants={editorialStaggerItem}>
                <img src={skill.icon} alt={skill.name} />
                <span>{skill.name}</span>
              </SkillIcon>
            ))}
          </SkillsGrid>
        </SkillsEditorialLayout>
      </SkillsPreviewSection>

      <Section id="projetos">
        <ProjectsSectionHeader>
          <SectionIndex>{t('home.sections.projects.index')}</SectionIndex>
          <ProjectsSectionMain>
            <SectionEyebrow>{t('home.sections.projects.eyebrow')}</SectionEyebrow>
            <SectionTitle
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {t('projects.sectionTitle')}
            </SectionTitle>
            <SectionLead>{t('projects.sectionLead')}</SectionLead>
          </ProjectsSectionMain>
          <EditorialHeaderAside>
            <SectionStory>{t('home.sections.projects.story')}</SectionStory>
            <ViewAllProjectsLink to="/projects">
              {t('home.sections.projects.viewAll')} →
            </ViewAllProjectsLink>
          </EditorialHeaderAside>
        </ProjectsSectionHeader>
        {renderProjects()}
      </Section>

      <ContactCtaSection>
        <ContactCtaInner
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div>
            <SectionEyebrow>{t('home.sections.contact.eyebrow')}</SectionEyebrow>
            <SectionTitle>{t('home.contactCta.title')}</SectionTitle>
            <ContactCtaDescription>
              {t('home.contactCta.description')}
            </ContactCtaDescription>
          </div>
          <ContactCtaActions>
            <CTAButton to="/contact">
              {t('home.contactCta.cta')}
            </CTAButton>
          </ContactCtaActions>
        </ContactCtaInner>
      </ContactCtaSection>
    </>
  );
};
