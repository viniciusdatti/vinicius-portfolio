/**
 * Hook for fetching projects from the API.
 */

// Libraries
import { useQuery } from '@tanstack/react-query';

// Types
import type { UseQueryResult } from '@tanstack/react-query';
import type { Project } from '@/data/types';

// Components
import { getProjects } from '@/api';

/**
 * Query key for projects.
 */
export const projectsQueryKey = (technology?: string): string[] => [
  'projects',
  technology ?? 'all',
];

/**
 * Hook to fetch projects with optional technology filter.
 *
 * @param technology - Optional technology name or slug to filter by
 * @returns Query result with projects data, loading and error states
 */
export const useProjects = (
  technology?: string,
): UseQueryResult<Project[], Error> => useQuery<Project[], Error>({
  queryKey: projectsQueryKey(technology),
  queryFn: (): Promise<Project[]> => getProjects(technology),
});
