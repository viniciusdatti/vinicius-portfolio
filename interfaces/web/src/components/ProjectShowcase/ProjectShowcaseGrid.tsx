// Core
import React, { useCallback, useMemo, useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { Project } from '@/data/types';
import {
  ProjectCanvasTone,
  ProjectShowcaseDetailMode,
  ProjectShowcaseVariant,
} from '@/components/ProjectShowcase/ProjectShowcase.types';
import type { ProjectShowcaseGridProps } from '@/components/ProjectShowcase/ProjectShowcase.types';

// Components
import {
  formatProjectSignalCode,
  groupProjectsIntoShowcaseRows,
  orderProjectsForShowcase,
} from '@/domain/projects';
import { useScrollMotion } from '@/hooks/useScrollMotion';
import { ProjectShowcaseCard } from '@/components/ProjectShowcase/ProjectShowcaseCard';
import { ProjectCasePanel } from '@/components/ProjectShowcase/ProjectCasePanel';
import {
  ShowcaseGrid,
  ShowcaseRow,
} from '@/components/ProjectShowcase/ProjectShowcase.style';

/* *************************************************************************************************
 ********************************************* METHODS *********************************************
 ************************************************************************************************ */

const resolveVariant = (
  index: number,
  compact: boolean,
  hasFeatured: boolean,
): ProjectShowcaseVariant => {
  if (compact) {
    if (hasFeatured && index === 0) {
      return ProjectShowcaseVariant.Featured;
    }
    return ProjectShowcaseVariant.Compact;
  }
  if (hasFeatured && index === 0) {
    return ProjectShowcaseVariant.Featured;
  }
  return ProjectShowcaseVariant.Standard;
};

const resolveCanvasTone = (index: number): ProjectCanvasTone => {
  const toneIndex: number = index % 3;
  if (toneIndex === 1) {
    return ProjectCanvasTone.B;
  }
  if (toneIndex === 2) {
    return ProjectCanvasTone.C;
  }
  return ProjectCanvasTone.A;
};

const formatIndexLabel = (index: number): string => formatProjectSignalCode(index);

/* *************************************************************************************************
 *************************************** COMPONENT HANDLING ****************************************
 ************************************************************************************************ */

export const ProjectShowcaseGrid = ({
  projects,
  language,
  compact = false,
  detailMode = ProjectShowcaseDetailMode.Callback,
  onSelectProject,
}: ProjectShowcaseGridProps): React.ReactElement => {
  const { t } = useTranslation();
  const {
    rowStagger,
    row: rowVariants,
    item,
    viewport,
  } = useScrollMotion();
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const orderedProjects: Project[] = useMemo(
    () => orderProjectsForShowcase(projects),
    [projects],
  );

  const showcaseRows: Project[][] = useMemo(
    () => groupProjectsIntoShowcaseRows(orderedProjects),
    [orderedProjects],
  );

  const hasFeatured: boolean = orderedProjects.length > 0;

  const selectedProject: Project | null = useMemo(() => {
    if (selectedProjectId == null) {
      return null;
    }
    return orderedProjects.find((p: Project) => p.id === selectedProjectId) ?? null;
  }, [orderedProjects, selectedProjectId]);

  const selectedIndexLabel: string = useMemo(() => {
    if (selectedProject == null) {
      return '';
    }
    const index: number = orderedProjects.findIndex(
      (p: Project) => p.id === selectedProject.id,
    );
    return formatIndexLabel(index >= 0 ? index : 0);
  }, [orderedProjects, selectedProject]);

  const handleSelect = useCallback(
    (project: Project): void => {
      if (detailMode === ProjectShowcaseDetailMode.Callback) {
        onSelectProject?.(project);
        return;
      }
      setSelectedProjectId((prev: number | null) => (prev === project.id ? null : project.id));
    },
    [detailMode, onSelectProject],
  );

  const handleClosePanel = useCallback((): void => {
    setSelectedProjectId(null);
  }, []);

  if (orderedProjects.length === 0) {
    return <p>{t('projects.empty')}</p>;
  }

  const rowOffsets: number[] = showcaseRows.reduce(
    (offsets: number[], _showcaseRow: Project[], rowIndex: number): number[] => {
      const prev: number = rowIndex === 0
        ? 0
        : offsets[rowIndex - 1] + showcaseRows[rowIndex - 1].length;
      offsets.push(prev);
      return offsets;
    },
    [],
  );

  return (
    <ShowcaseGrid
      $compact={compact}
      variants={rowStagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {showcaseRows.map((rowProjects: Project[], rowIndex: number) => {
        const isHeadRow: boolean = rowIndex === 0;
        const rowStartIndex: number = rowOffsets[rowIndex] ?? 0;
        return (
          <ShowcaseRow
            key={`showcase-row-${rowProjects.map((p: Project) => p.id).join('-')}`}
            $compact={compact}
            $isHeadRow={isHeadRow}
            variants={rowVariants}
          >
            {rowProjects.map((project: Project, cardIndex: number) => {
              const index: number = rowStartIndex + cardIndex;
              return (
                <ProjectShowcaseCard
                  key={project.id}
                  project={project}
                  language={language}
                  variant={resolveVariant(index, compact, hasFeatured)}
                  canvasTone={resolveCanvasTone(index)}
                  indexLabel={formatIndexLabel(index)}
                  isSelected={selectedProjectId === project.id}
                  onSelect={handleSelect}
                  itemVariants={item}
                />
              );
            })}
          </ShowcaseRow>
        );
      })}
      {detailMode === ProjectShowcaseDetailMode.Inline ? (
        <ProjectCasePanel
          project={selectedProject}
          language={language}
          indexLabel={selectedIndexLabel}
          onClose={handleClosePanel}
        />
      ) : null}
    </ShowcaseGrid>
  );
};
