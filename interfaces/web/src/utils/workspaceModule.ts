// Types
import { WorkspaceModule } from '../types';

const PATH_BY_MODULE: Record<WorkspaceModule, string> = {
  [WorkspaceModule.Identity]: '/',
  [WorkspaceModule.Cases]: '/projects',
  [WorkspaceModule.Capabilities]: '/skills',
};

const MODULE_BY_PATH: Record<string, WorkspaceModule> = {
  '/': WorkspaceModule.Identity,
  '/about': WorkspaceModule.Identity,
  '/projects': WorkspaceModule.Cases,
  '/skills': WorkspaceModule.Capabilities,
  '/contact': WorkspaceModule.Identity,
  '/live-lab': WorkspaceModule.Cases,
};

/**
 * Resolves the active workspace module from the current pathname.
 */
export const resolveWorkspaceModule = (pathname: string): WorkspaceModule => {
  const module: WorkspaceModule | undefined = MODULE_BY_PATH[pathname];
  return module ?? WorkspaceModule.Identity;
};

/**
 * Returns the route path for a workspace module.
 */
export const getWorkspaceModulePath = (module: WorkspaceModule): string => {
  return PATH_BY_MODULE[module];
};

/**
 * Short session label for system chrome (last 6 chars).
 */
export const formatSessionLabel = (sessionId: string | null): string | null => {
  if (!sessionId) {
    return null;
  }
  const trimmed: string = sessionId.replace(/-/g, '');
  if (trimmed.length <= 6) {
    return trimmed.toUpperCase();
  }
  return trimmed.slice(-6).toUpperCase();
};
