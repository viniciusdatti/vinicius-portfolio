// Core
import React, { useCallback } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

// Types
import type { Project, Technology } from '../../data/types';
import { Language } from '../../types';

// Components
import {
  ProjectCaseStudyField,
  getProjectRepoSlug,
  resolveCaseStudyField,
  resolveTechnologyCapabilityLabel,
} from '../../utils/projectCaseCopy';
import { motionEase } from '../../styles/animations';
import { motionPresets } from '../../styles/motionPresets';
import {
  CasePanelRoot,
  CasePanelInner,
  CasePanelHeader,
  CasePanelIndex,
  CasePanelTitle,
  CasePanelClose,
  CasePanelGrid,
  CasePanelBlock,
  CasePanelLabel,
  CasePanelText,
  CasePanelTechList,
  CasePanelTech,
  CasePanelActions,
  CasePanelLink,
  CasePanelSecondaryLink,
} from './ProjectCasePanel.style';

export interface ProjectCasePanelProps {
  project: Project | null;
  language: Language;
  indexLabel: string;
  onClose: () => void;
}

/* ***********************************************************************************************
 ****************************************** METHODS ***********************************************
 *********************************************************************************************** */

const getProjectTitle = (project: Project, language: Language): string => {
  if (language === Language.Pt && project.title_pt) {
    return project.title_pt;
  }
  return project.title;
};

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

/**
 * Inline contextual case panel — progressive engineering narrative, not a generic modal.
 */
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
                <CasePanelTitle>{getProjectTitle(project, language)}</CasePanelTitle>
              </div>
              <CasePanelClose
                type="button"
                onClick={handleCloseClick}
                aria-label={t('projects.casePanel.close')}
              >
                {t('projects.casePanel.close')}
              </CasePanelClose>
            </CasePanelHeader>
            <CasePanelGrid>
              <CasePanelBlock>
                <CasePanelLabel>{t('projects.casePanel.framing')}</CasePanelLabel>
                <CasePanelText>
                  {resolveCaseStudyField(
                    project,
                    ProjectCaseStudyField.Framing,
                    language,
                    t,
                  )}
                </CasePanelText>
              </CasePanelBlock>
              <CasePanelBlock>
                <CasePanelLabel>{t('projects.casePanel.architecture')}</CasePanelLabel>
                <CasePanelText>
                  {resolveCaseStudyField(
                    project,
                    ProjectCaseStudyField.Architecture,
                    language,
                    t,
                  )}
                </CasePanelText>
              </CasePanelBlock>
              <CasePanelBlock>
                <CasePanelLabel>{t('projects.casePanel.decision')}</CasePanelLabel>
                <CasePanelText>
                  {resolveCaseStudyField(
                    project,
                    ProjectCaseStudyField.Decision,
                    language,
                    t,
                  )}
                </CasePanelText>
              </CasePanelBlock>
              <CasePanelBlock>
                <CasePanelLabel>{t('projects.table.technologies')}</CasePanelLabel>
                <CasePanelTechList>
                  {project.technologies.map((tech: Technology) => (
                    <CasePanelTech key={tech.id}>
                      {resolveTechnologyCapabilityLabel(tech, t)}
                    </CasePanelTech>
                  ))}
                </CasePanelTechList>
              </CasePanelBlock>
            </CasePanelGrid>
            <CasePanelActions>
              <CasePanelLink
                href={project.repository_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('projects.drawer.repository')}
              </CasePanelLink>
              {project.demo_url ? (
                <CasePanelLink
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('projects.drawer.demo')}
                </CasePanelLink>
              ) : null}
              <CasePanelSecondaryLink
                to="/live-lab"
                state={{ caseSlug: getProjectRepoSlug(project.repository_url) }}
              >
                {t('projects.casePanel.discussLive')}
              </CasePanelSecondaryLink>
            </CasePanelActions>
          </CasePanelInner>
        </CasePanelRoot>
      ) : null}
    </AnimatePresence>
  );
}
