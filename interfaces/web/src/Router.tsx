// Core
import React, { lazy, Suspense } from 'react';

// Libraries
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import { Layout } from './components/layout';
import { Spinner } from './components/common/Spinner';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Skills = lazy(() => import('./pages/Skills'));
const LiveLab = lazy(() => import('./pages/LiveLab'));
const Contact = lazy(() => import('./pages/Contact'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminChat = lazy(() => import('./pages/admin/Chat'));

// Page loader component
const PageLoader: React.FC = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh'
  }}>
    <Spinner size="lg" />
  </div>
);

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: 'skills',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Skills />
          </Suspense>
        ),
      },
      {
        path: 'live-lab',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LiveLab />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/admin',
    children: [
      {
        path: 'login',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminLogin />
          </Suspense>
        ),
      },
      {
        path: '',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: 'chat',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminChat />
          </Suspense>
        ),
      },
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
