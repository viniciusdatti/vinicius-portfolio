// Core
import React, { useEffect } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { useLiveLabWorkspacePin } from '../../../hooks/useLiveLabWorkspacePin';
import { useScrollMotion } from '../../../hooks/useScrollMotion';

// Components
import { BootHandshake } from '../BootHandshake';
import { LiveLabStreamField } from '../../atmosphere/LiveLabStreamField';
import { LiveLabAtmosphere } from '../LiveLabAtmosphere';
import { LiveLabShowcaseHeader } from '../LiveLabShowcaseHeader';
import { TelemetryMonitor } from '../TelemetryMonitor';
import { TelemetryEventLogPlacement } from '../TelemetryMonitor/TelemetryMonitor.types';
import {
  ImmersionProgressFill,
  ImmersionProgressTrack,
  LiveLabImmersionBand,
  LiveLabLogFlow,
  LiveLabPinStage,
  TelemetryWorkspace,
  WorkspaceChrome,
  WorkspaceRoot,
} from './WorkspaceShell.style';

export const WorkspaceShell: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const { refs, pinEnabled } = useLiveLabWorkspacePin();
  const { section, viewport } = useScrollMotion();

  useEffect(() => {
    document.body.classList.remove('workspace-scroll-locked');
  }, []);

  return (
    <WorkspaceRoot data-testid="live-lab-workspace">
      <LiveLabStreamField />
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
