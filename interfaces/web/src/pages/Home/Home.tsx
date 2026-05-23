/**
 * @fileoverview Home — cinematic product narrative (not a card grid portfolio).
 */

// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import { Language } from '@/types';

// Hooks
import { useProjects } from '@/hooks';

// Components
import { Hero } from '@/components/Hero';
import { HomeSectionReveal } from '@/components/Home/HomeSectionReveal';
import { RealtimePresence } from '@/components/Home/RealtimePresence';
import { HomeManifestoStrip } from '@/components/Home/HomeManifestoStrip';
import { HomeWorkStage } from '@/components/Home/HomeWorkStage';
import { HomeLiveLabImmersion } from '@/components/Home/HomeLiveLabImmersion';
import { HomeCapabilityRail } from '@/components/Home/HomeCapabilityRail';
import { HomeChapterClose } from '@/components/Home/HomeChapterClose';

// =================================================================================================
// ========================================== COMPONENT ============================================
// =================================================================================================

export const Home = (): React.ReactElement => {
  const { i18n } = useTranslation();
  const {
    data: projects,
    isLoading,
    isError,
    refetch,
  } = useProjects();

  const currentLanguage: Language = i18n.language?.startsWith('pt') ? Language.Pt : Language.En;

  return (
    <>
      <Hero />
      <HomeSectionReveal>
        <RealtimePresence />
      </HomeSectionReveal>
      <HomeSectionReveal>
        <HomeManifestoStrip />
      </HomeSectionReveal>
      <HomeSectionReveal>
        <HomeWorkStage
          projects={projects}
          language={currentLanguage}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => refetch()}
        />
      </HomeSectionReveal>
      <HomeSectionReveal>
        <HomeLiveLabImmersion />
      </HomeSectionReveal>
      <HomeSectionReveal>
        <HomeCapabilityRail />
      </HomeSectionReveal>
      <HomeSectionReveal>
        <HomeChapterClose />
      </HomeSectionReveal>
    </>
  );
};
