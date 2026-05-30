// Core
import React, { useMemo } from 'react';

// Libraries
import { Variants } from 'framer-motion';

// Hooks
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { useScrollMotionViewport } from './scrollMotionViewport';

// Styles
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
} from '../styles/animations';

export type ScrollRevealViewport = typeof scrollRevealViewport & {
  root?: React.RefObject<Element | null>;
};

export interface ScrollMotionContract {
  section: Variants;
  title: Variants;
  stagger: Variants;
  item: Variants;
  rowStagger: Variants;
  row: Variants;
  depth: Variants;
  manifestoStagger: Variants;
  manifestoPhrase: Variants;
  viewport: ScrollRevealViewport;
  resolveInitial: (reduced: boolean) => false | 'hidden';
}

export const resolveScrollMotionInitial = (reduced: boolean): false | 'hidden' => (
  reduced ? false : 'hidden'
);

export const useScrollMotion = (): ScrollMotionContract => {
  const reduced: boolean = usePrefersReducedMotion();
  const { scrollRootRef, attachCustomRoot } = useScrollMotionViewport();
  const viewport: ScrollRevealViewport = useMemo((): ScrollRevealViewport => (
    attachCustomRoot
      ? { ...scrollRevealViewport, root: scrollRootRef }
      : scrollRevealViewport
  ), [attachCustomRoot, scrollRootRef]);

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
