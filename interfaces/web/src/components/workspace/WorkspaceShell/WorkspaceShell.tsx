// Core
import React, { useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import { WorkspaceModule } from '../../../types';

// Components
import { useWorkspaceStore } from '../../../store';
import { TelemetryMonitor } from '../TelemetryMonitor';
import { LiveLabShowcaseHeader } from '../LiveLabShowcaseHeader';
import { BootHandshake } from '../BootHandshake';
import { ContextPanel } from '../ContextPanel';
import {
  WorkspaceRoot,
  WorkspaceBody,
  SidebarColumn,
  SidebarHeader,
  SidebarTitle,
  SidebarClose,
  SidebarContent,
  SidebarOverlay,
  ChatColumn,
  MobileSidebarTrigger,
} from './WorkspaceShell.style';

export const WorkspaceShell: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const module: WorkspaceModule = useWorkspaceStore((s) => s.activeLiveLabModule);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <WorkspaceRoot>
      <LiveLabShowcaseHeader
        sidebarTrigger={
          <MobileSidebarTrigger
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label={t('workspace.sidebar.open')}
          >
            ☰ {t('workspace.sidebar.label')}
          </MobileSidebarTrigger>
        }
      />
      <BootHandshake />
      <WorkspaceBody>
        {/* Sidebar — secondary context, hidden on mobile */}
        <SidebarOverlay
          $visible={sidebarOpen}
          onClick={() => setSidebarOpen(false)}
        />
        <SidebarColumn $open={sidebarOpen}>
          <SidebarHeader>
            <SidebarTitle>{t('workspace.sidebar.label')}</SidebarTitle>
            <SidebarClose
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label={t('workspace.sidebar.close')}
            >
              ×
            </SidebarClose>
          </SidebarHeader>
          <SidebarContent>
            <ContextPanel module={module} />
          </SidebarContent>
        </SidebarColumn>

        {/* Telemetry monitor — main product, always visible */}
        <ChatColumn>
          <TelemetryMonitor />
        </ChatColumn>
      </WorkspaceBody>
    </WorkspaceRoot>
  );
};
