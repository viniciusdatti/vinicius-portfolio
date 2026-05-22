// Core
import React from 'react';

// Components
import { TelemetryMonitor } from '../TelemetryMonitor';
import { TelemetryShell } from './WorkspaceShell.style';

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

/**
 * Live Lab surface — WebSocket industrial telemetry only.
 */
export const WorkspaceShell: React.FC = (): React.ReactElement => {
  return (
    <TelemetryShell>
      <TelemetryMonitor />
    </TelemetryShell>
  );
};
