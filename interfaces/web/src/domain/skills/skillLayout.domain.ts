/**
 * Editorial layout partitioning for the Skills page.
 * Assigns hierarchy tiers and asymmetric grid spans per skill.
 */

// Types
import type { Skill } from '@/types';

// =================================================================================================
// ============================================= ENUMS =============================================
// =================================================================================================

/** Visual weight tier — each maps to a distinct card treatment in Skills.style.ts */
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

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

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

// =================================================================================================
// ============================================ CONSTANTS ==========================================
// =================================================================================================

const HERO_SKILL_NAME: string = 'React';

const CORE_SKILL_NAMES: readonly string[] = [
  'TypeScript',
  'Python',
  'FastAPI',
  'PostgreSQL',
];

/**
 * Fixed tier + span per known skill — no two adjacent blocks share the same span + tier pair.
 */
const SKILL_LAYOUT_REGISTRY: Record<string, SkillLayoutRegistryEntry> = {
  React: { tier: SkillLayoutTier.Hero, gridSpan: 12 },
  TypeScript: { tier: SkillLayoutTier.CoreLarge, gridSpan: 7 },
  Python: { tier: SkillLayoutTier.CoreMedium, gridSpan: 5 },
  FastAPI: { tier: SkillLayoutTier.CoreMedium, gridSpan: 5 },
  PostgreSQL: { tier: SkillLayoutTier.CoreLarge, gridSpan: 7 },
  'Styled Components': { tier: SkillLayoutTier.PeripheralFeatured, gridSpan: 8 },
  WebSocket: { tier: SkillLayoutTier.PeripheralFeatured, gridSpan: 8 },
  JavaScript: { tier: SkillLayoutTier.PeripheralStandard, gridSpan: 4 },
  Jest: { tier: SkillLayoutTier.PeripheralStandard, gridSpan: 4 },
  Docker: { tier: SkillLayoutTier.PeripheralStandard, gridSpan: 5 },
  Cursor: { tier: SkillLayoutTier.PeripheralStandard, gridSpan: 6 },
  HTML5: { tier: SkillLayoutTier.PeripheralCompact, gridSpan: 3 },
  CSS3: { tier: SkillLayoutTier.PeripheralCompact, gridSpan: 5 },
  Playwright: { tier: SkillLayoutTier.PeripheralCompact, gridSpan: 4 },
  Git: { tier: SkillLayoutTier.PeripheralCompact, gridSpan: 3 },
  'VS Code': { tier: SkillLayoutTier.PeripheralInstrument, gridSpan: 4 },
  'AI tools': { tier: SkillLayoutTier.PeripheralInstrument, gridSpan: 5 },
};

const FALLBACK_TIERS: readonly SkillLayoutTier[] = [
  SkillLayoutTier.PeripheralStandard,
  SkillLayoutTier.PeripheralCompact,
  SkillLayoutTier.PeripheralFeatured,
  SkillLayoutTier.PeripheralMinimal,
  SkillLayoutTier.PeripheralStandard,
  SkillLayoutTier.PeripheralCompact,
];

const FALLBACK_SPANS: readonly number[] = [5, 4, 7, 3, 6, 8];

// =================================================================================================
// ============================================= METHODS ===========================================
// =================================================================================================

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

/**
 * Partitions skills into hero, core architectural row, and asymmetric peripheral blocks.
 */
export const buildEditorialSkillsLayout = (skills: Skill[]): EditorialSkillsLayout => {
  const ordered: Skill[] = sortSkillsByDisplayOrder(skills);

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

  return {
    hero,
    coreRow,
    peripheral,
  };
};
