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

/**
 * Mono-spaced signal registry code for project showcase ordering (SIG-01, SIG-02, …).
 */
export const formatProjectSignalCode = (index: number): string => {
  const sequence: string = String(index + 1).padStart(2, '0');
  return `SIG-${sequence}`;
};
