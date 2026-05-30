// Api
import { apiClient } from './client';

// Types
import { Project } from '../data/types';

export const getProjects = async (
  technology?: string,
): Promise<Project[]> => apiClient.get<Project[]>('/projects', { technology });
