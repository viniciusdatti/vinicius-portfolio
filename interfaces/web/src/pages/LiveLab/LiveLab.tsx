// Core
import React from 'react';

// Components
import { TelemetryProvider } from '@/components/Workspace/TelemetryProvider';
import { WorkspaceShell } from '@/components/Workspace/WorkspaceShell';
import { LiveLabPageShell } from '@/pages/LiveLab/LiveLab.style';

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
