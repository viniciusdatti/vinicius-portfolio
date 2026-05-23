// Core
import { describe, it, expect } from 'vitest';

// Types
import { Language } from '@/types';

// Components
import {
  formatProjectSignalCode,
  getProjectDisplayTitle,
} from '@/domain/projects/projectDisplay';
import { buildFakeProject } from '@/plugins/testUtils';

// =================================================================================================
// ======================================== TEST EXECUTION =========================================
// =================================================================================================

describe('projectDisplay', (): void => {
  describe('formatProjectSignalCode', (): void => {
    it('should format zero-based index as SIG registry code', (): void => {
      expect(formatProjectSignalCode(0)).toBe('SIG-01');
      expect(formatProjectSignalCode(2)).toBe('SIG-03');
    });
  });

  describe('getProjectDisplayTitle', (): void => {
    it('should prefer repository slug over legacy fictional titles', (): void => {
      const project = buildFakeProject({
        title: 'Pulse Feed',
        title_pt: 'Pulse Feed PT',
        repository_url: 'https://github.com/viniciusdatti/ReactGram',
      });

      expect(getProjectDisplayTitle(project, Language.En)).toBe('ReactGram');
      expect(getProjectDisplayTitle(project, Language.Pt)).toBe('ReactGram');
    });
  });
});
