// Core
import React from 'react';

// Components
import { TelemetryProvider } from '../../components/workspace/TelemetryProvider';
import { WorkspaceShell } from '../../components/workspace/WorkspaceShell';

// Component
import { LiveLabPageShell } from './LiveLab.style';

export const LiveLab: React.FC = (): React.ReactElement => (
  <LiveLabPageShell data-testid="live-lab-page">
    <TelemetryProvider>
      <WorkspaceShell />
    </TelemetryProvider>
  </LiveLabPageShell>
);
