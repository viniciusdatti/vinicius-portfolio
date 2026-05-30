// Api
import { apiClient } from './client';

// Types
import { Skill } from '../types';

export const getSkills = async (category?: string): Promise<Skill[]> => apiClient.get<Skill[]>('/skills', {
  ...(category ? { category } : {}),
  active_only: 'true',
});
