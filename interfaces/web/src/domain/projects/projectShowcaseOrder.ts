import type { Project } from '@/data/types';

const FEATURED_REPOSITORY_FRAGMENT: string = 'vinicius-portfolio';

/**
 * Returns true when the project is the flagship portfolio monorepo repository.
 */
export const isFeaturedShowcaseProject = (project: Project): boolean => {
  const repoUrl: string | undefined = project.repository_url;
  return repoUrl?.includes(FEATURED_REPOSITORY_FRAGMENT) ?? false;
};

/**
 * Orders projects for showcase grids: portfolio monorepo first, then demo-backed rows.
 */
export const orderProjectsForShowcase = (projects: Project[]): Project[] => {
  if (projects.length === 0) {
    return [];
  }

  const featured: Project | undefined = projects.find(isFeaturedShowcaseProject);
  const others: Project[] = featured != null
    ? projects.filter((p: Project) => p.id !== featured.id)
    : [...projects];

  const withDemo: Project[] = others.filter((p: Project) => Boolean(p.demo_url));
  const withoutDemo: Project[] = others.filter((p: Project) => !p.demo_url);
  const orderedOthers: Project[] = [...withDemo, ...withoutDemo];

  return featured != null ? [featured, ...orderedOthers] : orderedOthers;
};
