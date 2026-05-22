/**
 * Drawer component. Side panel with overlay, header and body.
 */

// Core
import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
} from 'react';

// Libraries
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Types
import type { DrawerProps } from './Drawer.types';

// Components
import {
  DrawerOverlay,
  DrawerPanel,
  DrawerHeader,
  DrawerTitle,
  DrawerCloseButton,
  DrawerBody,
} from './Drawer.style';

export function Drawer({
  open,
  onClose,
  title,
  children,
  testId,
}: DrawerProps): React.ReactElement {
  const { t } = useTranslation();
  const titleId: string = useId();
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleOverlayClick = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <DrawerOverlay
            data-open="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
          />
          <DrawerPanel
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            data-testid={testId}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
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
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </DrawerCloseButton>
            </DrawerHeader>
            <DrawerBody>{children}</DrawerBody>
          </DrawerPanel>
        </>
      )}
    </AnimatePresence>
  );
}
