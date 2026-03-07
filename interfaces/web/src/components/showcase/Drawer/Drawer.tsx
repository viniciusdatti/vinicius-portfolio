/**
 * Drawer component. Side panel with overlay, header and body.
 */

// Core
import React, { useCallback } from 'react';

// Libraries
import { AnimatePresence } from 'framer-motion';

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

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  const handleOverlayClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <DrawerOverlay
            data-open={open}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
          />
          <DrawerPanel
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerCloseButton type="button" onClick={onClose} aria-label="Close">
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
};
