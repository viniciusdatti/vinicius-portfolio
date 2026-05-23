// Types
import type { Skill } from '@/types';

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

export interface SupportStackCardProps {
  skill: Skill;
  displayName: string;
  description: string | null;
  iconUrl: string;
  gridSpan: number;
}

export interface SupportStackGridPlacementProps {
  $gridSpan: number;
}
