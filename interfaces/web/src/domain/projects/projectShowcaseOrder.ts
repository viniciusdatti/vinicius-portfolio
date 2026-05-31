// Libraries
import { Project } from '../../data/types';

// ---------------------------------------------------------------------------
// Fallback: if the API doesn't return is_featured yet, treat the portfolio
// monorepo as featured based on its repository URL fragment.
// ---------------------------------------------------------------------------
const FEATURED_REPOSITORY_FRAGMENT: string = 'vinicius-portfolio';

export const isFeaturedShowcaseProject = (project: Project): boolean => {
  if (project.is_featured) {
    return true;
  }
  return project.repository_url?.includes(FEATURED_REPOSITORY_FRAGMENT) ?? false;
};

// ---------------------------------------------------------------------------
// Partition projects into two tiers for the /projects page layout.
// ---------------------------------------------------------------------------
export interface ProjectPartition {
  featured: Project[];
  studies: Project[];
}

export const partitionProjectsByTier = (projects: Project[]): ProjectPartition => ({
  featured: projects.filter(isFeaturedShowcaseProject),
  studies: projects.filter((p: Project) => !isFeaturedShowcaseProject(p)),
});

// ---------------------------------------------------------------------------
// Legacy ordering used by the home page compact showcase (unchanged).
// ---------------------------------------------------------------------------
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
