/**
 * @fileoverview Projects page. Table + filter + drawer with real API data (v2-style).
 */

// Core
import React, { useMemo, useState, useCallback } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { Project } from '../../data/types';
import type { Technology } from '../../data/types';

// Components
import { FilterBar, Drawer } from '../../components/showcase';
import { useProjects } from '../../hooks';

// Styles
import { fadeInUp } from '../../styles/animations';
import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  Section,
  SectionTitle,
  TableWrapper,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  SearchInput,
  DrawerDetailRow,
  DrawerDetailLabel,
  DrawerDetailValue,
  DrawerLinks,
  DrawerLink,
  TechList,
  ErrorMessage,
  RetryButton,
  EmptyMessage,
} from './Projects.style';

/**
 * Returns unique technologies from projects, sorted by name.
 */
function getUniqueTechnologies(projects: Project[]): Technology[] {
  const seen = new Map<string, Technology>();
  projects.forEach((p) => {
    p.technologies.forEach((t) => {
      if (!seen.has(t.slug)) seen.set(t.slug, t);
    });
  });
  return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Projects page: list with technology filter, search, and detail drawer (real data).
 */
export const Projects: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { data: projects = [], isLoading, isError, refetch } = useProjects();
  const [techFilter, setTechFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isPt: boolean = i18n.language?.startsWith('pt') ?? false;

  const technologies: Technology[] = useMemo(
    () => getUniqueTechnologies(projects),
    [projects]
  );

  const filters = useMemo(() => {
    const allLabel: string = t('projects.filters.all');
    const items: { key: string; label: string; count: number }[] = [
      { key: 'all', label: allLabel, count: projects.length },
    ];
    technologies.forEach((tech) => {
      const count: number = projects.filter((p) =>
        p.technologies.some((t) => t.slug === tech.slug)
      ).length;
      items.push({ key: tech.slug, label: tech.name, count });
    });
    return items;
  }, [projects, technologies, t]);

  const filteredProjects = useMemo(() => {
    let list: Project[] = projects;
    if (techFilter !== 'all') {
      list = list.filter((p) =>
        p.technologies.some((t) => t.slug === techFilter)
      );
    }
    const q = search.trim().toLowerCase();
    if (q) {
      const title = (p: Project): string =>
        (isPt ? p.title_pt ?? p.title : p.title).toLowerCase();
      list = list.filter((p) => title(p).includes(q));
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

  const handleCloseDrawer = useCallback(() => {
    setSelectedProject(null);
  }, []);

  if (isError) {
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle>{t('projects.title')}</PageTitle>
          <PageSubtitle>{t('projects.subtitle')}</PageSubtitle>
        </PageHeader>
        <Section>
          <ErrorMessage>{t('projects.error')}</ErrorMessage>
          <RetryButton type="button" onClick={() => refetch()}>
            {t('common.retry')}
          </RetryButton>
        </Section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {t('projects.title')}
        </PageTitle>
        <PageSubtitle
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {t('projects.subtitle')}
        </PageSubtitle>
      </PageHeader>

      <Section>
        <SectionTitle>{t('projects.sectionList')}</SectionTitle>
        <FilterBar
          filters={filters.map((f) => ({ key: f.key, label: f.label, count: f.count }))}
          selectedKey={techFilter}
          onSelect={setTechFilter}
        />
        <SearchInput
          type="text"
          placeholder={t('projects.searchPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableWrapper>
          <Table>
            <TableHead>
              <tr>
                <TableHeaderCell>{t('projects.table.title')}</TableHeaderCell>
                <TableHeaderCell>{t('projects.table.technologies')}</TableHeaderCell>
              </tr>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={2}>{t('projects.loading')}</TableCell>
                </TableRow>
              ) : filteredProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2}>
                    <EmptyMessage>{t('projects.empty')}</EmptyMessage>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProjects.map((project) => (
                  <TableRow
                    key={project.id}
                    $clickable
                    onClick={() => setSelectedProject(project)}
                  >
                    <TableCell>{projectTitle(project)}</TableCell>
                    <TableCell>
                      <TechList>
                        {project.technologies.map((t) => t.name).join(', ')}
                      </TechList>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableWrapper>
      </Section>

      <Drawer
        open={selectedProject != null}
        onClose={handleCloseDrawer}
        title={selectedProject ? projectTitle(selectedProject) : ''}
      >
        {selectedProject != null && (
          <>
            <DrawerDetailRow>
              <DrawerDetailLabel>{t('projects.table.title')}</DrawerDetailLabel>
              <DrawerDetailValue>
                {projectTitle(selectedProject)}
              </DrawerDetailValue>
            </DrawerDetailRow>
            {projectDescription(selectedProject) && (
              <DrawerDetailRow>
                <DrawerDetailLabel>{t('projects.drawer.description')}</DrawerDetailLabel>
                <DrawerDetailValue>
                  {projectDescription(selectedProject)}
                </DrawerDetailValue>
              </DrawerDetailRow>
            )}
            <DrawerDetailRow>
              <DrawerDetailLabel>{t('projects.table.technologies')}</DrawerDetailLabel>
              <DrawerDetailValue>
                <TechList>
                  {selectedProject.technologies.map((t) => t.name).join(', ')}
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
