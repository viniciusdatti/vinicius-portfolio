// Types
import { Skill } from '../../types';

export enum SkillLayoutTier {
  Hero = 'hero',
  CoreLarge = 'core_large',
  CoreMedium = 'core_medium',
  PeripheralFeatured = 'peripheral_featured',
  PeripheralInstrument = 'peripheral_instrument',
  PeripheralStandard = 'peripheral_standard',
  PeripheralCompact = 'peripheral_compact',
  PeripheralMinimal = 'peripheral_minimal',
}

export interface SkillLayoutPlacement {
  skill: Skill;
  tier: SkillLayoutTier;
  gridSpan: number;
}

export interface EditorialSkillsLayout {
  hero: Skill | null;
  coreRow: SkillLayoutPlacement[];
  peripheral: SkillLayoutPlacement[];
}

interface SkillLayoutRegistryEntry {
  tier: SkillLayoutTier;
  gridSpan: number;
}

const HERO_SKILL_NAME: string = 'React';

const CORE_SKILL_NAMES: readonly string[] = [
  'TypeScript',
  'Python',
  'FastAPI',
  'PostgreSQL',
];

const SKILL_LAYOUT_REGISTRY: Record<string, SkillLayoutRegistryEntry> = {
  React: { tier: SkillLayoutTier.Hero, gridSpan: 12 },
  TypeScript: { tier: SkillLayoutTier.CoreLarge, gridSpan: 2 },
  Python: { tier: SkillLayoutTier.CoreMedium, gridSpan: 1 },
  FastAPI: { tier: SkillLayoutTier.CoreMedium, gridSpan: 1 },
  PostgreSQL: { tier: SkillLayoutTier.CoreLarge, gridSpan: 2 },
  'Styled Components': { tier: SkillLayoutTier.PeripheralFeatured, gridSpan: 2 },
  WebSocket: { tier: SkillLayoutTier.PeripheralFeatured, gridSpan: 2 },
  Storybook: { tier: SkillLayoutTier.PeripheralFeatured, gridSpan: 2 },
  JavaScript: { tier: SkillLayoutTier.PeripheralStandard, gridSpan: 1 },
  Jest: { tier: SkillLayoutTier.PeripheralStandard, gridSpan: 1 },
  Docker: { tier: SkillLayoutTier.PeripheralStandard, gridSpan: 1 },
  Vite: { tier: SkillLayoutTier.PeripheralStandard, gridSpan: 1 },
  'React Hook Form': { tier: SkillLayoutTier.PeripheralStandard, gridSpan: 1 },
  HTML5: { tier: SkillLayoutTier.PeripheralCompact, gridSpan: 1 },
  CSS3: { tier: SkillLayoutTier.PeripheralCompact, gridSpan: 1 },
  Playwright: { tier: SkillLayoutTier.PeripheralCompact, gridSpan: 1 },
  Git: { tier: SkillLayoutTier.PeripheralCompact, gridSpan: 1 },
  Zod: { tier: SkillLayoutTier.PeripheralCompact, gridSpan: 1 },
};

const FALLBACK_TIERS: readonly SkillLayoutTier[] = [
  SkillLayoutTier.PeripheralStandard,
  SkillLayoutTier.PeripheralCompact,
  SkillLayoutTier.PeripheralFeatured,
  SkillLayoutTier.PeripheralMinimal,
  SkillLayoutTier.PeripheralStandard,
  SkillLayoutTier.PeripheralCompact,
];

const FALLBACK_SPANS: readonly number[] = [1, 1, 2, 1, 1, 2];

const sortSkillsByDisplayOrder = (skills: Skill[]): Skill[] => (
  [...skills].sort((a: Skill, b: Skill): number => a.display_order - b.display_order)
);

const resolveRegistryEntry = (skill: Skill, fallbackIndex: number): SkillLayoutRegistryEntry => {
  const registered: SkillLayoutRegistryEntry | undefined = SKILL_LAYOUT_REGISTRY[skill.name];
  if (registered) {
    return registered;
  }

  return {
    tier: FALLBACK_TIERS[fallbackIndex % FALLBACK_TIERS.length],
    gridSpan: FALLBACK_SPANS[fallbackIndex % FALLBACK_SPANS.length],
  };
};

const toPlacement = (skill: Skill, fallbackIndex: number): SkillLayoutPlacement => {
  const entry: SkillLayoutRegistryEntry = resolveRegistryEntry(skill, fallbackIndex);
  return {
    skill,
    tier: entry.tier,
    gridSpan: entry.gridSpan,
  };
};

export const buildEditorialSkillsLayout = (skills: Skill[]): EditorialSkillsLayout => {
  const ordered: Skill[] = sortSkillsByDisplayOrder(skills);

  // Reserve hero + core names; remaining skills flow into peripheral tiers.
  const heroSkill: Skill | undefined = ordered.find(
    (skill: Skill): boolean => skill.name === HERO_SKILL_NAME,
  );
  const hero: Skill | null = heroSkill ?? null;

  const coreNamesSet: Set<string> = new Set(CORE_SKILL_NAMES);
  const coreSkills: Skill[] = ordered.filter(
    (skill: Skill): boolean => coreNamesSet.has(skill.name),
  );

  const reservedIds: Set<number> = new Set<number>([
    ...(hero ? [hero.id] : []),
    ...coreSkills.map((skill: Skill): number => skill.id),
  ]);

  const peripheralSkills: Skill[] = ordered.filter(
    (skill: Skill): boolean => !reservedIds.has(skill.id),
  );

  let fallbackIndex: number = 0;

  const coreRow: SkillLayoutPlacement[] = coreSkills.map(
    (skill: Skill): SkillLayoutPlacement => {
      const placement: SkillLayoutPlacement = toPlacement(skill, fallbackIndex);
      fallbackIndex += 1;
      return placement;
    },
  );

  const peripheral: SkillLayoutPlacement[] = peripheralSkills.map(
    (skill: Skill): SkillLayoutPlacement => {
      const placement: SkillLayoutPlacement = toPlacement(skill, fallbackIndex);
      fallbackIndex += 1;
      return placement;
    },
  );

  const sortFeaturedFirst = (
    placements: SkillLayoutPlacement[],
  ): SkillLayoutPlacement[] => (
    [...placements].sort(
      (a: SkillLayoutPlacement, b: SkillLayoutPlacement): number => b.gridSpan - a.gridSpan,
    )
  );

  return {
    hero,
    coreRow: sortFeaturedFirst(coreRow),
    peripheral: sortFeaturedFirst(peripheral),
  };
};
