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
 *
 * @roadmap ModuleRail + ContextPanel exist in workspace/ but are not wired yet.
 * When ready to activate multi-module workspace:
 * 1. Import ModuleRail from '@/components/workspace/ModuleRail'
 * 2. Import ContextPanel from '@/components/workspace/ContextPanel'
 * 3. Add WorkspaceLayout grid: ModuleRail (4.5rem) | main | ContextPanel
 * 4. Wire useWorkspaceStore activeModule to TelemetryMonitor/ContextPanel
 * See skill: frontend-architecture P2
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
