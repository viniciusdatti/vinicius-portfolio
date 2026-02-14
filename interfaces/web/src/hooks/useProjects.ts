/**
 * Hook for fetching projects from the API.
 */

import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../api';
import type { Project } from '../data/types';

/**
 * Query key for projects.
 */
export const projectsQueryKey = (technology?: string) => ['projects', technology ?? 'all'];

/**
 * Hook to fetch projects with optional technology filter.
 *
 * @param technology - Optional technology name or slug to filter by
 * @returns Query result with projects data, loading and error states
 */
export function useProjects(technology?: string) {
  return useQuery<Project[], Error>({
    queryKey: projectsQueryKey(technology),
    queryFn: () => getProjects(technology),
  });
}
