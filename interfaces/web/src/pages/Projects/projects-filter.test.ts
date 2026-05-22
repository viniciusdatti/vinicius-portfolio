// Core
import { describe, it, expect } from 'vitest';

// Types
import type { Project } from '../../data/types';

// Fixtures
import { mockProjectList } from '../../test/fixtures';

/* ***********************************************************************************************
 *************************************** Helpers *************************************************
 *********************************************************************************************** */

/**
 * Replica da lógica de filtragem de Projects.tsx — testada isolada do componente.
 */
const filterProjects = (
  projects: Project[],
  techFilter: string,
  search: string,
  isPt: boolean
): Project[] => {
  let list: Project[] = projects;

  if (techFilter !== 'all') {
    list = list.filter((p: Project) =>
      p.technologies.some((t) => t.slug === techFilter)
    );
  }

  const q: string = search.trim().toLowerCase();
  if (q) {
    const title = (p: Project): string =>
      (isPt ? p.title_pt ?? p.title : p.title).toLowerCase();
    list = list.filter((p: Project) => title(p).includes(q));
  }

  return list;
};

/* ***********************************************************************************************
 *************************************** Tests ***************************************************
 *********************************************************************************************** */

describe('projects filtering', () => {
  const projects: Project[] = mockProjectList();

  it('returns all projects when filter is "all" and no search', () => {
    expect(filterProjects(projects, 'all', '', false)).toHaveLength(3);
  });

  it('filters by technology slug', () => {
    const result = filterProjects(projects, 'react', '', false);
    expect(
      result.every((p) => p.technologies.some((t) => t.slug === 'react'))
    ).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('returns empty array when no project matches slug', () => {
    expect(filterProjects(projects, 'rust', '', false)).toHaveLength(0);
  });

  it('filters by search query (case-insensitive)', () => {
    const result = filterProjects(projects, 'all', 'patriot', false);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('PatriotDashboard');
  });

  it('search is case-insensitive', () => {
    const upper = filterProjects(projects, 'all', 'PATRIOT', false);
    const lower = filterProjects(projects, 'all', 'patriot', false);
    expect(upper).toEqual(lower);
  });

  it('combines tech filter and search', () => {
    const result = filterProjects(projects, 'react', 'patriot', false);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it('returns empty when combined filters match nothing', () => {
    expect(filterProjects(projects, 'socketio', 'patriot', false)).toHaveLength(0);
  });

  it('uses title_pt when isPt is true', () => {
    const result = filterProjects(projects, 'all', 'patriot', true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('falls back to title when title_pt is null and isPt is true', () => {
    const result = filterProjects(projects, 'all', 'OtherProject', true);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('OtherProject');
  });
});
