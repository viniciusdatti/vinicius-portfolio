// Core
import React from 'react';

// Components
import { TelemetryProvider } from '@/components/workspace/TelemetryProvider';
import { WorkspaceShell } from '@/components/workspace/WorkspaceShell';

/**
 * Live Lab — live industrial telemetry (Vantage-style transport + sensor surface).
 */
export function LiveLab(): React.ReactElement {
  return (
    <TelemetryProvider>
      <WorkspaceShell />
    </TelemetryProvider>
  );
}
