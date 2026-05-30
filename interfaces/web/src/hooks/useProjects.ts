// Libraries
import { useQuery, UseQueryResult } from '@tanstack/react-query';

// Api
import { getProjects } from '../api';

// Types
import { Project } from '../data/types';

export const projectsQueryKey = (technology?: string): string[] => [
  'projects',
  technology ?? 'all',
];

export const useProjects = (
  technology?: string,
): UseQueryResult<Project[], Error> => useQuery<Project[], Error>({
  queryKey: projectsQueryKey(technology),
  queryFn: (): Promise<Project[]> => getProjects(technology),
});
