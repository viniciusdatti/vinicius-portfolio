/**
 * @fileoverview Public portfolio shell — canonical route transition + a11y motion gate.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Core
import React from 'react';

// Libraries
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';

// Components
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  ScrollMotionViewportProvider,
  useScrollMotionViewport,
} from '@/hooks/scrollMotionViewport';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LayoutAmbientBackdrop } from '@/components/layout/LayoutAmbientBackdrop';
import {
  SkipLink,
  Main,
  PageMotionLayer,
  WorkspaceMotionShell,
} from '@/components/layout/Layout/Layout.style';
import { resolvePageTransition } from '@/styles/animations';

/* *************************************************************************************************
 *************************************** COMPONENT HANDLING ****************************************
 ************************************************************************************************ */

/**
 * Inner layout chrome — binds the scroll root ref for nested `whileInView` observers.
 */
const LayoutScrollChrome: React.FC = (): React.ReactElement => {
  const location = useLocation();
  const { bindScrollRoot } = useScrollMotionViewport();
  const isLiveLab: boolean = location.pathname === '/live-lab';
  const reducedMotion: boolean = usePrefersReducedMotion();
  const pageVariants = resolvePageTransition(isLiveLab, reducedMotion);

  return (
    <>
      <LayoutAmbientBackdrop />
      <Header />
      <Main
        id="main-content"
        tabIndex={-1}
        ref={bindScrollRoot}
        $workspaceMode={isLiveLab}
      >
        <AnimatePresence mode="wait" initial>
          <PageMotionLayer
            key={location.key}
            $workspace={isLiveLab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {isLiveLab ? (
              <WorkspaceMotionShell>
                <Outlet />
              </WorkspaceMotionShell>
            ) : (
              <Outlet />
            )}
          </PageMotionLayer>
        </AnimatePresence>
      </Main>
      {!isLiveLab ? <Footer /> : null}
    </>
  );
};

/**
 * Public portfolio shell — cinematic pages with page transitions.
 * Live Lab uses full-viewport workspace mode (no footer, fade-only transition).
 *
 * P0 gate: `usePrefersReducedMotion` strips scale/translate/blur from `pageEnter`;
 * only opacity fade runs when the user prefers reduced motion.
 *
 * IMPORTANT: The key on PageMotionLayer uses location.key (not pathname) so that
 * navigating back to the same route forces a full re-mount of the page tree,
 * resetting all whileInView animation states correctly.
 */
export const Layout: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <SkipLink href="#main-content">{t('a11y.skipToContent')}</SkipLink>
      <ScrollMotionViewportProvider>
        <LayoutScrollChrome />
      </ScrollMotionViewportProvider>
    </>
  );
};
