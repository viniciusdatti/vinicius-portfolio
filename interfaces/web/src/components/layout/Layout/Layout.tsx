/**
 * @fileoverview Public portfolio shell — canonical route transition + a11y motion gate.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Core
import React, { useEffect } from 'react';

// Libraries
import { useLocation, useOutlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
import { prefetchPublicRoutes } from '@/lib/routePrefetch';

/* *************************************************************************************************
 *************************************** COMPONENT HANDLING ****************************************
 ************************************************************************************************ */

/**
 * Inner layout chrome — binds the scroll root ref for nested `whileInView` observers.
 */
const LayoutScrollChrome: React.FC = (): React.ReactElement => {
  const location = useLocation();
  const outlet: React.ReactElement | null = useOutlet();
  const { bindScrollRoot } = useScrollMotionViewport();
  const isLiveLab: boolean = location.pathname === '/live-lab';
  const reducedMotion: boolean = usePrefersReducedMotion();
  const pageVariants = resolvePageTransition(isLiveLab, reducedMotion);
  const routeTransitionKey: string = `${location.pathname}:${location.key}`;

  const resolvePageContent = (): React.ReactElement | null => {
    if (outlet === null) {
      return null;
    }
    if (isLiveLab) {
      return (
        <WorkspaceMotionShell>
          {outlet}
        </WorkspaceMotionShell>
      );
    }
    return outlet;
  };

  const pageContent: React.ReactElement | null = resolvePageContent();

  useEffect((): (() => void) => {
    const timerId: number = window.setTimeout((): void => {
      prefetchPublicRoutes();
    }, 1500);

    return (): void => {
      window.clearTimeout(timerId);
    };
  }, []);

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
        {pageContent !== null ? (
          <PageMotionLayer
            key={routeTransitionKey}
            $workspace={isLiveLab}
            variants={pageVariants}
            initial={false}
            animate="animate"
          >
            {pageContent}
          </PageMotionLayer>
        ) : null}
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
 * IMPORTANT: PageMotionLayer keys `${pathname}:${key}` and wraps the resolved
 * `useOutlet()` element. Route exit animations were removed — AnimatePresence
 * mode="wait" and exit fades left SPA navigations stuck when the tab was hidden.
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
