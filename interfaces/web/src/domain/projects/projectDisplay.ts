import type { Project } from '@/data/types';
import { Language } from '@/types';

/**
 * Localized project title for showcase and case panels.
 */
export const getProjectDisplayTitle = (
  project: Project,
  language: Language,
): string => {
  if (language === Language.Pt && project.title_pt) {
    return project.title_pt;
  }
  return project.title;
};
