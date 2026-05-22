// Core
import { describe, it, expect } from 'vitest';

// Types
import type { Project } from '../../data/types';

// Plugins
import { MOCKED_PROJECT_LIST } from '../../plugins/testUtils';

/* *************** TEST SUPPORT VARS *************** */

/**
 * Replica da lógica de filtragem de Projects.tsx — testada isolada do componente.
 */
const filterProjects = (
  projects: Project[],
  techFilter: string,
  search: string,
  isPt: boolean,
): Project[] => {
  let list: Project[] = projects;

  if (techFilter !== 'all') {
    list = list.filter((p: Project) => p.technologies.some((t) => t.slug === techFilter));
  }

  const q: string = search.trim().toLowerCase();
  if (q) {
    const title = (p: Project): string => (isPt ? p.title_pt ?? p.title : p.title).toLowerCase();
    list = list.filter((p: Project) => title(p).includes(q));
  }

  return list;
};

const projects: Project[] = MOCKED_PROJECT_LIST;

/* *************** TEST EXECUTION *************** */

describe('projects filtering', (): void => {
  // FILTER: all *******************************

  it('should return all projects when filter is "all" and no search', (): void => {
    expect(filterProjects(projects, 'all', '', false)).toHaveLength(3);
  });

  // FILTER: technology slug *******************************

  it('should filter by technology slug', (): void => {
    const result: Project[] = filterProjects(projects, 'react', '', false);
    expect(result).toHaveLength(2);
    expect(
      result.every((p) => p.technologies.some((t) => t.slug === 'react')),
    ).toBe(true);
  });

  it('should return empty array when no project matches slug', (): void => {
    expect(filterProjects(projects, 'rust', '', false)).toHaveLength(0);
  });

  // FILTER: search *******************************

  it('should filter by search query (case-insensitive)', (): void => {
    const result: Project[] = filterProjects(projects, 'all', 'patriot', false);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('PatriotDashboard');
  });

  it('should treat search as case-insensitive', (): void => {
    const upper: Project[] = filterProjects(projects, 'all', 'PATRIOT', false);
    const lower: Project[] = filterProjects(projects, 'all', 'patriot', false);
    expect(upper).toEqual(lower);
  });

  // FILTER: combined *******************************

  it('should combine tech filter and search', (): void => {
    const result: Project[] = filterProjects(projects, 'react', 'patriot', false);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it('should return empty when combined filters match nothing', (): void => {
    expect(filterProjects(projects, 'socketio', 'patriot', false)).toHaveLength(0);
  });

  // FILTER: locale *******************************

  it('should use title_pt when isPt is true', (): void => {
    const result: Project[] = filterProjects(projects, 'all', 'patriot', true);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('PatriotDashboard');
  });

  it('should fall back to title when title_pt is null and isPt is true', (): void => {
    const result: Project[] = filterProjects(projects, 'all', 'OtherProject', true);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('OtherProject');
  });
});
