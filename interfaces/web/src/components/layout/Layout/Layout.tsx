// Core
import React from 'react';

// Libraries
import { Outlet } from 'react-router-dom';

// Components
import { Header } from '../Header';
import { Footer } from '../Footer';

// Styles
import { pageVariants, pageTransition } from '../../../styles/animations';
import { Main } from './Layout.style';

export const Layout: React.FC = (): React.ReactElement => {
  return (
    <>
      <Header />
      <Main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};
