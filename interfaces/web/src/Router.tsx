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

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Skills = lazy(() => import('./pages/Skills').then((m) => ({ default: m.Skills })));
const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const LiveLab = lazy(() => import('./pages/LiveLab').then((m) => ({ default: m.LiveLab })));

const AdminLogin = lazy(() => import('./pages/admin/Login').then((m) => ({ default: m.Login })));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard').then((m) => ({ default: m.Dashboard })));
const AdminChat = lazy(() => import('./pages/admin/Chat').then((m) => ({ default: m.Chat })));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })));

function PageLoader(): React.ReactElement {
  return (
    <PageLoaderWrapper>
      <Spinner size="lg" />
    </PageLoaderWrapper>
  );
}

const withSuspense = (element: React.ReactElement): React.ReactElement => (
  <Suspense fallback={<PageLoader />}>{element}</Suspense>
);

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: withSuspense(<Home />) },
      { path: 'about', element: withSuspense(<About />) },
      { path: 'skills', element: withSuspense(<Skills />) },
      { path: 'projects', element: withSuspense(<Projects />) },
      { path: 'contact', element: withSuspense(<Contact />) },
      { path: 'live-lab', element: withSuspense(<LiveLab />) },
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

export function Router(): React.ReactElement {
  return <RouterProvider router={router} />;
}
