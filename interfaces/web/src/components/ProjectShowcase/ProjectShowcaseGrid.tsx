// Core
import React, { useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { Project } from '../../data/types';
import {
  ProjectCanvasTone,
  ProjectShowcaseVariant,
} from './ProjectShowcase.types';
import type { ProjectShowcaseGridProps } from './ProjectShowcase.types';

// Components
import { showcaseStaggerContainer } from '../../styles/animations';
import { ProjectShowcaseCard } from './ProjectShowcaseCard';
import { ShowcaseGrid } from './ProjectShowcase.style';

/* ***********************************************************************************************
 ****************************************** METHODS ***********************************************
 *********************************************************************************************** */

const resolveVariant = (
  index: number,
  compact: boolean,
  hasFeatured: boolean
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

const formatIndexLabel = (index: number): string => {
  const padded: string = String(index + 1).padStart(2, '0');
  return padded;
};

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

export const ProjectShowcaseGrid: React.FC<ProjectShowcaseGridProps> = ({
  projects,
  language,
  compact = false,
  onSelectProject,
}): React.ReactElement => {
  const { t } = useTranslation();

  const orderedProjects: Project[] = useMemo(() => {
    const withDemo: Project[] = projects.filter((p: Project) => Boolean(p.demo_url));
    const withoutDemo: Project[] = projects.filter((p: Project) => !p.demo_url);
    return [...withDemo, ...withoutDemo];
  }, [projects]);

  const hasFeatured: boolean = orderedProjects.length > 0;

  if (orderedProjects.length === 0) {
    return (
      <p>{t('projects.empty')}</p>
    );
  }

  return (
    <ShowcaseGrid
      $compact={compact}
      variants={showcaseStaggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-40px' }}
    >
      {orderedProjects.map((project: Project, index: number) => (
        <ProjectShowcaseCard
          key={project.id}
          project={project}
          language={language}
          variant={resolveVariant(index, compact, hasFeatured)}
          canvasTone={resolveCanvasTone(index)}
          indexLabel={formatIndexLabel(index)}
          onSelect={onSelectProject}
        />
      ))}
    </ShowcaseGrid>
  );
};
