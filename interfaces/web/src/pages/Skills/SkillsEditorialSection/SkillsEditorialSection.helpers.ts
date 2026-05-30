// Types
import { SkillLayoutTier } from '../../../domain/skills';
import { Skill } from '../../../types';

export const MARKETING_SPOTLIGHT_TIERS: ReadonlySet<SkillLayoutTier> = new Set([
  SkillLayoutTier.CoreLarge,
  SkillLayoutTier.CoreMedium,
  SkillLayoutTier.PeripheralFeatured,
]);

export const resolveCoreDomainLabel = (
  skillName: string,
  t: (key: string) => string,
): string | null => {
  const domainKey: string = `skills.layout.coreDomains.${skillName}`;
  const translated: string = t(domainKey);
  return translated === domainKey ? null : translated;
};

export const resolvePeripheralDomainLabel = (
  skillName: string,
  t: (key: string) => string,
): string | null => {
  const domainKey: string = `skills.layout.peripheralDomains.${skillName}`;
  const translated: string = t(domainKey);
  return translated === domainKey ? null : translated;
};

export const resolvePeripheralDescription = (
  skill: Skill,
  t: (key: string) => string,
): string => {
  const domainLabel: string | null = resolvePeripheralDomainLabel(skill.name, t);
  if (domainLabel) {
    return domainLabel;
  }
  return t(`skills.categories.${skill.category}`).toLowerCase();
};
