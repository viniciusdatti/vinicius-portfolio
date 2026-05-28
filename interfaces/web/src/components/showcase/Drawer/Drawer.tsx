/**
 * @fileoverview Drawer — portaled to document.body so fixed positioning stays viewport-true.
 */

// Core
import React, {
  useCallback,
  useLayoutEffect,
  useId,
  useMemo,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';

// Libraries
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Hooks
import { useDrawerSlideAxis } from '../../../hooks/useDrawerSlideAxis';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

// Components
import { motionPresets } from '../../../styles/motionPresets';
import { BodyScrollLockClass, lockBodyScroll } from '../../../utils/bodyScrollLock';

// Component
import type { DrawerProps } from './Drawer.types';
import {
  DrawerViewport,
  DrawerOverlay,
  DrawerPanel,
  DrawerHeader,
  DrawerTitle,
  DrawerCloseButton,
  DrawerBody,
} from './Drawer.style';

export const Drawer = ({
  open,
  onClose,
  title,
  children,
  testId,
}: DrawerProps): React.ReactElement | null => {
  const { t } = useTranslation();
  const reducedMotion: boolean = usePrefersReducedMotion();
  const slideAxis: 'x' | 'y' = useDrawerSlideAxis();
  const titleId: string = useId();
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const panelMotion = useMemo(() => {
    if (reducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: motionPresets.duration.fast },
      };
    }
    if (slideAxis === 'y') {
      return {
        initial: { y: '100%', x: 0, opacity: 1 },
        animate: { y: 0, x: 0, opacity: 1 },
        exit: { y: '100%', x: 0, opacity: 1 },
        transition: motionPresets.spring.physical,
      };
    }
    return {
      initial: { x: '100%', y: 0, opacity: 1 },
      animate: { x: 0, y: 0, opacity: 1 },
      exit: { x: '100%', y: 0, opacity: 1 },
      transition: motionPresets.spring.physical,
    };
  }, [reducedMotion, slideAxis]);

  const handleOverlayClick = useCallback((): void => {
    onClose();
  }, [onClose]);

  useLayoutEffect(() => {
    if (!open) {
      return undefined;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const unlockScroll = lockBodyScroll(BodyScrollLockClass.Drawer);

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      unlockScroll();
      previousFocusRef.current?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <DrawerViewport>
          <DrawerOverlay
            data-open="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionPresets.duration.normal }}
            onClick={handleOverlayClick}
          />
          <DrawerPanel
            key={slideAxis}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            data-testid={testId}
            initial={panelMotion.initial}
            animate={panelMotion.animate}
            exit={panelMotion.exit}
            transition={panelMotion.transition}
          >
            <DrawerHeader>
              <DrawerTitle id={titleId}>{title}</DrawerTitle>
              <DrawerCloseButton
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={t('a11y.drawerClose')}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </DrawerCloseButton>
            </DrawerHeader>
            <DrawerBody>{children}</DrawerBody>
          </DrawerPanel>
        </DrawerViewport>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};
