// Core
import React from 'react';

// Components
import { LiveLabPageShell } from '@/pages/LiveLab/LiveLab.style';
import { TelemetryProvider } from '@/components/workspace/TelemetryProvider';
import { WorkspaceShell } from '@/components/workspace/WorkspaceShell';

/**
 * Live Lab — live industrial telemetry (operational regime).
 */
export const LiveLab: React.FC = (): React.ReactElement => (
  <LiveLabPageShell data-testid="live-lab-page">
    <TelemetryProvider>
      <WorkspaceShell />
    </TelemetryProvider>
  </LiveLabPageShell>
);
