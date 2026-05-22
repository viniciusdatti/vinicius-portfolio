// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Components
import {
  heroBootChip,
  heroBootChipReduced,
  heroBootChipStagger,
  heroBootModule,
  heroBootModuleReduced,
  heroBootSequence,
  heroBootStatus,
  heroBootStatusReduced,
  heroBootStatusStagger,
  heroBootChar,
  heroBootCharReduced,
  heroBootWord,
  heroBootWordReduced,
} from '@/styles/animations';
import type { Variants } from 'framer-motion';

/**
 * Hero boot orchestration variants gated by prefers-reduced-motion.
 */
export const useHeroBootMotion = (): {
  sequence: Variants;
  statusStagger: Variants;
  status: Variants;
  char: Variants;
  word: Variants;
  module: Variants;
  chipStagger: Variants;
  chip: Variants;
} => {
  const reduced: boolean = usePrefersReducedMotion();

  return {
    sequence: heroBootSequence,
    statusStagger: heroBootStatusStagger,
    status: reduced ? heroBootStatusReduced : heroBootStatus,
    char: reduced ? heroBootCharReduced : heroBootChar,
    word: reduced ? heroBootWordReduced : heroBootWord,
    module: reduced ? heroBootModuleReduced : heroBootModule,
    chipStagger: heroBootChipStagger,
    chip: reduced ? heroBootChipReduced : heroBootChip,
  };
};
