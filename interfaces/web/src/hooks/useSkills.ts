/**
 * Hook for fetching skills from the API.
 */

// Libraries
import { useQuery } from '@tanstack/react-query';

// Types
import type { UseQueryResult } from '@tanstack/react-query';
import type { Skill } from '../types';

// Components
import { getSkills } from '../api';

/**
 * Query key for skills.
 */
export const skillsQueryKey = (category?: string): string[] => [
  'skills',
  category ?? 'all',
];

/**
 * Hook to fetch skills with optional category filter.
 *
 * @param category - Optional category (e.g. frontend, backend) to filter by
 * @returns Query result with skills data, loading and error states
 */
export const useSkills = (
  category?: string,
): UseQueryResult<Skill[], Error> => useQuery<Skill[], Error>({
  queryKey: skillsQueryKey(category),
  queryFn: (): Promise<Skill[]> => getSkills(category),
});
