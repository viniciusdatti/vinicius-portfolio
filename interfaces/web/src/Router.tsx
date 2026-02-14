// Core
import React, { lazy, Suspense } from 'react';

// Libraries
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import { Layout } from './components/layout';
import { Spinner } from './components/common/Spinner';

// Lazy load pages for code splitting
const Home = lazy(() =>
  import('./pages/Home').then((m) => ({ default: m.Home }))
);
const About = lazy(() =>
  import('./pages/About').then((m) => ({ default: m.About }))
);
const Skills = lazy(() =>
  import('./pages/Skills').then((m) => ({ default: m.Skills }))
);
const LiveLab = lazy(() =>
  import('./pages/LiveLab').then((m) => ({ default: m.LiveLab }))
);
const Contact = lazy(() =>
  import('./pages/Contact').then((m) => ({ default: m.Contact }))
);

// Admin pages
const AdminLogin = lazy(() =>
  import('./pages/admin/Login').then((m) => ({ default: m.Login }))
);
const AdminDashboard = lazy(() =>
  import('./pages/admin/Dashboard').then((m) => ({ default: m.Dashboard }))
);
const AdminChat = lazy(() =>
  import('./pages/admin/Chat').then((m) => ({ default: m.Chat }))
);
const AdminLayout = lazy(() =>
  import('./pages/admin/AdminLayout').then((m) => ({ default: m.AdminLayout }))
);

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
const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
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
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
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
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
