// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Hero } from '../../components/Hero';
import { ProjectGrid } from '../../components/ProjectGrid';
import { projects } from '../../data/projects';
import { ProjectsSection, SectionTitle } from './Home.style';

export const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Hero />
      <ProjectsSection id="projetos">
        <SectionTitle>{t('projects.sectionTitle')}</SectionTitle>
        <ProjectGrid projects={projects} />
      </ProjectsSection>
    </>
  );
};
