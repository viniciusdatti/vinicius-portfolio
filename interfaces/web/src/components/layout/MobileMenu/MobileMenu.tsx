/**
 * @fileoverview Full-height mobile navigation drawer with overlay, close control, and a11y.
 */

// Core
import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
} from 'react';

// Libraries
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Types
import type { MobileMenuProps } from '@/components/layout/MobileMenu/MobileMenu.types';

// Components
import { mobileMenuVariants, staggerItem, motionEase } from '@/styles/animations';
import { motionPresets } from '@/styles/motionPresets';
import { prefetchRouteModule } from '@/lib/routePrefetch';
import {
  MenuViewport,
  Overlay,
  MenuContainer,
  MenuHeader,
  MenuHeaderLabel,
  MenuCloseButton,
  MenuNav,
  MenuLink,
  MenuFooter,
  SocialLinks,
  SocialLink,
} from '@/components/layout/MobileMenu/MobileMenu.style';

const GitHubIcon = (): React.ReactElement => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = (): React.ReactElement => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const CloseIcon = (): React.ReactElement => (
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
);

const reducedMotionMenuVariants: Variants = {
  closed: {
    opacity: 0,
    transition: { duration: motionPresets.duration.fast },
  },
  open: {
    opacity: 1,
    transition: { duration: motionPresets.duration.fast },
  },
};

export const MobileMenu = ({
  isOpen,
  navItems,
  currentPath,
  onClose,
}: MobileMenuProps): React.ReactElement | null => {
  const { t } = useTranslation();
  const reducedMotion: boolean = usePrefersReducedMotion();
  const titleId: string = useId();
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const panelVariants: Variants = useMemo(
    (): Variants => (reducedMotion ? reducedMotionMenuVariants : mobileMenuVariants),
    [reducedMotion],
  );

  const handleOverlayClick = useCallback((): void => {
    onClose();
  }, [onClose]);

  const handleLinkClick = useCallback((): void => {
    onClose();
  }, [onClose]);

  const handleNavLinkPrefetch = useCallback((path: string): void => {
    prefetchRouteModule(path);
  }, []);

  useEffect(() => {
    if (!isOpen) {
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
  }, [isOpen, onClose]);

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <MenuViewport>
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionPresets.duration.normal, ease: motionEase }}
            onClick={handleOverlayClick}
            aria-hidden="true"
          />
          <MenuContainer
            ref={panelRef}
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <MenuHeader>
              <MenuHeaderLabel id={titleId}>{t('footer.navigation')}</MenuHeaderLabel>
              <MenuCloseButton
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={t('a11y.closeMenu')}
              >
                <CloseIcon />
              </MenuCloseButton>
            </MenuHeader>

            <MenuNav aria-label={t('a11y.mobileMenu')}>
              {navItems.map((item, index: number) => (
                <MenuLink
                  key={item.path}
                  as={Link}
                  to={item.path}
                  $active={currentPath === item.path}
                  $delay={reducedMotion ? 0 : index * 0.04}
                  variants={staggerItem}
                  initial="initial"
                  animate="animate"
                  custom={index}
                  onClick={handleLinkClick}
                  onMouseEnter={() => handleNavLinkPrefetch(item.path)}
                  onFocus={() => handleNavLinkPrefetch(item.path)}
                >
                  {t(item.labelKey)}
                </MenuLink>
              ))}
            </MenuNav>

            <MenuFooter>
              <SocialLinks>
                <SocialLink
                  href="https://github.com/viniciusdatti"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('a11y.github')}
                >
                  <GitHubIcon />
                </SocialLink>
                <SocialLink
                  href="https://www.linkedin.com/in/vinicius-datti-791482267/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('a11y.linkedin')}
                >
                  <LinkedInIcon />
                </SocialLink>
              </SocialLinks>
            </MenuFooter>
          </MenuContainer>
        </MenuViewport>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};
