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

/**
 * Groups ordered showcase projects into bento rows:
 * [featured + side], then triplets of 4-col cards.
 */
export const groupProjectsIntoShowcaseRows = (projects: Project[]): Project[][] => {
  if (projects.length === 0) {
    return [];
  }
  const rows: Project[][] = [];
  const headCount: number = Math.min(2, projects.length);
  rows.push(projects.slice(0, headCount));
  for (let i: number = headCount; i < projects.length; i += 3) {
    rows.push(projects.slice(i, i + 3));
  }
  return rows;
};
