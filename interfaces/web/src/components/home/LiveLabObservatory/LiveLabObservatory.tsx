// Core
import React from 'react';

// Hooks
import { useSystemHealth } from '../../../hooks/useSystemHealth';

// Lib
import { resolveSystemHealthIsLive } from '../../../lib/systemHealth';

// LiveLabObservatory
import { LiveLabObservatoryConnected } from './LiveLabObservatoryConnected';
import { LiveLabObservatorySimulated } from './LiveLabObservatorySimulated';

export const LiveLabObservatory: React.FC = (): React.ReactElement => {
  const { status } = useSystemHealth();
  const isApiLive: boolean = resolveSystemHealthIsLive(status);

  if (isApiLive) {
    return <LiveLabObservatoryConnected />;
  }

  return <LiveLabObservatorySimulated />;
};
