// Core
import React from 'react';

// Libraries
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Components
import { Header } from '../Header';
import { Footer } from '../Footer';
import { SkipLink, Main } from './Layout.style';

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

/**
 * Public portfolio shell — cinematic pages with refined system chrome.
 * Live Lab uses full-viewport workspace mode (no footer).
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
        <Outlet />
      </Main>
      {!isLiveLab ? <Footer /> : null}
    </>
  );
};
