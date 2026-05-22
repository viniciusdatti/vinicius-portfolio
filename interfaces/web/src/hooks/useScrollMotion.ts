// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Components
import {
  chapterAside,
  chapterAsideReduced,
  chapterPanel,
  chapterPanelReduced,
  manifestoPhrase,
  manifestoPhraseReduced,
  manifestoPhraseStagger,
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
  manifestoStagger: Variants;
  manifestoPhrase: Variants;
  chapterAside: Variants;
  chapterPanel: Variants;
} => {
  const reduced = usePrefersReducedMotion();

  return {
    section: reduced ? scrollRevealReduced : scrollReveal,
    stagger: scrollRevealStagger,
    item: scrollRevealItem,
    manifestoStagger: manifestoPhraseStagger,
    manifestoPhrase: reduced ? manifestoPhraseReduced : manifestoPhrase,
    chapterAside: reduced ? chapterAsideReduced : chapterAside,
    chapterPanel: reduced ? chapterPanelReduced : chapterPanel,
  };
};
