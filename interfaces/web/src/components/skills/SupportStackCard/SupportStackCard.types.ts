// Types
import type { Skill } from '@/types';

// Domain
import type { SkillLayoutTier } from '@/domain/skills';

/* *************************************************************************************************
 ********************************************** TYPES **********************************************
 ************************************************************************************************ */

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
