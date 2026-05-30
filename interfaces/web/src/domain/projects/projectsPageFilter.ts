// Types
import { Project } from '@/data/types';

export const filterProjectsBySearch = (
  projects: Project[],
  search: string,
  isPt: boolean,
): Project[] => {
  const q: string = search.trim().toLowerCase();
  if (!q) {
    return projects;
  }
  const title = (p: Project): string => (
    isPt ? p.title_pt ?? p.title : p.title
  ).toLowerCase();
  return projects.filter((p: Project) => title(p).includes(q));
};
