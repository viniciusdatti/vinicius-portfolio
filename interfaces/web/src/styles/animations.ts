// Libraries
import { Variants } from 'framer-motion';

// =================================================================================================
// ============================================ STYLES =============================================
// =================================================================================================
import { motionPresets } from '@/styles/motionPresets';

export const motionEase = motionPresets.ease.out;

export const motionEaseSoft = motionPresets.ease.inOut;

// =================================================================================================
// ======================================= PAGE TRANSITIONS ========================================
// =================================================================================================

/**
 * Slide-up com fade — entrada suave, saída para cima.
 * Funciona em todas as páginas exceto Live Lab.
 */
export const pageEnter: Variants = {
  initial: {
    opacity: 0,
    y: motionPresets.distance.pageEnter,
    scale: 0.992,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: motionPresets.duration.page,
      ease: motionEase,
    },
  },
  exit: {
    opacity: 0,
    y: -motionPresets.distance.pageExit,
    scale: 0.996,
    filter: 'blur(2px)',
    transition: {
      duration: motionPresets.duration.normal,
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
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: motionPresets.duration.fast, ease: motionEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: motionPresets.duration.fast, ease: motionEaseSoft },
  },
};

export const scrollRevealReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: motionPresets.duration.normal, ease: motionEase },
  },
};

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

// =================================================================================================
// ========================================= SCROLL REVEAL =========================================
// =================================================================================================

/**
 * Reveal de seção ao entrar na viewport — editorial, sem bounce.
 */
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: motionPresets.distance.editorial,
    filter: 'blur(3px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: motionPresets.duration.slow,
      ease: motionEase,
    },
  },
};

/**
 * Stagger container para listas de cards em scroll reveal.
 */
export const scrollRevealStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionPresets.stagger.editorialChild,
      delayChildren: motionPresets.stagger.editorialDelay,
    },
  },
};

/**
 * Item filho do stagger de scroll reveal.
 */
export const scrollRevealItem: Variants = {
  hidden: { opacity: 0, y: motionPresets.distance.item },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionPresets.duration.slow,
      ease: motionEase,
    },
  },
};

/**
 * Scroll reveal variants respecting prefers-reduced-motion.
 */
export const resolveScrollReveal = (reducedMotion: boolean): Variants => (
  reducedMotion ? scrollRevealReduced : scrollReveal
);

// =================================================================================================
// ================================= CHAPTER ORCHESTRATION =========================================
// =================================================================================================

/** Manifesto phrase container — staggered editorial reveal (orchestrated-sequences). */
export const manifestoPhraseStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

/** Single manifesto phrase line — anticipation before full thesis lands. */
export const manifestoPhrase: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: motionPresets.duration.slow,
      ease: motionEase,
    },
  },
};

export const manifestoPhraseReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: motionPresets.duration.normal, ease: motionEase },
  },
};

/** Left narrative rail — enters before panel (chapter choreography). */
export const chapterAside: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionPresets.duration.slow,
      ease: motionEase,
      delay: 0.06,
    },
  },
};

/** Operational / contact panel — follows rail with delay. */
export const chapterPanel: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(3px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: motionPresets.duration.normal,
      ease: motionEase,
      delay: 0.2,
    },
  },
};

export const chapterAsideReduced: Variants = scrollRevealReduced;

export const chapterPanelReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionPresets.duration.normal,
      ease: motionEase,
      delay: 0.08,
    },
  },
};

// =================================================================================================
// ======================================== STAGGER LEGACY =========================================
// =================================================================================================

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: motionPresets.stagger.child,
      delayChildren: motionPresets.stagger.delayChildren,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: motionPresets.distance.item },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionPresets.duration.staggerItem,
      ease: motionEase,
    },
  },
};

export const editorialStaggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: motionPresets.stagger.editorialChild,
      delayChildren: motionPresets.stagger.editorialDelay,
    },
  },
};

export const editorialStaggerItem: Variants = {
  initial: { opacity: 0, y: motionPresets.distance.editorial },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionPresets.duration.slow,
      ease: motionEase,
    },
  },
};

export const showcaseStaggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: motionPresets.stagger.showcaseChild,
      delayChildren: motionPresets.stagger.showcaseDelay,
    },
  },
};

