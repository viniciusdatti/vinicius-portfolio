// Core
import React, { useCallback, useMemo, useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { Project } from '@/data/types';
import {
  formatProjectSignalCode,
  getProjectDisplayTitle,
  orderProjectsForShowcase,
} from '@/domain/projects';
import { Language } from '@/types';
import {
  ProjectCanvasTone,
} from '@/components/ProjectShowcase/ProjectShowcase.types';

// Hooks
import { useScrollMotion } from '@/hooks/useScrollMotion';

// Components
import { HomeSectionReveal } from '@/components/home/HomeSectionReveal';
import { WorkCanvasPreview } from '@/components/home/WorkCanvasPreview';
import { ProjectCasePanel } from '@/components/ProjectShowcase/ProjectCasePanel';
import { ProjectCardSkeleton } from '@/components/ProjectCardSkeleton';

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
  RunwayContent,
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

const formatIndex = (index: number): string => formatProjectSignalCode(index);

const resolveTone = (index: number): ProjectCanvasTone => {
  const mod = index % 3;
  if (mod === 1) return ProjectCanvasTone.B;
  if (mod === 2) return ProjectCanvasTone.C;
  return ProjectCanvasTone.A;
};

export const HomeWorkStage = ({
  projects,
  language,
  isLoading,
  isError,
  onRetry,
}: HomeWorkStageProps): React.ReactElement => {
  const { t } = useTranslation();
  const {
    section,
    stagger,
    item,
    viewport,
  } = useScrollMotion();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const ordered: Project[] = useMemo((): Project[] => {
    const list: Project[] = projects ?? [];
    return orderProjectsForShowcase(list).slice(0, 4);
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
          <HomeSectionReveal stagger>
            <WorkRailIndex variants={item} aria-hidden>
              {t('home.sections.projects.index')}
            </WorkRailIndex>
            <WorkEyebrow variants={item}>
              {t('home.sections.projects.eyebrow')}
            </WorkEyebrow>
            <WorkTitle variants={item}>
              {t('projects.sectionTitle')}
            </WorkTitle>
            <WorkStory variants={item}>
              {t('home.sections.projects.story')}
            </WorkStory>
            <WorkRailLink variants={item} to="/projects">
              {t('home.sections.projects.viewAll')}
              {' '}
              →
            </WorkRailLink>
          </HomeSectionReveal>
        </WorkRail>

        <WorkCanvas>
          <FeaturedRunway
            type="button"
            $tone={resolveTone(0)}
            $active={highlightId === featured.id}
            onClick={() => handleSelect(featured.id)}
            variants={section}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            aria-pressed={highlightId === featured.id}
            aria-label={getProjectDisplayTitle(featured, language)}
          >
            <WorkCanvasPreview
              tone={resolveTone(0)}
              active={highlightId === featured.id}
            />
            <RunwayContent>
              <RunwayIndex>{formatIndex(0)}</RunwayIndex>
              <RunwayTitle>{getProjectDisplayTitle(featured, language)}</RunwayTitle>
              <RunwayTech>
                {featured.technologies.slice(0, 5).map((tech) => (
                  <RunwayTechTag key={tech.slug}>{tech.name}</RunwayTechTag>
                ))}
              </RunwayTech>
            </RunwayContent>
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
};
