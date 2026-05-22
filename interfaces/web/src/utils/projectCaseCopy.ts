// Types
import type { Project } from '../data/types';
import type { Technology } from '../data/types';
import { Language } from '../types';

export enum ProjectCaseStudyField {
  Framing = 'framing',
  Architecture = 'architecture',
  Decision = 'decision',
}

/**
 * Last path segment of a GitHub repository URL (stable key for i18n case copy).
 */
export const getProjectRepoSlug = (repositoryUrl: string): string => {
  const normalized: string = repositoryUrl.replace(/\/$/, '');
  const segments: string[] = normalized.split('/');
  return segments[segments.length - 1] ?? '';
};

/**
 * i18n key for per-case CTA label under projects.caseCtas.<slug>.
 */
export const getProjectCaseCtaKey = (project: Project): string => {
  const slug: string = getProjectRepoSlug(project.repository_url);
  return `projects.caseCtas.${slug}`;
};

/**
 * i18n key for engineering capability label under projects.capabilities.<techSlug>.
 */
export const getTechnologyCapabilityKey = (techSlug: string): string =>
  `projects.capabilities.${techSlug}`;

/**
 * Resolves capability label: i18n when defined, otherwise technology name from API.
 */
export const resolveTechnologyCapabilityLabel = (
  tech: Technology,
  translate: (key: string, options?: { defaultValue?: string }) => string
): string => {
  const key: string = getTechnologyCapabilityKey(tech.slug);
  return translate(key, { defaultValue: tech.name });
};

/**
 * i18n key for case study narrative: projects.caseStudies.<slug>.<field>.
 */
export const getProjectCaseStudyKey = (
  project: Project,
  field: ProjectCaseStudyField
): string => {
  const slug: string = getProjectRepoSlug(project.repository_url);
  return `projects.caseStudies.${slug}.${field}`;
};

const getProjectDescriptionFallback = (
  project: Project,
  language: Language
): string => {
  if (language === Language.Pt && project.description_pt) {
    return project.description_pt;
  }
  return project.description ?? '';
};

/**
 * Resolves case study copy: per-repo i18n, then default field, then project description.
 */
export const resolveCaseStudyField = (
  project: Project,
  field: ProjectCaseStudyField,
  language: Language,
  translate: (key: string, options?: { defaultValue?: string }) => string
): string => {
  const specificKey: string = getProjectCaseStudyKey(project, field);
  const defaultKey: string = `projects.caseStudies.default.${field}`;
  const descriptionFallback: string = getProjectDescriptionFallback(project, language);
  const defaultCopy: string = translate(defaultKey);
  const fallback: string =
    field === ProjectCaseStudyField.Framing && descriptionFallback
      ? descriptionFallback
      : defaultCopy;
  return translate(specificKey, { defaultValue: fallback });
};
