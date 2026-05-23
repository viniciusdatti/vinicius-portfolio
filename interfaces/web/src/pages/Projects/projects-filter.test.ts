// Core
import { describe, it, expect } from 'vitest';

// Types
import type { Project } from '@/data/types';

// Components
import { filterProjectsBySearch } from '@/domain/projects';
import { buildFakeProject, MOCKED_PROJECT_LIST } from '@/plugins/testUtils';

/* *************************************************************************************************
 **************************************** TEST SUPPORT VARS ****************************************
 ************************************************************************************************ */

const projects: Project[] = MOCKED_PROJECT_LIST;

/* *************************************************************************************************
 ***************************************** TEST EXECUTION ******************************************
 ************************************************************************************************ */

describe('projects search filter', (): void => {
  it('should return all projects when search is empty', (): void => {
    expect(filterProjectsBySearch(projects, '', false)).toHaveLength(3);
  });

  it('should filter by search query (case-insensitive)', (): void => {
    const result: Project[] = filterProjectsBySearch(projects, 'reactgram', false);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('ReactGram');
  });

  it('should treat search as case-insensitive', (): void => {
    const upper: Project[] = filterProjectsBySearch(projects, 'REACTGRAM', false);
    const lower: Project[] = filterProjectsBySearch(projects, 'reactgram', false);
    expect(upper).toEqual(lower);
  });

  it('should use title_pt when isPt is true', (): void => {
    const result: Project[] = filterProjectsBySearch(projects, 'tasks-flask', true);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('tasks-flask-crud');
  });

  it('should fall back to title when title_pt is null and isPt is true', (): void => {
    const withFallback: Project[] = [
      ...projects,
      buildFakeProject({
        id: 99,
        title: 'sample-flask-auth',
        title_pt: null,
        repository_url: 'https://github.com/viniciusdatti/sample-flask-auth',
      }),
    ];
    const result: Project[] = filterProjectsBySearch(withFallback, 'sample-flask', true);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('sample-flask-auth');
  });

  it('should return empty array when search matches nothing', (): void => {
    expect(filterProjectsBySearch(projects, 'rust', false)).toHaveLength(0);
  });
});
