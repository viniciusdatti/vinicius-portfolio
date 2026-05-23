// Libraries
import type { Variants } from 'framer-motion';

// Components
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  manifestoPhrase,
  manifestoPhraseReduced,
  manifestoPhraseStagger,
  scrollReveal,
  scrollRevealReduced,
  scrollRevealItem,
  scrollRevealItemReduced,
  scrollRevealStagger,
  scrollRevealTitle,
  scrollRevealTitleReduced,
  scrollRevealViewport,
} from '@/styles/animations';

export type ScrollRevealViewport = typeof scrollRevealViewport;

/**
 * Scroll / section motion variants gated by prefers-reduced-motion.
 */
export const useScrollMotion = (): {
  section: Variants;
  title: Variants;
  stagger: Variants;
  item: Variants;
  manifestoStagger: Variants;
  manifestoPhrase: Variants;
  viewport: ScrollRevealViewport;
} => {
  const reduced = usePrefersReducedMotion();

  return {
    section: reduced ? scrollRevealReduced : scrollReveal,
    title: reduced ? scrollRevealTitleReduced : scrollRevealTitle,
    stagger: scrollRevealStagger,
    item: reduced ? scrollRevealItemReduced : scrollRevealItem,
    manifestoStagger: manifestoPhraseStagger,
    manifestoPhrase: reduced ? manifestoPhraseReduced : manifestoPhrase,
    viewport: scrollRevealViewport,
  };
};
