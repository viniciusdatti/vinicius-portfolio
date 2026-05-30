// Libraries
import { Variants } from 'framer-motion';

// Styles
import { motionPresets } from '../../styles/motionPresets';

export const HERO_STAGGER_DELAY: number = motionPresets.stagger.child;

const heroEase = motionPresets.ease.out;

export const heroEntranceStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: HERO_STAGGER_DELAY,
      delayChildren: 0.02,
    },
  },
};

export const heroHeadlineStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: HERO_STAGGER_DELAY,
      delayChildren: 0,
    },
  },
};

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
