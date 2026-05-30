// Types
import { Project, Technology } from '../data/types';
import { Language } from '../types';
import { ProjectCaseStudyField } from '../types/projectCase';

export const getProjectRepoSlug = (repositoryUrl: string): string => {
  const normalized: string = repositoryUrl.replace(/\/$/, '');
  const segments: string[] = normalized.split('/');
  return segments[segments.length - 1] ?? '';
};

export const getProjectCaseCtaKey = (project: Project): string => {
  const slug: string = getProjectRepoSlug(project.repository_url);
  return `projects.caseCtas.${slug}`;
};

export const getTechnologyCapabilityKey = (techSlug: string): string => `projects.capabilities.${techSlug}`;

export const resolveTechnologyCapabilityLabel = (
  tech: Technology,
  translate: (key: string, options?: { defaultValue?: string }) => string,
): string => {
  const key: string = getTechnologyCapabilityKey(tech.slug);
  return translate(key, { defaultValue: tech.name });
};

export const getProjectCaseStudyKey = (
  project: Project,
  field: ProjectCaseStudyField,
): string => {
  const slug: string = getProjectRepoSlug(project.repository_url);
  return `projects.caseStudies.${slug}.${field}`;
};

const getProjectDescriptionFallback = (
  project: Project,
  language: Language,
): string => {
  if (language === Language.Pt && project.description_pt) {
    return project.description_pt;
  }
  return project.description ?? '';
};

export const resolveCaseStudyField = (
  project: Project,
  field: ProjectCaseStudyField,
  language: Language,
  translate: (key: string, options?: { defaultValue?: string }) => string,
): string => {
  const specificKey: string = getProjectCaseStudyKey(project, field);
  const defaultKey: string = `projects.caseStudies.default.${field}`;
  const descriptionFallback: string = getProjectDescriptionFallback(project, language);
  const defaultCopy: string = translate(defaultKey);
  const fallback: string = field === ProjectCaseStudyField.Framing && descriptionFallback
    ? descriptionFallback
    : defaultCopy;
  return translate(specificKey, { defaultValue: fallback });
};
