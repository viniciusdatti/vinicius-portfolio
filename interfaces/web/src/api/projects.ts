/**
 * Projects API functions.
 */

import { apiClient } from '@/api/client';
import type { Project } from '@/data/types';

/**
 * Fetch all projects from the API.
 *
 * @param technology - Optional technology filter
 * @returns Promise with array of projects
 */
export const getProjects = async (
  technology?: string,
): Promise<Project[]> => apiClient.get<Project[]>('/projects', { technology });
