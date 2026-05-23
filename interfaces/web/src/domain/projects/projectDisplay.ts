import type { Project } from '@/data/types';
import { Language } from '@/types';

import { getProjectRepoSlug } from '@/utils/projectCaseCopy';

/**
 * Localized project title for showcase and case panels.
 * Display name always matches the GitHub repository slug (honest labeling).
 */
export const getProjectDisplayTitle = (
  project: Project,
  language: Language,
): string => {
  const repoSlug: string = getProjectRepoSlug(project.repository_url);
  if (repoSlug.length > 0) {
    return repoSlug;
  }

  if (language === Language.Pt && project.title_pt) {
    return project.title_pt;
  }

  return project.title;
};

/**
 * Mono-spaced signal registry code for project showcase ordering (SIG-01, SIG-02, …).
 */
export const formatProjectSignalCode = (index: number): string => {
  const sequence: string = String(index + 1).padStart(2, '0');
  return `SIG-${sequence}`;
};
