// Core
import React from 'react';

// Components
import { TelemetryMonitor } from '../TelemetryMonitor';
import { LiveLabShowcaseHeader } from '../LiveLabShowcaseHeader';
import {
  WorkspaceRoot,
  WorkspaceBody,
  ChatColumn,
} from './WorkspaceShell.style';

export const WorkspaceShell: React.FC = (): React.ReactElement => {
  return (
    <WorkspaceRoot>
      <LiveLabShowcaseHeader />
      <WorkspaceBody>
        <ChatColumn>
          <TelemetryMonitor />
        </ChatColumn>
      </WorkspaceBody>
    </WorkspaceRoot>
  );
};
