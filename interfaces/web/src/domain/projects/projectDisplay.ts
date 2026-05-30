// Libraries
import { Project } from '../../data/types';
import { Language } from '../../types';
import { getProjectRepoSlug } from '../../utils/projectCaseCopy';

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

export const formatProjectSignalCode = (index: number): string => {
  const sequence: string = String(index + 1).padStart(2, '0');
  return `SIG-${sequence}`;
};
