/**
 * Skills API functions.
 */

// Types
import type { Skill } from '../types';

// Component
import { apiClient } from './client';

export const getSkills = async (category?: string): Promise<Skill[]> => apiClient.get<Skill[]>('/skills', {
  ...(category ? { category } : {}),
  active_only: 'true',
});
