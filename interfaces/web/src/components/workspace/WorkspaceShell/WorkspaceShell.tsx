// Core
import React from 'react';

// Components
import { BootHandshake } from '@/components/workspace/BootHandshake';
import { LiveLabAtmosphere } from '@/components/workspace/LiveLabAtmosphere';
import { LiveLabShowcaseHeader } from '@/components/workspace/LiveLabShowcaseHeader';
import { TelemetryMonitor } from '@/components/workspace/TelemetryMonitor';
import {
  TelemetryWorkspace,
  WorkspaceChrome,
  WorkspaceRoot,
} from '@/components/workspace/WorkspaceShell/WorkspaceShell.style';

/**
 * Live Lab — full-viewport operational telemetry with 3D atmosphere.
 */
export function WorkspaceShell(): React.ReactElement {
  return (
    <WorkspaceRoot data-testid="live-lab-workspace">
      <LiveLabAtmosphere />
      <WorkspaceChrome>
        <LiveLabShowcaseHeader />
        <BootHandshake />
        <TelemetryWorkspace>
          <TelemetryMonitor />
        </TelemetryWorkspace>
      </WorkspaceChrome>
    </WorkspaceRoot>
  );
}
