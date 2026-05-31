// Hooks
import { ScrollMotionContract } from '../../../../hooks/useScrollMotion';

// Types
import { SkillLayoutPlacement } from '../../../../domain/skills';

export interface SkillsEditorialPeripheralChapterProps {
  peripheral: SkillLayoutPlacement[];
  showEyebrow: boolean;
  isPt: boolean;
  scrollMotion: ScrollMotionContract;
}
