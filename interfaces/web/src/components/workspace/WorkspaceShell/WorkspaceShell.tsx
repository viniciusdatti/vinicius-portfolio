// Core
import React from 'react';

// Components
import { useWorkspaceStore } from '../../../store';
import { BootHandshake } from '../BootHandshake';
import { ContextPanel } from '../ContextPanel';
import { LiveLabShowcaseHeader } from '../LiveLabShowcaseHeader';
import { ModuleRail } from '../ModuleRail';
import { TelemetryMonitor } from '../TelemetryMonitor';
import { LiveChannel } from '../../LiveChannel';
import {
  ChannelColumn,
  PanelColumn,
  TelemetryColumn,
  WorkspaceBody,
  WorkspaceRoot,
} from './WorkspaceShell.style';

/**
 * Live Lab workspace — context panel, realtime chat, and telemetry (portfolio shell).
 */
export function WorkspaceShell(): React.ReactElement {
  const activeModule = useWorkspaceStore((s) => s.activeLiveLabModule);

  return (
    <WorkspaceRoot data-testid="live-lab-workspace">
      <LiveLabShowcaseHeader />
      <BootHandshake />
      <WorkspaceBody>
        <ModuleRail />
        <PanelColumn>
          <ContextPanel module={activeModule} />
        </PanelColumn>
        <ChannelColumn>
          <LiveChannel />
        </ChannelColumn>
        <TelemetryColumn>
          <TelemetryMonitor />
        </TelemetryColumn>
      </WorkspaceBody>
    </WorkspaceRoot>
  );
}
