/**
 * Type definitions for portfolio data.
 * These types mirror the API response structure.
 */

/**
 * Technology associated with a project.
 */
export interface Technology {
  id: number;
  name: string;
  slug: string;
}

/**
 * Project from the API.
 */
export interface Project {
  id: number;
  title: string;
  title_pt: string | null;
  description: string | null;
  description_pt: string | null;
  repository_url: string;
  demo_url: string | null;
  technologies: Technology[];
  created_at: string;
  updated_at: string;
}
