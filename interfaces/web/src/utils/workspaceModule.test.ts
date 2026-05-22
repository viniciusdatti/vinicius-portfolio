// Core
import { describe, it, expect } from 'vitest';

// Utils
import {
  resolveWorkspaceModule,
  getWorkspaceModulePath,
  formatSessionLabel,
} from './workspaceModule';

// Types
import { WorkspaceModule } from '../types';

/* *************** TEST EXECUTION *************** */

describe('workspaceModule utils', (): void => {
  // METHOD: resolveWorkspaceModule *******************************

  describe('resolveWorkspaceModule', (): void => {
    it('should map known paths to modules', (): void => {
      expect(resolveWorkspaceModule('/')).toBe(WorkspaceModule.Identity);
      expect(resolveWorkspaceModule('/about')).toBe(WorkspaceModule.Identity);
      expect(resolveWorkspaceModule('/projects')).toBe(WorkspaceModule.Cases);
      expect(resolveWorkspaceModule('/skills')).toBe(WorkspaceModule.Capabilities);
      expect(resolveWorkspaceModule('/live-lab')).toBe(WorkspaceModule.Cases);
    });

    it('should fall back to Identity for unknown paths', (): void => {
      expect(resolveWorkspaceModule('/unknown')).toBe(WorkspaceModule.Identity);
      expect(resolveWorkspaceModule('/admin')).toBe(WorkspaceModule.Identity);
    });
  });

  // METHOD: getWorkspaceModulePath *******************************

  describe('getWorkspaceModulePath', (): void => {
    it('should return correct path for each module', (): void => {
      expect(getWorkspaceModulePath(WorkspaceModule.Identity)).toBe('/');
      expect(getWorkspaceModulePath(WorkspaceModule.Cases)).toBe('/projects');
      expect(getWorkspaceModulePath(WorkspaceModule.Capabilities)).toBe('/skills');
    });
  });

  // METHOD: formatSessionLabel *******************************

  describe('formatSessionLabel', (): void => {
    it('should return null for null input', (): void => {
      expect(formatSessionLabel(null)).toBeNull();
    });

    it('should return last 6 chars uppercased without dashes', (): void => {
      expect(formatSessionLabel('abc123-xyz')).toBe('123XYZ');
    });

    it('should return full string uppercased when stripped length is ≤6 chars', (): void => {
      expect(formatSessionLabel('ab-cd')).toBe('ABCD');
    });
  });
});
