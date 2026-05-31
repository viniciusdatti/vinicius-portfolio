// Core
import React, {
  useMemo,
  useState,
  useCallback,
} from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import {
  useProjects,
  usePageMeta,
  PageMetaRoute,
} from '../../hooks';
import { useScrollMotion } from '../../hooks/useScrollMotion';

// Layout
import { PageSectionReveal } from '../../components/PageSectionReveal';
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
} from '../../styles/pageLayout.style';

// Components
import {
  ProjectShowcaseGrid,
  ProjectCaseStudyContent,
} from '../../components/ProjectShowcase';
import { Drawer } from '../../components/showcase';

// Styles
import {
  Toolbar,
  SearchInput,
  DrawerCaseBody,
  ErrorMessage,
  RetryButton,
  EmptyMessage,
  LoadingMessage,
  StudiesDivider,
  StudiesDividerLine,
  StudiesSectionLabel,
  StudiesEyebrow,
  StudiesTitle,
  StudiesDescription,
} from './Projects.style';

// Types
import { Project } from '../../data/types';
import { Language } from '../../types';
import { PageSectionRevealMode } from '../../components/PageSectionReveal/PageSectionReveal.types';
import { filterProjectsBySearch, partitionProjectsByTier } from '../../domain/projects';

// Lib
import { isPortugueseLocale, resolveLanguage } from '../../lib/i18n';

interface ProjectsPageState {
  search: string;
  selectedProject: Project | null;
}

const initialState: ProjectsPageState = {
  search: '',
  selectedProject: null,
};

export const Projects = (): React.ReactElement => {
  usePageMeta(PageMetaRoute.Projects);
  const { t, i18n } = useTranslation();
  const {
    data: projects = [], isLoading, isError, refetch,
  } = useProjects();
  const [state, setState] = useState<ProjectsPageState>(initialState);
  const scrollMotion = useScrollMotion();
  const isPt: boolean = isPortugueseLocale(i18n.language);
  const currentLanguage: Language = resolveLanguage(i18n.language);

  const filteredProjects = useMemo(
    () => filterProjectsBySearch(projects, state.search, isPt),
    [projects, state.search, isPt],
  );

  // Split filtered projects into featured (primary) and studies (secondary)
  const { featured: featuredProjects, studies: studyProjects } = useMemo(
    () => partitionProjectsByTier(filteredProjects),
    [filteredProjects],
  );

  const projectTitle = useCallback(
    (p: Project): string => (isPt ? p.title_pt ?? p.title : p.title),
    [isPt],
  );

  const handleCloseDrawer = useCallback((): void => {
    setState((prev: ProjectsPageState) => ({ ...prev, selectedProject: null }));
  }, []);

  const handleSelectProject = useCallback((project: Project): void => {
    setState((prev: ProjectsPageState) => ({ ...prev, selectedProject: project }));
  }, []);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setState((prev: ProjectsPageState) => ({ ...prev, search: event.target.value }));
  }, []);

  const renderFeaturedSection = (): React.ReactNode => {
    if (featuredProjects.length === 0) {
      return null;
    }
    return (
      <ProjectShowcaseGrid
        projects={featuredProjects}
        language={currentLanguage}
        onSelectProject={handleSelectProject}
      />
    );
  };

  const renderStudiesSection = (): React.ReactNode => {
    if (studyProjects.length === 0) {
      return null;
    }
    return (
      <>
        <StudiesDivider
          variants={scrollMotion.section}
          initial="hidden"
          whileInView="visible"
          viewport={scrollMotion.viewport}
        >
          <StudiesDividerLine />
          <StudiesSectionLabel>
            <StudiesEyebrow>{t('projects.studies.eyebrow')}</StudiesEyebrow>
            <StudiesTitle>{t('projects.studies.title')}</StudiesTitle>
            <StudiesDescription>{t('projects.studies.description')}</StudiesDescription>
          </StudiesSectionLabel>
          <StudiesDividerLine />
        </StudiesDivider>

        <ProjectShowcaseGrid
          projects={studyProjects}
          language={currentLanguage}
          compact
          onSelectProject={handleSelectProject}
        />
      </>
    );
  };

  const renderShowcaseContent = (): React.ReactNode => {
    if (isLoading) {
      return <LoadingMessage>{t('projects.loading')}</LoadingMessage>;
    }

    const hasAny = featuredProjects.length > 0 || studyProjects.length > 0;
    if (!hasAny) {
      return <EmptyMessage>{t('projects.empty')}</EmptyMessage>;
    }

    return (
      <>
        {renderFeaturedSection()}
        {renderStudiesSection()}
      </>
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
          value={state.search}
          onChange={handleSearchChange}
          aria-label={t('projects.searchPlaceholder')}
        />
      </Toolbar>

      <PageSectionReveal mode={PageSectionRevealMode.Section}>
        <PageSectionSpacious>
          {renderShowcaseContent()}
        </PageSectionSpacious>
      </PageSectionReveal>

      <Drawer
        open={state.selectedProject != null}
        onClose={handleCloseDrawer}
        title={state.selectedProject ? projectTitle(state.selectedProject) : ''}
      >
        {state.selectedProject != null && (
          <DrawerCaseBody>
            <ProjectCaseStudyContent
              project={state.selectedProject}
              language={currentLanguage}
            />
          </DrawerCaseBody>
        )}
      </Drawer>
    </PageContainerWide>
  );
};
