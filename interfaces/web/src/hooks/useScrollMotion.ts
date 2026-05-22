// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Components
import {
  scrollReveal,
  scrollRevealReduced,
  scrollRevealItem,
  scrollRevealStagger,
} from '@/styles/animations';
import type { Variants } from 'framer-motion';

/**
 * Scroll / section motion variants gated by prefers-reduced-motion.
 */
export const useScrollMotion = (): {
  section: Variants;
  stagger: Variants;
  item: Variants;
} => {
  const reduced = usePrefersReducedMotion();

  return {
    section: reduced ? scrollRevealReduced : scrollReveal,
    stagger: scrollRevealStagger,
    item: scrollRevealItem,
  };
};
