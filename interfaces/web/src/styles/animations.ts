// Libraries
import { Variants, Transition } from 'framer-motion';

// ============================================
// Page Transitions
// ============================================

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const pageTransition: Transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

// ============================================
// Stagger Animations
// ============================================

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
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
  initial: { opacity: 0, y: 60 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -60 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  },
};

// ============================================
// Scale Animations
// ============================================

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
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
      duration: 0.8,
      ease: [0.6, 0.01, -0.05, 0.95],
    },
  },
};

export const heroSubtitle: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.4,
      ease: 'easeOut',
    },
  },
};

// ============================================
// Interactive Animations
// ============================================

/**
 * Pulse animation target for infinite loop effect.
 */
export const pulse: {
  scale: number[];
  opacity: number[];
  transition: { duration: number; repeat: number; ease: string };
} = {
  scale: [1, 1.2, 1],
  opacity: [1, 0.8, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export const typingDot: Variants = {
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
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
      duration: 0.3,
      ease: 'easeIn',
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
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
  initial: {
    y: 0,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    y: -8,
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// ============================================
// Utility Functions
// ============================================

/**
 * Creates parallax Y offset animation properties.
 */
export const parallaxY = (
  offset: number
): { y: number; transition: { type: string; stiffness: number } } => ({
  y: offset,
  transition: { type: 'spring', stiffness: 100 },
});

/**
 * Creates stagger delay animation properties based on index.
 */
export const createStaggerDelay = (
  index: number,
  baseDelay: number = 0.1
): { transition: { delay: number } } => ({
  transition: { delay: index * baseDelay },
});
