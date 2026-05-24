// Libraries
import { Variants } from 'framer-motion';

/* *************************************************************************************************
 ********************************************* STYLES **********************************************
 ************************************************************************************************ */
import { motionPresets } from '@/styles/motionPresets';

export const motionEase = motionPresets.ease.out;

export const motionEaseSoft = motionPresets.ease.inOut;

/** Shared physical spring — stiffness 150, damping 20, mass 0.8. */
export const physicalSpringTransition = motionPresets.spring.physical;

/** Live Lab socket ticks — quick scale snap on value/counter changes. */
export const telemetryMicroSnapTransition = motionPresets.spring.physical;

/* *************************************************************************************************
 **************************************** PAGE TRANSITIONS *****************************************
 ************************************************************************************************ */

/**
 * Slide-up com fade — entrada suave, saída para cima.
 * Funciona em todas as páginas exceto Live Lab.
 */
/** Canonical route enter — fade + slide-up on navigation. */
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

/**
 * Fade limpo — para o Live Lab (workspace não deve ter slide).
 */
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

/** Reduced motion — no blur/scale (accessibility + performance). */
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

/** Reduced motion — opacity only, 300ms linear (no Y/blur). */
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

/* *************************************************************************************************
 ****************************************** SCROLL REVEAL ******************************************
 ************************************************************************************************ */

/** Canonical section reveal — item distance Y, normal duration, ease.out. */
export const SCROLL_REVEAL_DURATION_S = motionPresets.duration.normal;

/** Section/card reveal distance — perceptible fade-up without editorial overshoot. */
export const SCROLL_REVEAL_Y_PX = motionPresets.distance.fadeUp;

/** Gradient-safe page titles — Y-only so headline gradients never flash invisible. */
export const SCROLL_REVEAL_TITLE_Y_PX = motionPresets.distance.editorial;

/** Title-only depth cue — lighter than legacy 6px full-section blur. */
export const SCROLL_REVEAL_TITLE_BLUR = '3px';

export const SCROLL_REVEAL_STAGGER_CHILD_S = motionPresets.stagger.child;

/** Row cascade — delay between asymmetric grid rows (Projects showcase). */
export const SCROLL_REVEAL_ROW_STAGGER_CHILD_S = 0.12;

/**
 * Viewport gate — fire once per mount so blocks stay visible after reveal.
 * Negative bottom margin triggers slightly before the section fully enters view.
 */
export const scrollRevealViewport = {
  once: true,
  amount: 0.05 as const,
  margin: '0px 0px -5% 0px' as const,
};

const scrollRevealTransition = {
  duration: SCROLL_REVEAL_DURATION_S,
  ease: motionEase,
} as const;

/**
 * Page title reveal — editorial Y only (opacity stays 1 for gradient headline safety).
 */
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

/**
 * Route transition variants respecting prefers-reduced-motion.
 */
export const resolvePageTransition = (
  isWorkspace: boolean,
  reducedMotion: boolean,
): Variants => {
  if (isWorkspace) return workspaceEnter;
  if (reducedMotion) return pageEnterReduced;
  return pageEnter;
};

/**
 * Reveal de seção ao entrar na viewport — editorial, sem bounce.
 */
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

/**
 * Stagger container para listas de cards em scroll reveal.
 */
export const scrollRevealStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: SCROLL_REVEAL_STAGGER_CHILD_S,
      delayChildren: 0.04,
    },
  },
};

/** Reduced motion — no stagger delay; opacity-only fade on each child. */
export const scrollRevealStaggerReduced: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
};

/**
 * Outer container for row-based cascades (e.g. Projects bento rows).
 */
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

/**
 * Single showcase row — children use `scrollRevealItem` stagger inside the row.
 */
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

/**
 * Depth reveal — architecture / certificate columns settle from a near plane (scale 1.02).
 */
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

/**
 * Item filho do stagger de scroll reveal.
 */
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

/* *************************************************************************************************
 **************************************** MANIFESTO REVEAL *****************************************
 ************************************************************************************************ */

/** Manifesto phrase container — staggered editorial reveal (orchestrated-sequences). */
export const manifestoPhraseStagger: Variants = scrollRevealStagger;

/** Single manifesto phrase line — matches scroll reveal item contract. */
export const manifestoPhrase: Variants = scrollRevealItem;

export const manifestoPhraseReduced: Variants = scrollRevealItemReduced;

/* *************************************************************************************************
 ***************************************** MENU STAGGER ********************************************
 ************************************************************************************************ */

/** Mobile nav link — spring settle after overlay opens. */
export const staggerItem: Variants = {
  initial: { opacity: 0, y: motionPresets.distance.item },
  animate: {
    opacity: 1,
    y: 0,
    transition: physicalSpringTransition,
  },
};

/* *************************************************************************************************
 ************************************** NAVIGATION ANIMATIONS **************************************
 ************************************************************************************************ */

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

/** Matches 3×2px lines + 5px gaps — center offset 7px for a symmetric X. */
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

/* *************************************************************************************************
 *************************************** LAYOUT MORPH PANEL ****************************************
 ************************************************************************************************ */

/** Projector-style panel expansion — opacity + layout spring, no height tween. */
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
