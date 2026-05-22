// Core
import { describe, it, expect } from 'vitest';

// =================================================================================================
// ============================================ DOMAIN =============================================
// =================================================================================================
import {
  resolveSkillIconUrl,
  resolveSkillDisplayName,
  resolveCertificateDisplayName,
  getPlatformConfig,
  sortCertificates,
} from '@/domain/skills/skills.domain';

// =================================================================================================
// ============================================ PLUGINS ============================================
// =================================================================================================
import { buildFakeCertificate, buildFakeSkill } from '@/plugins/testUtils';

// =================================================================================================
// ======================================== TEST EXECUTION =========================================
// =================================================================================================

describe('skills.domain', (): void => {
  describe('resolveSkillIconUrl', (): void => {
    it('should use icon_url when provided as relative path', (): void => {
      const url: string = resolveSkillIconUrl(
        buildFakeSkill({ icon_url: 'icons/react.svg' }),
      );
      expect(url).toContain('icons/react.svg');
    });

    it('should fall back to known skill icon mapping', (): void => {
      const url: string = resolveSkillIconUrl(
        buildFakeSkill({ name: 'TypeScript', icon_url: null }),
      );
      expect(url).toContain('icons/typescript.svg');
    });
  });

  describe('resolveSkillDisplayName', (): void => {
    it('should return Portuguese name when available', (): void => {
      expect(resolveSkillDisplayName(
        buildFakeSkill({ name: 'Cursor', name_pt: 'Cursor' }),
        true,
      )).toBe('Cursor');
    });

    it('should fall back to English name', (): void => {
      expect(resolveSkillDisplayName(
        buildFakeSkill({ name: 'React', name_pt: null }),
        true,
      )).toBe('React');
    });
  });

  describe('resolveCertificateDisplayName', (): void => {
    it('should return Portuguese certificate name when available', (): void => {
      expect(resolveCertificateDisplayName(buildFakeCertificate(), true)).toBe('React Explorer');
    });

    it('should fall back to English certificate name', (): void => {
      expect(resolveCertificateDisplayName(
        buildFakeCertificate({ name_pt: null }),
        true,
      )).toBe('React Explorer');
    });
  });

  describe('getPlatformConfig', (): void => {
    it('should return Rocketseat branding', (): void => {
      const config = getPlatformConfig('Rocketseat');
      expect(config.color).toBe('#8257e5');
      expect(config.logo).toContain('data:image/svg+xml');
    });

    it('should return default config for unknown platforms', (): void => {
      const config = getPlatformConfig('Unknown');
      expect(config.color).toBe('#64748b');
    });
  });

  describe('sortCertificates', (): void => {
    it('should order by platform priority then display order', (): void => {
      const sorted = sortCertificates([
        buildFakeCertificate({ id: 1, platform: 'Udemy', display_order: 0 }),
        buildFakeCertificate({ id: 2, platform: 'Rocketseat', display_order: 1 }),
        buildFakeCertificate({ id: 3, platform: 'Alura', display_order: 0 }),
      ]);

      expect(sorted.map((cert) => cert.platform)).toEqual(['Rocketseat', 'Alura', 'Udemy']);
    });
  });
});
