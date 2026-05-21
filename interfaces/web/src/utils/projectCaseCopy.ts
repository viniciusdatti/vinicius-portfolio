// Types
import type { Project } from '../data/types';
import type { Technology } from '../data/types';

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
