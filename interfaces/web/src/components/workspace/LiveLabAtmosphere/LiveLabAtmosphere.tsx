// Core
import React, { Suspense, lazy } from 'react';

// Hooks
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { useWebGLAvailable } from '../../../hooks/useWebGLAvailable';

// LiveLabAtmosphere
import { LiveLabAtmosphereCss } from './LiveLabAtmosphereCss';

const LiveLabAtmosphereGL = lazy(
  async (): Promise<{ default: React.ComponentType }> => {
    const module = await import(
      './LiveLabAtmosphereGL'
    );
    return { default: module.LiveLabAtmosphereGL };
  },
);

export const LiveLabAtmosphere = (): React.ReactElement => {
  const reduced: boolean = usePrefersReducedMotion();
  const webglAvailable: boolean = useWebGLAvailable();

  if (!reduced && webglAvailable) {
    return (
      <Suspense fallback={<LiveLabAtmosphereCss />}>
        <LiveLabAtmosphereGL />
      </Suspense>
    );
  }

  return <LiveLabAtmosphereCss />;
};
