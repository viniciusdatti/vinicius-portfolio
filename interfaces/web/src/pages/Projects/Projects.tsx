/**
 * @fileoverview Projects page — premium product showcase (bento grid + case drawer).
 */

// Core
import React, { useMemo, useState, useCallback } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { Project } from '../../data/types';
import type { Technology } from '../../data/types';
import { Language } from '../../types';

// Components
import { FilterBar, Drawer } from '../../components/showcase';
import { ProjectShowcaseGrid } from '../../components/ProjectShowcase';
import { useProjects } from '../../hooks';
import { resolveTechnologyCapabilityLabel } from '../../utils/projectCaseCopy';

// Styles
import { fadeInUp } from '../../styles/animations';
import {
  PageContainer,
  PageHeader,
  PageHeaderMain,
  PageHeaderAside,
  PageEyebrow,
  PageTitle,
  PageSubtitle,
  Toolbar,
  SearchInput,
  ShowcaseSection,
  DrawerDetailRow,
  DrawerDetailLabel,
  DrawerDetailValue,
  DrawerLinks,
  DrawerLink,
  TechList,
  TechTag,
  ErrorMessage,
  RetryButton,
  EmptyMessage,
  LoadingMessage,
} from './Projects.style';

/* ***********************************************************************************************
 ****************************************** METHODS ***********************************************
 *********************************************************************************************** */

const getUniqueTechnologies = (projects: Project[]): Technology[] => {
  const seen = new Map<string, Technology>();
  projects.forEach((p: Project) => {
    p.technologies.forEach((tech: Technology) => {
      if (!seen.has(tech.slug)) {
        seen.set(tech.slug, tech);
      }
    });
  });
  return Array.from(seen.values()).sort((a: Technology, b: Technology) =>
    a.name.localeCompare(b.name)
  );
};

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

export const Projects: React.FC = (): React.ReactElement => {
  const { t, i18n } = useTranslation();
  const { data: projects = [], isLoading, isError, refetch } = useProjects();
  const [techFilter, setTechFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isPt: boolean = i18n.language?.startsWith('pt') ?? false;
  const currentLanguage: Language = isPt ? Language.Pt : Language.En;

  const technologies: Technology[] = useMemo(
    () => getUniqueTechnologies(projects),
    [projects]
  );

  const filters = useMemo(() => {
    const allLabel: string = t('projects.filters.all');
    const items: { key: string; label: string; count: number }[] = [
      { key: 'all', label: allLabel, count: projects.length },
    ];
    technologies.forEach((tech: Technology) => {
      const count: number = projects.filter((p: Project) =>
        p.technologies.some((item: Technology) => item.slug === tech.slug)
      ).length;
      items.push({ key: tech.slug, label: tech.name, count });
    });
    return items;
  }, [projects, technologies, t]);

  const filteredProjects = useMemo(() => {
    let list: Project[] = projects;
    if (techFilter !== 'all') {
      list = list.filter((p: Project) =>
        p.technologies.some((item: Technology) => item.slug === techFilter)
      );
    }
    const q: string = search.trim().toLowerCase();
    if (q) {
      const title = (p: Project): string =>
        (isPt ? p.title_pt ?? p.title : p.title).toLowerCase();
      list = list.filter((p: Project) => title(p).includes(q));
    }
    return list;
  }, [projects, techFilter, search, isPt]);

  const projectTitle = useCallback(
    (p: Project): string => (isPt ? p.title_pt ?? p.title : p.title),
    [isPt]
  );

  const projectDescription = useCallback(
    (p: Project): string | null =>
      isPt ? p.description_pt ?? p.description : p.description,
    [isPt]
  );

  const handleCloseDrawer = useCallback((): void => {
    setSelectedProject(null);
  }, []);

  const handleSelectProject = useCallback((project: Project): void => {
    setSelectedProject(project);
  }, []);

  if (isError) {
    return (
      <PageContainer>
        <PageHeader>
          <PageHeaderMain>
            <PageTitle>{t('projects.title')}</PageTitle>
            <PageSubtitle>{t('projects.subtitle')}</PageSubtitle>
          </PageHeaderMain>
        </PageHeader>
        <ShowcaseSection>
          <ErrorMessage>{t('projects.error')}</ErrorMessage>
          <RetryButton type="button" onClick={() => refetch()}>
            {t('common.retry')}
          </RetryButton>
        </ShowcaseSection>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderMain>
          <PageEyebrow>{t('projects.showcase.eyebrow')}</PageEyebrow>
          <PageTitle
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            {t('projects.title')}
          </PageTitle>
        </PageHeaderMain>
        <PageHeaderAside>
          <PageSubtitle
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            {t('projects.showcase.lead')}
          </PageSubtitle>
        </PageHeaderAside>
      </PageHeader>

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setSearch(e.target.value)
          }
          aria-label={t('projects.searchPlaceholder')}
        />
      </Toolbar>

      <ShowcaseSection>
        {isLoading ? (
          <LoadingMessage>{t('projects.loading')}</LoadingMessage>
        ) : filteredProjects.length === 0 ? (
          <EmptyMessage>{t('projects.empty')}</EmptyMessage>
        ) : (
          <ProjectShowcaseGrid
            projects={filteredProjects}
            language={currentLanguage}
            onSelectProject={handleSelectProject}
          />
        )}
      </ShowcaseSection>

      <Drawer
        open={selectedProject != null}
        onClose={handleCloseDrawer}
        title={selectedProject ? projectTitle(selectedProject) : ''}
      >
        {selectedProject != null && (
          <>
            {projectDescription(selectedProject) && (
              <DrawerDetailRow>
                <DrawerDetailLabel>
                  {t('projects.drawer.description')}
                </DrawerDetailLabel>
                <DrawerDetailValue>
                  {projectDescription(selectedProject)}
                </DrawerDetailValue>
              </DrawerDetailRow>
            )}
            <DrawerDetailRow>
              <DrawerDetailLabel>
                {t('projects.table.technologies')}
              </DrawerDetailLabel>
              <DrawerDetailValue>
                <TechList>
                  {selectedProject.technologies.map((tech: Technology) => (
                    <TechTag key={tech.id}>
                      {resolveTechnologyCapabilityLabel(tech, t)}
                    </TechTag>
                  ))}
                </TechList>
              </DrawerDetailValue>
            </DrawerDetailRow>
            <DrawerLinks>
              <DrawerLink
                href={selectedProject.repository_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('projects.drawer.repository')}
              </DrawerLink>
              {selectedProject.demo_url && (
                <DrawerLink
                  href={selectedProject.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('projects.drawer.demo')}
                </DrawerLink>
              )}
            </DrawerLinks>
          </>
        )}
      </Drawer>
    </PageContainer>
  );
};
