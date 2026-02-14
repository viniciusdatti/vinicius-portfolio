/**
 * Projects API functions.
 */

import { apiClient } from './client';
import type { Project } from '../data/types';

/**
 * Fetch all projects from the API.
 *
 * @param technology - Optional technology filter
 * @returns Promise with array of projects
 */
export async function getProjects(technology?: string): Promise<Project[]> {
  return apiClient.get<Project[]>('/projects', { technology });
}
