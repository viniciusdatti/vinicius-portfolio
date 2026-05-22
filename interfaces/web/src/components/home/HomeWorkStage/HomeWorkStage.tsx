// Core
import React, { useCallback, useMemo, useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { Project } from '@/data/types';
import { getProjectDisplayTitle } from '@/domain/projects';
import { Language } from '@/types';
import {
  ProjectCanvasTone,
} from '@/components/ProjectShowcase/ProjectShowcase.types';

// Components
import { ProjectCasePanel } from '@/components/ProjectShowcase/ProjectCasePanel';
import { ProjectCardSkeleton } from '@/components/ProjectCardSkeleton';
import { useScrollMotion } from '@/hooks/useScrollMotion';

// View
import {
  WorkStage,
  WorkStageGrid,
  WorkRail,
  WorkRailIndex,
  WorkEyebrow,
  WorkTitle,
  WorkStory,
  WorkRailLink,
  WorkCanvas,
  FeaturedRunway,
  RunwayIndex,
  RunwayTitle,
  RunwayTech,
  RunwayTechTag,
  CaseIndexList,
  CaseIndexRow,
  CaseIndexLabel,
  CaseIndexTitle,
  CaseIndexArrow,
  CasePanelSlot,
  WorkError,
  WorkRetry,
} from '@/components/home/HomeWorkStage/HomeWorkStage.style';

export interface HomeWorkStageProps {
  projects: Project[] | undefined;
  language: Language;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const formatIndex = (index: number): string => String(index + 1).padStart(2, '0');

const resolveTone = (index: number): ProjectCanvasTone => {
  const mod = index % 3;
  if (mod === 1) return ProjectCanvasTone.B;
  if (mod === 2) return ProjectCanvasTone.C;
  return ProjectCanvasTone.A;
};

const viewport = { once: true, margin: '-80px' as const };

export function HomeWorkStage({
  projects,
  language,
  isLoading,
  isError,
  onRetry,
}: HomeWorkStageProps): React.ReactElement {
  const { t } = useTranslation();
  const { section, stagger, item } = useScrollMotion();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const ordered: Project[] = useMemo(() => {
    const list = projects ?? [];
    const withDemo = list.filter((p: Project) => Boolean(p.demo_url));
    const withoutDemo = list.filter((p: Project) => !p.demo_url);
    return [...withDemo, ...withoutDemo].slice(0, 4);
  }, [projects]);

  const highlightId: number = selectedId ?? ordered[0]?.id ?? -1;

  const panelProject: Project | null = useMemo(() => {
    if (selectedId == null) {
      return null;
    }
    return ordered.find((p: Project) => p.id === selectedId) ?? null;
  }, [ordered, selectedId]);

  const panelIndex: number = useMemo(
    () => (panelProject
      ? ordered.findIndex((p: Project) => p.id === panelProject.id)
      : 0),
    [ordered, panelProject],
  );

  const handleSelect = useCallback((id: number): void => {
    setSelectedId(id);
  }, []);

  if (isLoading) {
    return (
      <WorkStage id="section-work">
        <ProjectCardSkeleton />
      </WorkStage>
    );
  }

  if (isError) {
    return (
      <WorkStage id="section-work">
        <WorkError>
          <p>{t('home.projectsError')}</p>
          <WorkRetry type="button" onClick={onRetry}>
            {t('common.retry')}
          </WorkRetry>
        </WorkError>
      </WorkStage>
    );
  }

  if (ordered.length === 0) {
    return (
      <WorkStage id="section-work">
        <WorkError>{t('projects.empty')}</WorkError>
      </WorkStage>
    );
  }

  const featured = ordered[0];
  const indexRows = ordered.slice(1);

  return (
    <WorkStage id="section-work">
      <WorkStageGrid>
        <WorkRail>
          <WorkRailIndex aria-hidden>{t('home.sections.projects.index')}</WorkRailIndex>
          <WorkEyebrow>{t('home.sections.projects.eyebrow')}</WorkEyebrow>
          <WorkTitle
            variants={section}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {t('projects.sectionTitle')}
          </WorkTitle>
          <WorkStory>{t('home.sections.projects.story')}</WorkStory>
          <WorkRailLink to="/projects">
            {t('home.sections.projects.viewAll')}
            {' '}
            →
          </WorkRailLink>
        </WorkRail>

        <WorkCanvas>
          <FeaturedRunway
            type="button"
            $tone={resolveTone(0)}
            $active={highlightId === featured.id}
            onClick={() => handleSelect(featured.id)}
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            aria-pressed={highlightId === featured.id}
            aria-label={getProjectDisplayTitle(featured, language)}
          >
            <RunwayIndex>{formatIndex(0)}</RunwayIndex>
            <RunwayTitle>{getProjectDisplayTitle(featured, language)}</RunwayTitle>
            <RunwayTech>
              {featured.technologies.slice(0, 5).map((tech) => (
                <RunwayTechTag key={tech.slug}>{tech.name}</RunwayTechTag>
              ))}
            </RunwayTech>
          </FeaturedRunway>

          {indexRows.length > 0 ? (
            <CaseIndexList
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {indexRows.map((project: Project, idx: number) => {
                const globalIndex = idx + 1;
                return (
                  <CaseIndexRow
                    key={project.id}
                    type="button"
                    $active={highlightId === project.id}
                    onClick={() => handleSelect(project.id)}
                    aria-pressed={highlightId === project.id}
                    variants={item}
                  >
                    <CaseIndexLabel>{formatIndex(globalIndex)}</CaseIndexLabel>
                    <CaseIndexTitle>{getProjectDisplayTitle(project, language)}</CaseIndexTitle>
                    <CaseIndexArrow aria-hidden>↗</CaseIndexArrow>
                  </CaseIndexRow>
                );
              })}
            </CaseIndexList>
          ) : null}

          <CasePanelSlot>
            <ProjectCasePanel
              project={panelProject}
              language={language}
              indexLabel={formatIndex(panelIndex >= 0 ? panelIndex : 0)}
              onClose={() => setSelectedId(null)}
            />
          </CasePanelSlot>
        </WorkCanvas>
      </WorkStageGrid>
    </WorkStage>
  );
}
