// Core
import React, { useCallback } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import type { TFunction } from 'i18next';

// Domain
import { getProjectDisplayTitle } from '../../domain/projects';

// Hooks
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Components
import { resolveLayoutMorphPanel } from '../../styles/animations';

// Component
import type {
  ProjectCasePanelCloseHandler,
  ProjectCasePanelComponent,
} from './ProjectCasePanel.types';
import { ProjectCaseStudyContent } from './ProjectCaseStudyContent';
import {
  CasePanelRoot,
  CasePanelInner,
  CasePanelHeader,
  CasePanelIndex,
  CasePanelTitle,
  CasePanelClose,
} from './ProjectCasePanel.style';

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
