// Core
import React from 'react';

// Components
import { WorkspaceShell } from '../../components/workspace/WorkspaceShell';

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

/**
 * @deprecated Use pages/LiveLab — workspace shell is only mounted at /live-lab.
 */
export const Workspace: React.FC = (): React.ReactElement => {
  return <WorkspaceShell />;
};
