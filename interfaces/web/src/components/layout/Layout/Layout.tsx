// Core
import React from 'react';

// Libraries
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import { Header } from '../Header';
import { Footer } from '../Footer';
import { SkipLink, Main, WorkspaceMotionShell } from './Layout.style';
import { pageEnter, workspaceEnter } from '../../../styles/animations';

/**
 * Public portfolio shell — cinematic pages with page transitions.
 * Live Lab uses full-viewport workspace mode (no footer, fade-only transition).
 *
 * IMPORTANT: The key on motion.div uses location.key (not pathname) so that
 * navigating back to the same route forces a full re-mount of the page tree,
 * resetting all whileInView animation states correctly.
 */
export const Layout: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const location = useLocation();
  const isLiveLab: boolean = location.pathname === '/live-lab';

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
          <motion.div
            key={location.key}
            variants={isLiveLab ? workspaceEnter : pageEnter}
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
          </motion.div>
        </AnimatePresence>
      </Main>
      {!isLiveLab ? <Footer /> : null}
    </>
  );
};
