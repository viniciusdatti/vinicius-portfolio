// Core
import React, { useEffect } from 'react';

// Libraries
import { useLocation, useOutlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Hooks
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import {
  ScrollMotionViewportProvider,
  useScrollMotionViewport,
} from '../../../hooks/scrollMotionViewport';

// Layout
import { Header } from '../Header';
import { Footer } from '../Footer';
import { LayoutAmbientBackdrop } from '../LayoutAmbientBackdrop';

// Styles
import { resolvePageTransition } from '../../../styles/animations';
import {
  SkipLink,
  Main,
  PageMotionLayer,
  WorkspaceMotionShell,
} from './Layout.style';

// Lib
import { prefetchPublicRoutes } from '../../../lib/routing';

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
