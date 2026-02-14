/**
 * Hook for fetching projects from the API.
 */

import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../api';
import type { Project } from '../data/types';

// Types
import type { UseQueryResult } from '@tanstack/react-query';

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
export function useProjects(
  technology?: string
): UseQueryResult<Project[], Error> {
  return useQuery<Project[], Error>({
    queryKey: projectsQueryKey(technology),
    queryFn: (): Promise<Project[]> => getProjects(technology),
  });
}
