// Libraries
import { useQuery, UseQueryResult } from '@tanstack/react-query';

// Api
import { getSkills } from '../api';

// Types
import { Skill } from '../types';

export const skillsQueryKey = (category?: string): string[] => [
  'skills',
  category ?? 'all',
];

const SKILLS_QUERY_RETRY_COUNT: number = 3;

const resolveSkillsQueryRetryDelay = (attemptIndex: number): number => (
  Math.min(1000 * 2 ** attemptIndex, 12000)
);

export const useSkills = (
  category?: string,
): UseQueryResult<Skill[], Error> => useQuery<Skill[], Error>({
  queryKey: skillsQueryKey(category),
  queryFn: (): Promise<Skill[]> => getSkills(category),
  retry: SKILLS_QUERY_RETRY_COUNT,
  retryDelay: resolveSkillsQueryRetryDelay,
});
