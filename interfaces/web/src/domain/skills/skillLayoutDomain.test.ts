// Libraries
import {
  describe,
  it,
  expect,
} from 'vitest';

// Plugins
import { buildFakeSkill } from '../../plugins/testUtils';

// Skills
import {
  buildEditorialSkillsLayout,
  SkillLayoutTier,
} from './skillLayoutDomain';

describe('skillLayoutDomain', (): void => {
  describe('buildEditorialSkillsLayout', (): void => {
    it('should place React as hero and core stack in coreRow', (): void => {
      const layout = buildEditorialSkillsLayout([
        buildFakeSkill({ id: 1, name: 'React', display_order: 0 }),
        buildFakeSkill({ id: 2, name: 'TypeScript', display_order: 1 }),
        buildFakeSkill({ id: 3, name: 'Python', display_order: 2 }),
        buildFakeSkill({ id: 4, name: 'Git', display_order: 11 }),
      ]);

      expect(layout.hero?.name).toBe('React');
      expect(layout.coreRow.map((item) => item.skill.name)).toEqual([
        'TypeScript',
        'Python',
      ]);
      expect(layout.peripheral.map((item) => item.skill.name)).toEqual(['Git']);
    });

    it('should assign distinct tiers to core architectural skills', (): void => {
      const layout = buildEditorialSkillsLayout([
        buildFakeSkill({ id: 1, name: 'TypeScript', display_order: 1 }),
        buildFakeSkill({ id: 2, name: 'FastAPI', display_order: 7 }),
      ]);

      expect(layout.hero).toBeNull();
      expect(layout.coreRow[0].tier).toBe(SkillLayoutTier.CoreLarge);
      expect(layout.coreRow[0].gridSpan).toBe(2);
      expect(layout.coreRow[1].tier).toBe(SkillLayoutTier.CoreMedium);
      expect(layout.coreRow[1].gridSpan).toBe(1);
    });

    it('should place grid-span-2 featured cards before single-column items', (): void => {
      const layout = buildEditorialSkillsLayout([
        buildFakeSkill({ id: 1, name: 'Python', display_order: 2 }),
        buildFakeSkill({ id: 2, name: 'TypeScript', display_order: 1 }),
        buildFakeSkill({ id: 3, name: 'Styled Components', display_order: 20 }),
        buildFakeSkill({ id: 4, name: 'Git', display_order: 11 }),
      ]);

      expect(layout.coreRow[0].gridSpan).toBe(2);
      expect(layout.coreRow[0].skill.name).toBe('TypeScript');
      expect(layout.peripheral[0].gridSpan).toBe(2);
      expect(layout.peripheral[0].skill.name).toBe('Styled Components');
    });

    it('should sort by display_order before partitioning', (): void => {
      const layout = buildEditorialSkillsLayout([
        buildFakeSkill({ id: 1, name: 'Git', display_order: 11 }),
        buildFakeSkill({ id: 2, name: 'Jest', display_order: 9 }),
      ]);

      expect(layout.peripheral.map((item) => item.skill.name)).toEqual(['Jest', 'Git']);
    });

    it('should assign featured and standard tiers to Storybook, Vite, and Zod', (): void => {
      const layout = buildEditorialSkillsLayout([
        buildFakeSkill({ id: 1, name: 'Storybook', display_order: 12 }),
        buildFakeSkill({ id: 2, name: 'Vite', display_order: 13 }),
        buildFakeSkill({ id: 3, name: 'Zod', display_order: 14 }),
      ]);

      const storybook = layout.peripheral.find((item) => item.skill.name === 'Storybook');
      const vite = layout.peripheral.find((item) => item.skill.name === 'Vite');
      const zod = layout.peripheral.find((item) => item.skill.name === 'Zod');

      expect(storybook?.tier).toBe(SkillLayoutTier.PeripheralFeatured);
      expect(storybook?.gridSpan).toBe(2);
      expect(vite?.tier).toBe(SkillLayoutTier.PeripheralStandard);
      expect(vite?.gridSpan).toBe(1);
      expect(zod?.tier).toBe(SkillLayoutTier.PeripheralCompact);
      expect(zod?.gridSpan).toBe(1);
    });
  });
});
