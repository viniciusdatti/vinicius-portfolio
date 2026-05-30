// Libraries
import { Variants } from 'framer-motion';

// Hooks
import { ScrollMotionContract } from '../../../../hooks/useScrollMotion';

// Types
import { SkillLayoutPlacement } from '../../../../domain/skills';
import { Skill } from '../../../../types';

export interface SkillsEditorialSkillCardProps {
  placement: SkillLayoutPlacement;
  isPt: boolean;
  itemVariants: Variants;
  translate: (key: string) => string;
}

export interface SkillsEditorialCoreChapterProps {
  hero: Skill | null;
  coreRow: SkillLayoutPlacement[];
  isPt: boolean;
  scrollMotion: ScrollMotionContract;
}
