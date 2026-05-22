// Core
import { describe, it, expect } from 'vitest';

// Utils
import {
  getProjectRepoSlug,
  getProjectCaseStudyKey,
  ProjectCaseStudyField,
} from '../utils/projectCaseCopy';
import {
  resolveWorkspaceModule,
  getWorkspaceModulePath,
  formatSessionLabel,
} from '../utils/workspaceModule';

// Types
import { WorkspaceModule } from '../types';

// Fixtures
import { mockProject } from './fixtures';

/* ***********************************************************************************************
 *************************************** getProjectRepoSlug **************************************
 *********************************************************************************************** */

describe('getProjectRepoSlug', () => {
  it('extracts last path segment from GitHub URL', () => {
    expect(
      getProjectRepoSlug('https://github.com/user/patriotdashboard')
    ).toBe('patriotdashboard');
  });

  it('handles trailing slash', () => {
    expect(getProjectRepoSlug('https://github.com/user/repo/')).toBe('repo');
  });
});

/* ***********************************************************************************************
 *************************************** getProjectCaseStudyKey **********************************
 *********************************************************************************************** */

describe('getProjectCaseStudyKey', () => {
  it('builds correct i18n key', () => {
    const project = mockProject({
      repository_url: 'https://github.com/user/patriotdashboard',
    });
    const key = getProjectCaseStudyKey(project, ProjectCaseStudyField.Framing);
    expect(key).toBe('projects.caseStudies.patriotdashboard.framing');
  });
});

/* ***********************************************************************************************
 *************************************** resolveWorkspaceModule **********************************
 *********************************************************************************************** */

describe('resolveWorkspaceModule', () => {
  it('maps known paths to modules', () => {
    expect(resolveWorkspaceModule('/')).toBe(WorkspaceModule.Identity);
    expect(resolveWorkspaceModule('/about')).toBe(WorkspaceModule.Identity);
    expect(resolveWorkspaceModule('/projects')).toBe(WorkspaceModule.Cases);
    expect(resolveWorkspaceModule('/skills')).toBe(WorkspaceModule.Capabilities);
    expect(resolveWorkspaceModule('/live-lab')).toBe(WorkspaceModule.Cases);
  });

  it('falls back to Identity for unknown paths', () => {
    expect(resolveWorkspaceModule('/unknown')).toBe(WorkspaceModule.Identity);
    expect(resolveWorkspaceModule('/admin')).toBe(WorkspaceModule.Identity);
  });
});

/* ***********************************************************************************************
 *************************************** getWorkspaceModulePath **********************************
 *********************************************************************************************** */

describe('getWorkspaceModulePath', () => {
  it('returns correct path for each module', () => {
    expect(getWorkspaceModulePath(WorkspaceModule.Identity)).toBe('/');
    expect(getWorkspaceModulePath(WorkspaceModule.Cases)).toBe('/projects');
    expect(getWorkspaceModulePath(WorkspaceModule.Capabilities)).toBe('/skills');
  });
});

/* ***********************************************************************************************
 *************************************** formatSessionLabel **************************************
 *********************************************************************************************** */

describe('formatSessionLabel', () => {
  it('returns null for null input', () => {
    expect(formatSessionLabel(null)).toBeNull();
  });

  it('returns last 6 chars uppercased without dashes', () => {
    // 'abc123-xyz' → strip dashes → 'abc123xyz' (9 chars) → last 6 → '123xyz' upper → '123XYZ'
    expect(formatSessionLabel('abc123-xyz')).toBe('123XYZ');
  });

  it('returns full string uppercased when stripped length is ≤6 chars', () => {
    // 'ab-cd' → strip → 'abcd' (4 chars ≤ 6) → 'ABCD'
    expect(formatSessionLabel('ab-cd')).toBe('ABCD');
  });
});
