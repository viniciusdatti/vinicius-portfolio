// Hooks
import { ScrollMotionContract } from '../../../hooks/useScrollMotion';

// Types
import { Skill } from '../../../types';

export interface SkillsEditorialSectionProps {
  skills: Skill[];
  isLoading: boolean;
  isError: boolean;
  isPt: boolean;
  scrollMotion: ScrollMotionContract;
  onRetry: () => void;
}
