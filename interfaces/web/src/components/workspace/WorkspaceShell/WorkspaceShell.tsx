// Core
import React, { useEffect } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { useLiveLabWorkspacePin } from '@/hooks/useLiveLabWorkspacePin';
import { useScrollMotion } from '@/hooks/useScrollMotion';

// Components
import { BootHandshake } from '@/components/Workspace/BootHandshake';
import { LiveLabAtmosphere } from '@/components/Workspace/LiveLabAtmosphere';
import { LiveLabShowcaseHeader } from '@/components/Workspace/LiveLabShowcaseHeader';
import { TelemetryMonitor } from '@/components/Workspace/TelemetryMonitor';
import { TelemetryEventLogPlacement } from '@/components/Workspace/TelemetryMonitor/TelemetryMonitor.types';
import {
  ImmersionProgressFill,
  ImmersionProgressTrack,
  LiveLabImmersionBand,
  LiveLabLogFlow,
  LiveLabPinStage,
  TelemetryWorkspace,
  WorkspaceChrome,
  WorkspaceRoot,
} from '@/components/Workspace/WorkspaceShell/WorkspaceShell.style';

/**
 * Live Lab — full-viewport operational telemetry with 3D atmosphere.
 *
 * @roadmap ModuleRail + ContextPanel exist in workspace/ but are not wired yet.
 * When ready to activate multi-module workspace:
 * 1. Import ModuleRail from '@/components/Workspace/ModuleRail'
 * 2. Import ContextPanel from '@/components/Workspace/ContextPanel'
 * 3. Add WorkspaceLayout grid: ModuleRail (4.5rem) | main | ContextPanel
 * 4. Wire useWorkspaceStore activeModule to TelemetryMonitor/ContextPanel
 * See skill: frontend-architecture P2
 */
export const WorkspaceShell: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const { refs, pinEnabled } = useLiveLabWorkspacePin();
  const { section, viewport } = useScrollMotion();

  useEffect(() => {
    document.body.classList.toggle('workspace-scroll-locked', !pinEnabled);
    return (): void => {
      document.body.classList.remove('workspace-scroll-locked');
    };
  }, [pinEnabled]);

  return (
    <WorkspaceRoot data-testid="live-lab-workspace">
      <LiveLabAtmosphere />
      <WorkspaceChrome>
        <LiveLabShowcaseHeader />
        <BootHandshake />
        {pinEnabled ? (
          <ImmersionProgressTrack aria-hidden>
            <ImmersionProgressFill ref={refs.progressRef} />
          </ImmersionProgressTrack>
        ) : null}
        <LiveLabImmersionBand
          ref={refs.sectionRef}
          $immersive={pinEnabled}
          aria-label={t('liveLab.workspace.ariaLabel')}
          variants={section}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <LiveLabPinStage ref={refs.stageRef}>
            <TelemetryWorkspace>
              <TelemetryMonitor
                eventLogPlacement={
                  pinEnabled
                    ? TelemetryEventLogPlacement.None
                    : TelemetryEventLogPlacement.Embedded
                }
              />
            </TelemetryWorkspace>
          </LiveLabPinStage>
          {pinEnabled ? (
            <LiveLabLogFlow ref={refs.logFlowRef}>
              <TelemetryMonitor eventLogPlacement={TelemetryEventLogPlacement.Flow} />
            </LiveLabLogFlow>
          ) : null}
        </LiveLabImmersionBand>
      </WorkspaceChrome>
    </WorkspaceRoot>
  );
};
