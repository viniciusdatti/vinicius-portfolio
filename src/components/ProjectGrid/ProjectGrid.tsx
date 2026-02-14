// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { ProjectGridProps } from './ProjectGrid.types';
import type { Project } from '../../data/projects';

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

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
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
          <H2>{t(project.titleKey)}</H2>
          <ProjectDescription>
            <Text>{t(project.descriptionKey)}</Text>
          </ProjectDescription>
          <TagList>
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagList>
          <ProjectLinks>
            <ProjectLink
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('projects.viewCode')} →
            </ProjectLink>
            {project.demoUrl && (
              <ProjectLink
                href={project.demoUrl}
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
