// Core
import React from 'react';

// Types
import { WorkspaceModule } from '../../../types';

// Components
import { useWorkspaceStore } from '../../../store';
import { LiveChannel } from '../../LiveChannel';
import { LiveLabShowcaseHeader } from '../LiveLabShowcaseHeader';
import { BootHandshake } from '../BootHandshake';
import { ModuleRail } from '../ModuleRail';
import { ContextPanel } from '../ContextPanel';
import {
  WorkspaceRoot,
  WorkspaceSplit,
  ContextColumn,
  LiveColumn,
  ContextInner,
} from './WorkspaceShell.style';

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

export const WorkspaceShell: React.FC = (): React.ReactElement => {
  const module: WorkspaceModule = useWorkspaceStore((s) => s.activeLiveLabModule);

  return (
    <WorkspaceRoot>
      <LiveLabShowcaseHeader />
      <BootHandshake />
      <WorkspaceSplit>
        <ContextColumn>
          <ContextInner>
            <ModuleRail />
            <ContextPanel module={module} />
          </ContextInner>
        </ContextColumn>
        <LiveColumn>
          <LiveChannel />
        </LiveColumn>
      </WorkspaceSplit>
    </WorkspaceRoot>
  );
};
