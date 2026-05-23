// Core
import React, { useCallback } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import type { TFunction } from 'i18next';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Types
import type {
  ProjectCasePanelCloseHandler,
  ProjectCasePanelComponent,
} from '@/components/ProjectShowcase/ProjectCasePanel.types';
import { getProjectDisplayTitle } from '@/domain/projects';

// Components
import { ProjectCaseStudyContent } from '@/components/ProjectShowcase/ProjectCaseStudyContent';
import { resolveLayoutMorphPanel } from '@/styles/animations';
import {
  CasePanelRoot,
  CasePanelInner,
  CasePanelHeader,
  CasePanelIndex,
  CasePanelTitle,
  CasePanelClose,
} from '@/components/ProjectShowcase/ProjectCasePanel.style';

// ======================================================
// ======================= METHODS ======================
// ======================================================

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

export const ProjectCasePanel: ProjectCasePanelComponent = ({
  project,
  language,
  indexLabel,
  onClose,
}): React.ReactElement => {
  const { t }: { t: TFunction } = useTranslation();
  const reduced: boolean = usePrefersReducedMotion();
  const panelVariants: Variants = resolveLayoutMorphPanel(reduced);

  const handleCloseClick: ProjectCasePanelCloseHandler = useCallback((): void => {
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence mode="popLayout">
      {project != null ? (
        <CasePanelRoot
          key={project.id}
          as={motion.div}
          layout
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <CasePanelInner>
            <CasePanelHeader>
              <div>
                <CasePanelIndex>{indexLabel}</CasePanelIndex>
                <CasePanelTitle>{getProjectDisplayTitle(project, language)}</CasePanelTitle>
              </div>
              <CasePanelClose
                type="button"
                onClick={handleCloseClick}
                aria-label={t('projects.casePanel.close')}
              >
                {t('projects.casePanel.close')}
              </CasePanelClose>
            </CasePanelHeader>
            <ProjectCaseStudyContent project={project} language={language} />
          </CasePanelInner>
        </CasePanelRoot>
      ) : null}
    </AnimatePresence>
  );
};
