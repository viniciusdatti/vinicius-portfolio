// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { ProjectGridProps } from './ProjectGrid.types';
import type { Project } from '../../data/types';
import { Language } from '../../types';

// Components
import { Card } from '../Card';
import { H2, Text } from '../Typography';
import {
  Grid,
  ProjectLink,
  ProjectLinks,
  ProjectDescription,
  Tag,
  TagList,
  EmptyMessage,
} from './ProjectGrid.style';

/**
 * Get localized project title based on current language.
 */
const getProjectTitle = (project: Project, language: Language): string => {
  if (language === Language.Pt && project.title_pt) {
    return project.title_pt;
  }
  return project.title;
};

/**
 * Get localized project description based on current language.
 */
const getProjectDescription = (project: Project, language: Language): string => {
  if (language === Language.Pt && project.description_pt) {
    return project.description_pt;
  }
  return project.description || '';
};

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  language = Language.En,
}) => {
  const { t } = useTranslation();

  if (projects.length === 0) {
    return (
      <Grid>
        <EmptyMessage>{t('home.projectsEmpty')}</EmptyMessage>
      </Grid>
    );
  }

  return (
    <Grid>
      {projects.map((project: Project) => (
        <Card key={project.id}>
          <H2>{getProjectTitle(project, language)}</H2>
          <ProjectDescription>
            <Text>{getProjectDescription(project, language)}</Text>
          </ProjectDescription>
          <TagList>
            {project.technologies.map((tech) => (
              <Tag key={tech.id}>{tech.name}</Tag>
            ))}
          </TagList>
          <ProjectLinks>
            <ProjectLink
              href={project.repository_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('projects.viewCode')} →
            </ProjectLink>
            {project.demo_url && (
              <ProjectLink
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('projects.viewDemo')} →
              </ProjectLink>
            )}
          </ProjectLinks>
        </Card>
      ))}
    </Grid>
  );
};
