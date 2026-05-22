/**
 * Skills API functions.
 */

import { apiClient } from '@/api/client';
import type { Skill } from '@/types';

/**
 * Fetch all skills from the API, optionally filtered by category.
 *
 * @param category - Optional SkillCategory to filter (e.g. 'frontend', 'backend')
 * @returns Promise with array of skills
 */
export const getSkills = async (category?: string): Promise<Skill[]> => apiClient.get<Skill[]>('/skills', {
  ...(category ? { category } : {}),
  active_only: 'true',
});
