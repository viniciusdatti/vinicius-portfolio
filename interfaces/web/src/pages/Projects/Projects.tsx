/**
 * @fileoverview Projects page — premium product showcase (bento grid + case drawer).
 */

// Core
import React, { useMemo, useState, useCallback } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { Project, Technology } from '@/data/types';
import { Language } from '@/types';

// Hooks
import { useProjects } from '@/hooks';

// Components
import { FilterBar, Drawer } from '@/components/Showcase';
import {
  ProjectShowcaseGrid,
  ProjectCaseStudyContent,
} from '@/components/ProjectShowcase';
import { useScrollMotion } from '@/hooks/useScrollMotion';
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

/* *************************************************************************************************
 ********************************************* METHODS *********************************************
 ************************************************************************************************ */

const getUniqueTechnologies = (projects: Project[]): Technology[] => {
  const seen = new Map<string, Technology>();
  projects.forEach((p: Project) => {
    p.technologies.forEach((tech: Technology) => {
      if (!seen.has(tech.slug)) {
        seen.set(tech.slug, tech);
      }
    });
  });
  return Array.from(seen.values()).sort(
    (a: Technology, b: Technology) => a.name.localeCompare(b.name),
  );
};

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

export const Projects = (): React.ReactElement => {
  const { t, i18n } = useTranslation();
  const {
    data: projects = [], isLoading, isError, refetch,
  } = useProjects();
  const [techFilter, setTechFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const motion = useScrollMotion();
  const viewport = { once: true, margin: '-60px' as const };

  const isPt: boolean = i18n.language?.startsWith('pt') ?? false;
  const currentLanguage: Language = isPt ? Language.Pt : Language.En;

  const technologies: Technology[] = useMemo(
    () => getUniqueTechnologies(projects),
    [projects],
  );

  const filters = useMemo(() => {
    const allLabel: string = t('projects.filters.all');
    const items: { key: string; label: string; count: number }[] = [
      { key: 'all', label: allLabel, count: projects.length },
    ];
    technologies.forEach((tech: Technology) => {
      const count: number = projects.filter(
        (p: Project) => p.technologies.some((item: Technology) => item.slug === tech.slug),
      ).length;
      items.push({ key: tech.slug, label: tech.name, count });
    });
    return items;
  }, [projects, technologies, t]);

  const filteredProjects = useMemo(() => {
    let list: Project[] = projects;
    if (techFilter !== 'all') {
      list = list.filter(
        (p: Project) => p.technologies.some((item: Technology) => item.slug === techFilter),
      );
    }
    const q: string = search.trim().toLowerCase();
    if (q) {
      const title = (p: Project): string => (isPt ? p.title_pt ?? p.title : p.title).toLowerCase();
      list = list.filter((p: Project) => title(p).includes(q));
    }
    return list;
  }, [projects, techFilter, search, isPt]);

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
            <PageTitle>
              <PageTitleGradient>{t('projects.title')}</PageTitleGradient>
            </PageTitle>
            <PageSubtitle>{t('projects.subtitle')}</PageSubtitle>
          </PageHeaderMain>
        </PageHeaderEditorial>
        <PageSectionSpacious>
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
            variants={motion.title}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <PageTitleGradient>{t('projects.title')}</PageTitleGradient>
          </PageTitle>
        </PageHeaderMain>
        <PageHeaderAside>
          <PageLead
            variants={motion.section}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {t('projects.showcase.lead')}
          </PageLead>
        </PageHeaderAside>
      </PageHeaderEditorial>

      <Toolbar>
        <FilterBar
          filters={filters.map((f) => ({
            key: f.key,
            label: f.label,
            count: f.count,
          }))}
          selectedKey={techFilter}
          onSelect={setTechFilter}
        />
        <SearchInput
          type="search"
          placeholder={t('projects.searchPlaceholder')}
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSearch(e.target.value)}
          aria-label={t('projects.searchPlaceholder')}
        />
      </Toolbar>

      <PageSectionSpacious>
        {renderShowcaseContent()}
      </PageSectionSpacious>

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
