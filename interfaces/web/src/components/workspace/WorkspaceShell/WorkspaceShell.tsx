/**
 * @fileoverview Live Lab workspace shell — atmosphere, telemetry monitor, and scroll pin.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Core
import React, { useEffect } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { useLiveLabWorkspacePin } from '@/hooks/useLiveLabWorkspacePin';
import { useScrollMotion } from '@/hooks/useScrollMotion';
import { BootHandshake } from '@/components/workspace/BootHandshake';
import { LiveLabStreamField } from '@/components/atmosphere/LiveLabStreamField';
import { LiveLabAtmosphere } from '@/components/workspace/LiveLabAtmosphere';
import { LiveLabShowcaseHeader } from '@/components/workspace/LiveLabShowcaseHeader';
import { TelemetryMonitor } from '@/components/workspace/TelemetryMonitor';
import { TelemetryEventLogPlacement } from '@/components/workspace/TelemetryMonitor/TelemetryMonitor.types';
import {
  ImmersionProgressFill,
  ImmersionProgressTrack,
  LiveLabImmersionBand,
  LiveLabLogFlow,
  LiveLabPinStage,
  TelemetryWorkspace,
  WorkspaceChrome,
  WorkspaceRoot,
} from '@/components/workspace/WorkspaceShell/WorkspaceShell.style';

/* *************************************************************************************************
 *************************************** COMPONENT HANDLING ****************************************
 ************************************************************************************************ */

/**
 * Live Lab — full-viewport operational telemetry with 3D atmosphere.
 */
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