export const showcaseStaggerItem: Variants = {
  initial: { opacity: 0, y: motionPresets.distance.showcase, scale: 0.99 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: motionPresets.duration.slow,
      ease: motionEase,
    },
  },
};

/**
 * Clip-masked slide reveal for the Hero headline.
 * The wrapper must have overflow: hidden so text slides up from below the clip.
 */
export const heroClipReveal: Variants = {
  hidden: { y: '105%' },
  visible: {
    y: 0,
    transition: {
      duration: motionPresets.duration.hero,
      ease: motionEase,
    },
  },
};

// =================================================================================================
// ======================================== FADE ANIMATIONS ========================================
// =================================================================================================

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: motionPresets.distance.fadeUp },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: motionPresets.duration.slow, ease: motionEase },
  },
};

/** Editorial section entrance — subtle vertical reveal for page headers. */
export const sectionReveal: Variants = {
  initial: { opacity: 0, y: motionPresets.distance.item },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: motionPresets.duration.normal, ease: motionEase },
  },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -motionPresets.distance.fadeSide },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: motionPresets.duration.normal, ease: motionEase },
  },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -motionPresets.distance.fadeSide },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: motionPresets.duration.normal, ease: motionEase },
  },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: motionPresets.distance.fadeSide },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: motionPresets.duration.normal, ease: motionEase },
  },
};

// =================================================================================================
// ======================================= SCALE ANIMATIONS ========================================
// =================================================================================================

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: motionPresets.duration.normal, ease: motionEase },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: motionPresets.duration.fast, ease: motionEaseSoft },
  },
};

export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

// =================================================================================================
// ======================================== HERO ANIMATIONS ========================================
// =================================================================================================

export const heroTextReveal: Variants = {
  initial: { y: '100%' },
  animate: {
    y: 0,
    transition: {
      duration: motionPresets.duration.slow,
      ease: motionEase,
    },
  },
};

export const heroSubtitle: Variants = {
  initial: { opacity: 0, y: motionPresets.distance.item },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionPresets.duration.normal,
      delay: 0.28,
      ease: motionEase,
    },
  },
};

// =================================================================================================
// ==================================== INTERACTIVE ANIMATIONS =====================================
// =================================================================================================

export const pulse: {
  scale: number[];
  opacity: number[];
  transition: { duration: number; repeat: number; ease: string };
} = {
  scale: [1, 1.08, 1],
  opacity: [1, 0.85, 1],
  transition: {
    duration: 2.4,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export const typingDot: Variants = {
  animate: {
    y: [0, -4, 0],
    opacity: [0.45, 1, 0.45],
    transition: {
      duration: 0.55,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const messageEnter: Variants = {
  initial: { opacity: 0, y: motionPresets.distance.message, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: motionPresets.duration.message, ease: motionEase },
  },
};

/** Context module panel — operational transition (no decorative fade-up). */
export const modulePanelSwitch: Variants = {
  initial: { opacity: 0, x: -motionPresets.distance.fadeSide },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: motionPresets.duration.normal, ease: motionEase },
  },
  exit: {
    opacity: 0,
    x: motionPresets.distance.fadeSide,
    transition: { duration: motionPresets.duration.fast, ease: motionEaseSoft },
  },
};

export const shimmer: Variants = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// =================================================================================================
// ===================================== NAVIGATION ANIMATIONS =====================================
// =================================================================================================

export const navLinkHover: Variants = {
  initial: { width: 0 },
  hover: { width: '100%' },
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

export const hamburgerTop: Variants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 8 },
};

export const hamburgerMiddle: Variants = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
};

export const hamburgerBottom: Variants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -8 },
};

// =================================================================================================
// ======================================== CARD ANIMATIONS ========================================
// =================================================================================================

export const cardHover: Variants = {
  initial: { y: 0 },
  hover: {
    y: -4,
    transition: { duration: motionPresets.duration.normal, ease: motionEase },
  },
};

// =================================================================================================
// ======================================= UTILITY FUNCTIONS =======================================
// =================================================================================================

export const parallaxY = (
  offset: number,
): { y: number; transition: { type: string; stiffness: number } } => ({
  y: offset,
  transition: { type: 'spring', stiffness: 120 },
});

export const createStaggerDelay = (
  index: number,
  baseDelay: number = motionPresets.stagger.child,
): { transition: { delay: number } } => ({
  transition: { delay: index * baseDelay },
});
