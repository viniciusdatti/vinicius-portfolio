import type { Project } from '@/data/types';

const FEATURED_REPOSITORY_FRAGMENT: string = 'vault-erp';

const FEATURED_TECH_SLUG: string = 'autodesk-vault-api';

/**
 * Returns true when the project is the flagship Vault ↔ ERP automation showcase.
 */
export const isFeaturedShowcaseProject = (project: Project): boolean => {
  const repoUrl: string | undefined = project.repository_url;
  const repoMatch: boolean = repoUrl?.includes(FEATURED_REPOSITORY_FRAGMENT) ?? false;
  const techMatch: boolean = project.technologies.some(
    (tech) => tech.slug === FEATURED_TECH_SLUG,
  );
  return repoMatch || techMatch;
};

/**
 * Orders projects for showcase grids: featured Vault ERP first, then demo-backed rows.
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
