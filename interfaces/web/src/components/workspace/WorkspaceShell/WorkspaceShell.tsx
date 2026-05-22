// Core
import React from 'react';

// Components
import { BootHandshake } from '@/components/workspace/BootHandshake';
import { LiveLabShowcaseHeader } from '@/components/workspace/LiveLabShowcaseHeader';
import { TelemetryMonitor } from '@/components/workspace/TelemetryMonitor';
import {
  TelemetryWorkspace,
  WorkspaceRoot,
} from '@/components/workspace/WorkspaceShell/WorkspaceShell.style';

/**
 * Live Lab — operational telemetry surface (portfolio sensors + trend + event log).
 */
export function WorkspaceShell(): React.ReactElement {
  return (
    <WorkspaceRoot data-testid="live-lab-workspace">
      <LiveLabShowcaseHeader />
      <BootHandshake />
      <TelemetryWorkspace>
        <TelemetryMonitor />
      </TelemetryWorkspace>
    </WorkspaceRoot>
  );
}
