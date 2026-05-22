// Libraries
import { Variants, Transition } from 'framer-motion';

// Components
import { motionPresets } from './motionPresets';

export const motionEase = motionPresets.ease.out;

export const motionEaseSoft = motionPresets.ease.inOut;

// ============================================
// Page Transitions — cinematic, non-AI
// ============================================

/**
 * Slide-up com fade — entrada suave, saída para cima.
 * Funciona em todas as páginas exceto Live Lab.
 */
export const pageEnter: Variants = {
  initial: {
    opacity: 0,
    y: motionPresets.distance.pageEnter,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: motionPresets.duration.page,
      ease: motionEase,
    },
  },
  exit: {
    opacity: 0,
    y: -motionPresets.distance.pageExit,
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

// ============================================
// Scroll Reveal — seções internas das páginas
// ============================================

/**
 * Reveal de seção ao entrar na viewport — editorial, sem bounce.
 */
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: motionPresets.distance.editorial,
  },
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
 * Stagger container para listas de cards em scroll reveal.
 */
export const scrollRevealStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionPresets.stagger.editorialChild,
      delayChildren: 0.05,
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

// ============================================
// Page Transitions (legacy — mantidos para compatibilidade)
// ============================================

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
  initial: { opacity: 0, y: motionPresets.distance.showcase, scale: 0.98 },
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

// ============================================
// Fade Animations
// ============================================

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

// ============================================
// Scale Animations
// ============================================

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

// ============================================
// Hero Animations
// ============================================

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

// ============================================
// Interactive Animations
// ============================================

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

// ============================================
// Navigation Animations
// ============================================

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

// ============================================
// Card Animations
// ============================================

export const cardHover: Variants = {
  initial: { y: 0 },
  hover: {
    y: -4,
    transition: { duration: motionPresets.duration.normal, ease: motionEase },
  },
};

// ============================================
// Utility Functions
// ============================================

export const parallaxY = (
  offset: number
): { y: number; transition: { type: string; stiffness: number } } => ({
  y: offset,
  transition: { type: 'spring', stiffness: 120 },
});

export const createStaggerDelay = (
  index: number,
  baseDelay: number = motionPresets.stagger.child
): { transition: { delay: number } } => ({
  transition: { delay: index * baseDelay },
});
