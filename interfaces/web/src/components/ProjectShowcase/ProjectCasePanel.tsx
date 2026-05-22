// Core
import React, { useCallback } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

// Types
import type { Project } from '@/data/types';
import { getProjectDisplayTitle } from '@/domain/projects';
import { Language } from '@/types';

// Components
import { ProjectCaseStudyContent } from '@/components/ProjectShowcase/ProjectCaseStudyContent';
import { motionEase } from '@/styles/animations';
import { motionPresets } from '@/styles/motionPresets';
import {
  CasePanelRoot,
  CasePanelInner,
  CasePanelHeader,
  CasePanelIndex,
  CasePanelTitle,
  CasePanelClose,
} from '@/components/ProjectShowcase/ProjectCasePanel.style';

export interface ProjectCasePanelProps {
  project: Project | null;
  language: Language;
  indexLabel: string;
  onClose: () => void;
}

// ======================================================
// ======================= METHODS ======================
// ======================================================

const panelVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: motionPresets.duration.slow,
      ease: motionEase,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: motionPresets.duration.fast, ease: motionEase },
  },
};

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

export function ProjectCasePanel({
  project,
  language,
  indexLabel,
  onClose,
}: ProjectCasePanelProps): React.ReactElement {
  const { t } = useTranslation();

  const handleCloseClick = useCallback((): void => {
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence mode="wait">
      {project != null ? (
        <CasePanelRoot
          key={project.id}
          as={motion.div}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          layout
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
}
