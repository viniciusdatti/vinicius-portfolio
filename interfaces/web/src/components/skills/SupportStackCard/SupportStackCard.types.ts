// Types
import { Skill } from '../../../types';
import { SkillLayoutTier } from '../../../domain/skills';

export interface SupportStackCardProps {
  skill: Skill;
  displayName: string;
  description: string | null;
  iconUrl: string;
  tier: SkillLayoutTier;
}

export interface SupportStackCardStyleProps {
  $tier: SkillLayoutTier;
}
