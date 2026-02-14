// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { useProjects } from '../../hooks';

// Components
import { Hero } from '../../components/Hero';
import { ProjectGrid } from '../../components/ProjectGrid';
import { ProjectCardSkeleton } from '../../components/ProjectCardSkeleton';
import { ProjectsSection, SectionTitle, SkeletonGrid, ErrorMessage, RetryButton } from './Home.style';

export const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { data: projects, isLoading, isError, refetch } = useProjects();

  const currentLanguage = i18n.language?.startsWith('pt') ? 'pt' : 'en';

  const renderContent = () => {
    if (isLoading) {
      return (
        <SkeletonGrid>
          {[1, 2, 3].map((i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </SkeletonGrid>
      );
    }

    if (isError) {
      return (
        <ErrorMessage>
          <p>{t('home.projectsError')}</p>
          <RetryButton onClick={() => refetch()}>
            {t('common.retry')}
          </RetryButton>
        </ErrorMessage>
      );
    }

    return <ProjectGrid projects={projects || []} language={currentLanguage} />;
  };

  return (
    <>
      <Hero />
      <ProjectsSection id="projetos">
        <SectionTitle>{t('projects.sectionTitle')}</SectionTitle>
        {renderContent()}
      </ProjectsSection>
    </>
  );
};
