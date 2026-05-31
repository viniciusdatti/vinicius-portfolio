// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import {
  useProjects,
  usePageMeta,
  PageMetaRoute,
} from '../../hooks';

// Components
import { Hero } from '../../components/Hero';
import { RealtimePresence } from '../../components/home/RealtimePresence';
import { HomeManifestoStrip } from '../../components/home/HomeManifestoStrip';
import { HomeWorkStage } from '../../components/home/HomeWorkStage';
import { HomeLiveLabImmersion } from '../../components/home/HomeLiveLabImmersion';
import { HomeCapabilityRail } from '../../components/home/HomeCapabilityRail';
import { HomeChapterClose } from '../../components/home/HomeChapterClose';

// Types
import { Language } from '../../types';

// Lib
import { resolveLanguage } from '../../lib/i18n';

export const Home = (): React.ReactElement => {
  usePageMeta(PageMetaRoute.Home);
  const { i18n } = useTranslation();
  const {
    data: projects,
    isLoading,
    isError,
    refetch,
  } = useProjects();

  const currentLanguage: Language = resolveLanguage(i18n.language);

  return (
    <>
      <Hero />
      <RealtimePresence />
      <HomeManifestoStrip />
      <HomeWorkStage
        projects={projects}
        language={currentLanguage}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
      />
      <HomeLiveLabImmersion />
      <HomeCapabilityRail />
      <HomeChapterClose />
    </>
  );
};
