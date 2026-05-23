// Libraries
import type { Variants } from 'framer-motion';

// Components
import { motionPresets } from '@/styles/motionPresets';

/* *************************************************************************************************
 ******************************************** CONSTANTS ********************************************
 ************************************************************************************************ */

/** Hero entrance stagger — tight so headline + CTAs land before decorative modules. */
export const HERO_STAGGER_DELAY: number = motionPresets.stagger.child;

const heroEase = motionPresets.ease.out;

/* *************************************************************************************************
 ******************************************** VARIANTS *********************************************
 ************************************************************************************************ */

/** Master stagger — eyebrow → headline clips → modules. */
export const heroEntranceStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: HERO_STAGGER_DELAY,
      delayChildren: 0.02,
    },
  },
};

/** Headline block labels + lines — nested stagger. */
export const heroHeadlineStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: HERO_STAGGER_DELAY,
      delayChildren: 0,
    },
  },
};

/** Mono eyebrow / channel label — no blur, cubic ease only. */
export const heroMonoReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionPresets.duration.normal,
      ease: heroEase,
    },
  },
};

/** Clip-masked headline line — Y mask 105% → 0% (normal duration — CTAs legible ≤600ms). */
export const heroHeadlineClipReveal: Variants = {
  hidden: {
    y: '105%',
  },
  show: {
    y: 0,
    transition: {
      duration: motionPresets.duration.normal,
      ease: heroEase,
    },
  },
};

/** Description, stack, CTAs, portrait slot. */
export const heroModuleReveal: Variants = {
  hidden: {
    opacity: 0,
    y: motionPresets.distance.item,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionPresets.duration.normal,
      ease: heroEase,
    },
  },
};

/** Technical eyebrow rule — width 0 → 24px. */
export const heroEyebrowLineExpand: Variants = {
  hidden: {
    width: 0,
    opacity: 0,
  },
  show: {
    width: 24,
    opacity: 1,
    transition: {
      duration: motionPresets.duration.normal,
      ease: heroEase,
    },
  },
};
