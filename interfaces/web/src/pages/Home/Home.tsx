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
import { RealtimePresence } from '@/components/home/RealtimePresence';
import { HomeManifestoStrip } from '@/components/home/HomeManifestoStrip';
import { HomeWorkStage } from '@/components/home/HomeWorkStage';
import { HomeLiveLabImmersion } from '@/components/home/HomeLiveLabImmersion';
import { HomeCapabilityRail } from '@/components/home/HomeCapabilityRail';
import { HomeChapterClose } from '@/components/home/HomeChapterClose';

// =================================================================================================
// ========================================== COMPONENT ============================================
// =================================================================================================

export function Home(): React.ReactElement {
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
}
