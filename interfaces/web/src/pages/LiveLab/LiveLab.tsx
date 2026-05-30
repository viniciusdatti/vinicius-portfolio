// Core
import React from 'react';

// Hooks
import { usePageMeta, PageMetaRoute } from '../../hooks';

// Layout
import { WorkspaceShell } from '../../components/workspace/WorkspaceShell';

// Components
import { TelemetryProvider } from '../../components/workspace/TelemetryProvider';

// Styles
import { LiveLabPageShell } from './LiveLab.style';

export const LiveLab: React.FC = (): React.ReactElement => {
  usePageMeta(PageMetaRoute.LiveLab);

  return (
    <LiveLabPageShell data-testid="live-lab-page">
      <TelemetryProvider>
        <WorkspaceShell />
      </TelemetryProvider>
    </LiveLabPageShell>
  );
};
