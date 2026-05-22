// Core
import { describe, it, expect } from 'vitest';

// Components
import { formatProjectSignalCode } from '@/domain/projects/projectDisplay';

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
});
