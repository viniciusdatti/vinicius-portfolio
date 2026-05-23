// Core
import React, { useMemo } from 'react';

// Libraries
import type { Variants } from 'framer-motion';

// Components
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollMotionViewport } from '@/hooks/scrollMotionViewport';
import {
  manifestoPhrase,
  manifestoPhraseReduced,
  manifestoPhraseStagger,
  scrollReveal,
  scrollRevealDepth,
  scrollRevealDepthReduced,
  scrollRevealReduced,
  scrollRevealItem,
  scrollRevealItemReduced,
  scrollRevealRow,
  scrollRevealRowReduced,
  scrollRevealRowStagger,
  scrollRevealRowStaggerReduced,
  scrollRevealStagger,
  scrollRevealStaggerReduced,
  scrollRevealTitle,
  scrollRevealTitleReduced,
  scrollRevealViewport,
} from '@/styles/animations';

export type ScrollRevealViewport = typeof scrollRevealViewport & {
  root?: React.RefObject<Element | null>;
};

export interface ScrollMotionContract {
  /** Section shell — opacity 0, y 30, blur 6px → visible @ 450ms. */
  section: Variants;
  /** Page title — same contract as section (gradient-safe). */
  title: Variants;
  /** List / grid container — staggerChildren 0.08. */
  stagger: Variants;
  /** Stagger child — kinetic item reveal. */
  item: Variants;
  /** Row cascade outer container — staggerChildren 0.12 between rows. */
  rowStagger: Variants;
  /** Single grid row — staggerChildren 0.08 within the row. */
  row: Variants;
  /** Depth plane — scale 1.02 → 1 for architecture / certificate columns. */
  depth: Variants;
  manifestoStagger: Variants;
  manifestoPhrase: Variants;
  /** whileInView gate: once, amount 0.18. */
  viewport: ScrollRevealViewport;
}

/**
 * P0 kinetic scroll contract — centralized variants + viewport gate (prefers-reduced-motion aware).
 */
export const useScrollMotion = (): ScrollMotionContract => {
  const reduced = usePrefersReducedMotion();
  const { scrollRootRef, attachCustomRoot } = useScrollMotionViewport();

  const viewport = useMemo((): ScrollRevealViewport => {
    if (!attachCustomRoot) {
      return scrollRevealViewport;
    }
    return {
      ...scrollRevealViewport,
      root: scrollRootRef,
    };
  }, [attachCustomRoot, scrollRootRef]);

  return {
    section: reduced ? scrollRevealReduced : scrollReveal,
    title: reduced ? scrollRevealTitleReduced : scrollRevealTitle,
    stagger: reduced ? scrollRevealStaggerReduced : scrollRevealStagger,
    item: reduced ? scrollRevealItemReduced : scrollRevealItem,
    rowStagger: reduced ? scrollRevealRowStaggerReduced : scrollRevealRowStagger,
    row: reduced ? scrollRevealRowReduced : scrollRevealRow,
    depth: reduced ? scrollRevealDepthReduced : scrollRevealDepth,
    manifestoStagger: manifestoPhraseStagger,
    manifestoPhrase: reduced ? manifestoPhraseReduced : manifestoPhrase,
    viewport,
  };
};
