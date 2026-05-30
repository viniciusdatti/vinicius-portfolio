// Libraries
import { Variants } from 'framer-motion';

// Styles
import { motionPresets } from './motionPresets';

export const motionEase = motionPresets.ease.out;

export const motionEaseSoft = motionPresets.ease.inOut;

export const physicalSpringTransition = motionPresets.spring.physical;

export const telemetryMicroSnapTransition = motionPresets.spring.physical;

export const pageEnter: Variants = {
  initial: {
    /* Keep opacity 1 so lazy routes never flash a blank shell if enter animation is delayed. */
    opacity: 1,
    y: motionPresets.distance.fadeUp,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionPresets.duration.page,
      ease: motionEase,
    },
  },
  exit: {
    /* Do not fade to 0 — sync enter/exit avoids a blank shell while lazy routes load. */
    opacity: 1,
    y: -motionPresets.distance.pageExit,
    transition: {
      duration: motionPresets.duration.fast,
      ease: motionEaseSoft,
    },
  },
};

export const workspaceEnter: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: motionPresets.duration.normal, ease: motionEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: motionPresets.duration.fast, ease: motionEaseSoft },
  },
};

export const pageEnterReduced: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: { duration: motionPresets.duration.fast, ease: motionEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: motionPresets.duration.fast, ease: motionEaseSoft },
  },
};

export const SCROLL_REVEAL_REDUCED_DURATION_S = 0.3;

const scrollRevealReducedTransition = {
  duration: SCROLL_REVEAL_REDUCED_DURATION_S,
  ease: 'linear' as const,
} as const;

export const scrollRevealReduced: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: scrollRevealReducedTransition,
  },
};

export const SCROLL_REVEAL_DURATION_S = motionPresets.duration.normal;

export const SCROLL_REVEAL_Y_PX = motionPresets.distance.fadeUp;

export const SCROLL_REVEAL_TITLE_Y_PX = motionPresets.distance.editorial;

export const SCROLL_REVEAL_TITLE_BLUR = '3px';

export const SCROLL_REVEAL_STAGGER_CHILD_S = motionPresets.stagger.child;

export const SCROLL_REVEAL_ROW_STAGGER_CHILD_S = 0.12;

export const scrollRevealViewport = {
  once: true,
  amount: 0.05 as const,
  margin: '0px 0px -5% 0px' as const,
};

const scrollRevealTransition = {
  duration: SCROLL_REVEAL_DURATION_S,
  ease: motionEase,
} as const;

export const scrollRevealTitle: Variants = {
  hidden: {
    opacity: 1,
    y: SCROLL_REVEAL_TITLE_Y_PX,
    scale: 1,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: scrollRevealTransition,
  },
};

export const scrollRevealTitleReduced: Variants = scrollRevealReduced;

export const resolvePageTransition = (
  isWorkspace: boolean,
  reducedMotion: boolean,
): Variants => {
  if (isWorkspace) return workspaceEnter;
  if (reducedMotion) return pageEnterReduced;
  return pageEnter;
};

export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: SCROLL_REVEAL_Y_PX,
    scale: 1,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: scrollRevealTransition,
  },
};

export const scrollRevealStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: SCROLL_REVEAL_STAGGER_CHILD_S,
      delayChildren: 0.04,
    },
  },
};

export const scrollRevealStaggerReduced: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
};

export const scrollRevealRowStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: SCROLL_REVEAL_ROW_STAGGER_CHILD_S,
      delayChildren: 0.04,
    },
  },
};

export const scrollRevealRowStaggerReduced: Variants = scrollRevealStaggerReduced;

export const scrollRevealRow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: SCROLL_REVEAL_STAGGER_CHILD_S,
      delayChildren: 0.02,
    },
  },
};

export const scrollRevealRowReduced: Variants = scrollRevealStaggerReduced;

export const scrollRevealDepth: Variants = {
  hidden: {
    opacity: 0,
    y: SCROLL_REVEAL_Y_PX,
    scale: 1.02,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: scrollRevealTransition,
  },
};

export const scrollRevealDepthReduced: Variants = scrollRevealReduced;

export const scrollRevealItem: Variants = {
  hidden: {
    opacity: 0,
    y: SCROLL_REVEAL_Y_PX,
    scale: 1,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: scrollRevealTransition,
  },
};

export const scrollRevealItemReduced: Variants = scrollRevealReduced;

export const manifestoPhraseStagger: Variants = scrollRevealStagger;

export const manifestoPhrase: Variants = scrollRevealItem;

export const manifestoPhraseReduced: Variants = scrollRevealItemReduced;

export const staggerItem: Variants = {
  initial: { opacity: 0, y: motionPresets.distance.item },
  animate: {
    opacity: 1,
    y: 0,
    transition: physicalSpringTransition,
  },
};

export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: motionPresets.duration.normal,
      ease: motionEaseSoft,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionPresets.duration.page,
      ease: motionEase,
    },
  },
};

const hamburgerLineTransition = {
  duration: motionPresets.duration.fast,
  ease: motionEase,
};

const HAMBURGER_OPEN_Y_OFFSET = 7;

export const hamburgerTop: Variants = {
  closed: { rotate: 0, y: 0, transition: hamburgerLineTransition },
  open: {
    rotate: 45,
    y: HAMBURGER_OPEN_Y_OFFSET,
    transition: hamburgerLineTransition,
  },
};

export const hamburgerMiddle: Variants = {
  closed: { opacity: 1, transition: hamburgerLineTransition },
  open: { opacity: 0, transition: hamburgerLineTransition },
};

export const hamburgerBottom: Variants = {
  closed: { rotate: 0, y: 0, transition: hamburgerLineTransition },
  open: {
    rotate: -45,
    y: -HAMBURGER_OPEN_Y_OFFSET,
    transition: hamburgerLineTransition,
  },
};

export const layoutMorphPanel: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: {
        duration: motionPresets.duration.normal,
        ease: motionEase,
      },
      scale: physicalSpringTransition,
      layout: physicalSpringTransition,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.985,
    transition: {
      duration: motionPresets.duration.fast,
      ease: motionEaseSoft,
    },
  },
};

export const layoutMorphPanelReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: motionPresets.duration.normal, ease: motionEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: motionPresets.duration.fast, ease: motionEaseSoft },
  },
};

export const resolveLayoutMorphPanel = (reducedMotion: boolean): Variants => (
  reducedMotion ? layoutMorphPanelReduced : layoutMorphPanel
);
