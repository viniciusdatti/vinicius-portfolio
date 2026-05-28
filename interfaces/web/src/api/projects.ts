/**
 * Projects API functions.
 */

// Types
import type { Project } from '../data/types';

// Component
import { apiClient } from './client';

export const getProjects = async (
  technology?: string,
): Promise<Project[]> => apiClient.get<Project[]>('/projects', { technology });
