import React from 'react';
import { Card } from '../Card';
import { H2, Text } from '../Typography';
import { Grid, ProjectLink, ProjectDescription, Tag, TagList } from './ProjectGrid.style';
import type { ProjectGridProps } from './ProjectGrid.types';

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <Grid>
      {projects.map((project) => (
        <Card key={project.title}>
          <H2>{project.title}</H2>
          <ProjectDescription>
            <Text>{project.description}</Text>
          </ProjectDescription>
          <TagList>
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagList>
          <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
            Ver projeto →
          </ProjectLink>
        </Card>
      ))}
    </Grid>
  );
};
