// Core
import React from 'react';

// Libraries
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Components
import { Header } from './Header';
import { Footer } from './Footer';

// Styles
import { pageVariants, pageTransition } from '../../styles/animations';

const Main = styled(motion.main)`
  min-height: 100vh;
  padding-top: 80px; /* Header height */
`;

export const Layout: React.FC = () => {
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
