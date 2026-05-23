// Core
import React, { lazy, Suspense } from 'react';

// Libraries
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

// Components
import { AdminGuestRoute } from '@/components/admin';
import { Layout } from '@/components/layout';
import { RouteError } from '@/components/RouteError';
import { Spinner } from '@/components/common/Spinner';
import { PageLoaderWrapper } from '@/Router.style';
import { LiveLab } from '@/pages/LiveLab';

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Skills = lazy(() => import('./pages/Skills').then((m) => ({ default: m.Skills })));
const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));

const AdminLogin = lazy(() => import('./pages/admin/Login').then((m) => ({ default: m.Login })));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard').then((m) => ({ default: m.Dashboard })));
const AdminChat = lazy(() => import('./pages/admin/Chat').then((m) => ({ default: m.Chat })));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })));

const PageLoader = (): React.ReactElement => (
  <PageLoaderWrapper>
    <Spinner size="lg" />
  </PageLoaderWrapper>
);

const withSuspense = (element: React.ReactElement): React.ReactElement => (
  <Suspense fallback={<PageLoader />}>{element}</Suspense>
);

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: withSuspense(<Home key="home-view" />) },
      { path: 'about', element: withSuspense(<About key="about-view" />) },
      { path: 'skills', element: withSuspense(<Skills key="skills-view" />) },
      { path: 'projects', element: withSuspense(<Projects key="projects-view" />) },
      { path: 'contact', element: withSuspense(<Contact key="contact-view" />) },
      { path: 'live-lab', element: <LiveLab key="live-lab-view" /> },
      { path: 'home', element: <Navigate to="/" replace /> },
    ],
  },
  {
    path: '/admin',
    errorElement: <RouteError />,
    children: [
      {
        element: <AdminGuestRoute />,
        children: [
          {
            path: 'login',
            element: withSuspense(<AdminLogin />),
          },
        ],
      },
      {
        element: withSuspense(<AdminLayout />),
        children: [
          {
            index: true,
            element: withSuspense(<AdminDashboard />),
          },
          {
            path: 'chat',
            element: withSuspense(<AdminChat />),
          },
        ],
      },
    ],
  },
]);

export const Router = (): React.ReactElement => <RouterProvider router={router} />;
