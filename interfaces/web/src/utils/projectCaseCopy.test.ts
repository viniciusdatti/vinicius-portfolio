// Libraries
import { describe, it, expect } from 'vitest';

// Types
import { ProjectCaseStudyField } from '../types/projectCase';

// Components
import { buildFakeProject } from '../plugins/testUtils';

// Component
import {
  getProjectRepoSlug,
  getProjectCaseStudyKey,
} from './projectCaseCopy';

describe('projectCaseCopy utils', (): void => {
  // METHOD: getProjectRepoSlug *******************************

  describe('getProjectRepoSlug', (): void => {
    it('should extract last path segment from GitHub URL', (): void => {
      expect(
        getProjectRepoSlug('https://github.com/user/patriotdashboard'),
      ).toBe('patriotdashboard');
    });

    it('should handle trailing slash', (): void => {
      expect(getProjectRepoSlug('https://github.com/user/repo/')).toBe('repo');
    });
  });

  // METHOD: getProjectCaseStudyKey *******************************

  describe('getProjectCaseStudyKey', (): void => {
    it('should build correct i18n key', (): void => {
      const project = buildFakeProject({
        repository_url: 'https://github.com/user/patriotdashboard',
      });
      const key: string = getProjectCaseStudyKey(project, ProjectCaseStudyField.Framing);
      expect(key).toBe('projects.caseStudies.patriotdashboard.framing');
    });
  });
});
