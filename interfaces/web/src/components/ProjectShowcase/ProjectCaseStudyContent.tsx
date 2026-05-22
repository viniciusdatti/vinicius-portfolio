// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { Project, Technology } from '@/data/types';
import { Language } from '@/types';
import { ProjectCaseStudyField } from '@/types/projectCase';

// =================================================================================================
// ============================================= UTILS =============================================
// =================================================================================================
import {
  getProjectRepoSlug,
  resolveCaseStudyField,
  resolveTechnologyCapabilityLabel,
} from '@/utils/projectCaseCopy';
import {
  CasePanelGrid,
  CasePanelBlock,
  CasePanelLabel,
  CasePanelText,
  CasePanelTechList,
  CasePanelTech,
  CasePanelActions,
  CasePanelLink,
  CasePanelSecondaryLink,
  CasePanelRepoSlug,
} from '@/components/ProjectShowcase/ProjectCasePanel.style';

export interface ProjectCaseStudyContentProps {
  project: Project;
  language: Language;
  showRepoSlug?: boolean;
}

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

/**
 * Shared case-study body — used in inline panel and projects drawer.
 */
export function ProjectCaseStudyContent({
  project,
  language,
  showRepoSlug = true,
}: ProjectCaseStudyContentProps): React.ReactElement {
  const { t } = useTranslation();
  const repoSlug: string = getProjectRepoSlug(project.repository_url);

  return (
    <>
      {showRepoSlug ? (
        <CasePanelRepoSlug>
          {t('projects.showcase.repository')}
          {' · '}
          <span>{repoSlug}</span>
        </CasePanelRepoSlug>
      ) : null}
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
        <CasePanelSecondaryLink to="/live-lab">
          {t('projects.casePanel.discussLive')}
        </CasePanelSecondaryLink>
      </CasePanelActions>
    </>
  );
}
