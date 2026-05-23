/**
 * @fileoverview Projects page — premium product showcase (bento grid + case drawer).
 */

// Core
import React, { useMemo, useState, useCallback } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { Project } from '@/data/types';
import { Language } from '@/types';

// Hooks
import { useProjects } from '@/hooks';
// Components
import { Drawer } from '@/components/Showcase';
import {
  ProjectShowcaseGrid,
  ProjectCaseStudyContent,
} from '@/components/ProjectShowcase';
import { filterProjectsBySearch } from '@/domain/projects';
import { useScrollMotion } from '@/hooks/useScrollMotion';
import { PageSectionReveal } from '@/components/PageSectionReveal';
import { PageSectionRevealMode } from '@/components/PageSectionReveal/PageSectionReveal.types';
import {
  PageContainerWide,
  PageHeaderEditorial,
  PageHeaderMain,
  PageHeaderAside,
  SectionEyebrowAnimated,
  PageTitle,
  PageTitleGradient,
  PageSubtitle,
  PageLead,
  PageSectionSpacious,
} from '@/styles/pageLayout.style';

// View
import {
  Toolbar,
  SearchInput,
  DrawerCaseBody,
  ErrorMessage,
  RetryButton,
  EmptyMessage,
  LoadingMessage,
} from '@/pages/Projects/Projects.style';

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

export const Projects = (): React.ReactElement => {
  const { t, i18n } = useTranslation();
  const {
    data: projects = [], isLoading, isError, refetch,
  } = useProjects();
  const [search, setSearch] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollMotion = useScrollMotion();
  const isPt: boolean = i18n.language?.startsWith('pt') ?? false;
  const currentLanguage: Language = isPt ? Language.Pt : Language.En;

  const filteredProjects = useMemo(
    () => filterProjectsBySearch(projects, search, isPt),
    [projects, search, isPt],
  );

  const projectTitle = useCallback(
    (p: Project): string => (isPt ? p.title_pt ?? p.title : p.title),
    [isPt],
  );

  const handleCloseDrawer = useCallback((): void => {
    setSelectedProject(null);
  }, []);

  const handleSelectProject = useCallback((project: Project): void => {
    setSelectedProject(project);
  }, []);

  const renderShowcaseContent = (): React.ReactNode => {
    if (isLoading) {
      return <LoadingMessage>{t('projects.loading')}</LoadingMessage>;
    }
    if (filteredProjects.length === 0) {
      return <EmptyMessage>{t('projects.empty')}</EmptyMessage>;
    }
    return (
      <ProjectShowcaseGrid
        projects={filteredProjects}
        language={currentLanguage}
        onSelectProject={handleSelectProject}
      />
    );
  };

  if (isError) {
    return (
      <PageContainerWide>
        <PageHeaderEditorial>
          <PageHeaderMain>
            <PageTitle
              variants={scrollMotion.title}
              initial="hidden"
              whileInView="visible"
              viewport={scrollMotion.viewport}
            >
              <PageTitleGradient>{t('projects.title')}</PageTitleGradient>
            </PageTitle>
            <PageSubtitle
              variants={scrollMotion.section}
              initial="hidden"
              whileInView="visible"
              viewport={scrollMotion.viewport}
            >
              {t('projects.subtitle')}
            </PageSubtitle>
          </PageHeaderMain>
        </PageHeaderEditorial>
        <PageSectionSpacious
          variants={scrollMotion.section}
          initial="hidden"
          whileInView="visible"
          viewport={scrollMotion.viewport}
        >
          <ErrorMessage>{t('projects.error')}</ErrorMessage>
          <RetryButton type="button" onClick={() => refetch()}>
            {t('common.retry')}
          </RetryButton>
        </PageSectionSpacious>
      </PageContainerWide>
    );
  }

  return (
    <PageContainerWide>
      <PageHeaderEditorial>
        <PageHeaderMain>
          <SectionEyebrowAnimated>{t('projects.showcase.eyebrow')}</SectionEyebrowAnimated>
          <PageTitle
            variants={scrollMotion.title}
            initial="hidden"
            whileInView="visible"
            viewport={scrollMotion.viewport}
          >
            <PageTitleGradient>{t('projects.title')}</PageTitleGradient>
          </PageTitle>
        </PageHeaderMain>
        <PageHeaderAside>
          <PageLead
            variants={scrollMotion.section}
            initial="hidden"
            whileInView="visible"
            viewport={scrollMotion.viewport}
          >
            {t('projects.showcase.lead')}
          </PageLead>
        </PageHeaderAside>
      </PageHeaderEditorial>

      <Toolbar
        variants={scrollMotion.section}
        initial="hidden"
        whileInView="visible"
        viewport={scrollMotion.viewport}
      >
        <SearchInput
          type="search"
          placeholder={t('projects.searchPlaceholder')}
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSearch(e.target.value)}
          aria-label={t('projects.searchPlaceholder')}
        />
      </Toolbar>

      <PageSectionReveal mode={PageSectionRevealMode.Section}>
        <PageSectionSpacious>
          {renderShowcaseContent()}
        </PageSectionSpacious>
      </PageSectionReveal>

      <Drawer
        open={selectedProject != null}
        onClose={handleCloseDrawer}
        title={selectedProject ? projectTitle(selectedProject) : ''}
      >
        {selectedProject != null && (
          <DrawerCaseBody>
            <ProjectCaseStudyContent
              project={selectedProject}
              language={currentLanguage}
            />
          </DrawerCaseBody>
        )}
      </Drawer>
    </PageContainerWide>
  );
};
