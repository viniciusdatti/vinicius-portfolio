type RoutePrefetchLoader = () => Promise<unknown>;

const routePrefetchLoaders: Record<string, RoutePrefetchLoader> = {
  '/': (): Promise<unknown> => import('../../pages/Home'),
  '/about': (): Promise<unknown> => import('../../pages/About'),
  '/skills': (): Promise<unknown> => import('../../pages/Skills'),
  '/projects': (): Promise<unknown> => import('../../pages/Projects'),
  '/contact': (): Promise<unknown> => import('../../pages/Contact'),
};

const PUBLIC_ROUTE_PATHS: readonly string[] = [
  '/skills',
  '/projects',
  '/about',
  '/contact',
];

export const prefetchRouteModule = (pathname: string): void => {
  const loader: RoutePrefetchLoader | undefined = routePrefetchLoaders[pathname];
  if (loader) {
    loader().catch((): undefined => undefined);
  }
};

export const prefetchPublicRoutes = (): void => {
  PUBLIC_ROUTE_PATHS.forEach((pathname: string): void => {
    prefetchRouteModule(pathname);
  });
};
