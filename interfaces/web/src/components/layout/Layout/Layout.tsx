// Core
import React, { useEffect } from 'react';

// Libraries
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';

// Components
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  SkipLink,
  Main,
  PageMotionLayer,
  WorkspaceMotionShell,
} from '@/components/layout/Layout/Layout.style';
import { resolvePageTransition } from '@/styles/animations';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Public portfolio shell — cinematic pages with page transitions.
 * Live Lab uses full-viewport workspace mode (no footer, fade-only transition).
 *
 * IMPORTANT: The key on motion.div uses location.key (not pathname) so that
 * navigating back to the same route forces a full re-mount of the page tree,
 * resetting all whileInView animation states correctly.
 */
export function Layout(): React.ReactElement {
  const { t } = useTranslation();
  const location = useLocation();
  const isLiveLab: boolean = location.pathname === '/live-lab';
  const reducedMotion = usePrefersReducedMotion();
  const pageVariants = resolvePageTransition(isLiveLab, reducedMotion);

  useEffect(() => {
    document.body.classList.toggle('workspace-scroll-locked', isLiveLab);
    return () => {
      document.body.classList.remove('workspace-scroll-locked');
    };
  }, [isLiveLab]);

  return (
    <>
      <SkipLink href="#main-content">{t('a11y.skipToContent')}</SkipLink>
      <Header />
      <Main
        id="main-content"
        tabIndex={-1}
        $workspaceMode={isLiveLab}
      >
        <AnimatePresence mode="wait" initial={false}>
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
}
