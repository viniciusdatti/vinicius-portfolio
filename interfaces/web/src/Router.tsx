// Core
import React, { lazy, Suspense } from 'react';

// Libraries
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

// Components
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
]);

export const Router = (): React.ReactElement => <RouterProvider router={router} />;
