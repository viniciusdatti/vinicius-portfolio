// Core
import React, { useMemo } from 'react';

// Libraries
import type { Variants } from 'framer-motion';

// Components
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
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
  /** Section shell — y 12 → 0 (opacity stays 1 if whileInView is delayed). */
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
  /** whileInView gate: once, amount 0.05. */
  viewport: ScrollRevealViewport;
  /** Prefer `animate` for above-the-fold blocks; `whileInView` for scroll sections. */
  resolveInitial: (reduced: boolean) => false | 'hidden';
}

/**
 * Initial variant for scroll motion — skip entrance when reduced motion is on.
 */
export const resolveScrollMotionInitial = (reduced: boolean): false | 'hidden' => (
  reduced ? false : 'hidden'
);

/**
 * P0 kinetic scroll contract — centralized variants + viewport gate (prefers-reduced-motion aware).
 */
export const useScrollMotion = (): ScrollMotionContract => {
  const reduced: boolean = usePrefersReducedMotion();

  /**
   * Always use the document viewport for whileInView.
   * Custom scroll roots broke Home reveals when overflow-x: hidden coerced overflow-y to auto.
   */
  const viewport: ScrollRevealViewport = useMemo(
    (): ScrollRevealViewport => scrollRevealViewport,
    [],
  );

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
    resolveInitial: resolveScrollMotionInitial,
  };
};
