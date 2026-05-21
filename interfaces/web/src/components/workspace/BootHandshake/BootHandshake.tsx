// Core
import React, { useEffect, useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { useChatStore } from '../../../store';
import {
  BootRoot,
  BootRow,
  BootCopy,
  BootTitle,
  BootPhase,
  BootTrack,
  BootFill,
} from './BootHandshake.style';

enum BootHandshakePhase {
  Initializing = 'initializing',
  Connecting = 'connecting',
  Live = 'live',
  Ready = 'ready',
}

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

/**
 * Operational boot strip — handshake from init → transport live (behavior, not marketing copy).
 */
export const BootHandshake: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const isConnected: boolean = useChatStore((s) => s.isConnected);
  const [phase, setPhase] = useState<BootHandshakePhase>(
    BootHandshakePhase.Initializing
  );

  useEffect(() => {
    const initTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setPhase(BootHandshakePhase.Connecting);
    }, 320);
    return () => clearTimeout(initTimer);
  }, []);

  useEffect(() => {
    if (!isConnected) {
      setPhase((current: BootHandshakePhase) =>
        current === BootHandshakePhase.Initializing
          ? current
          : BootHandshakePhase.Connecting
      );
      return;
    }
    setPhase(BootHandshakePhase.Live);
    const readyTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setPhase(BootHandshakePhase.Ready);
    }, 900);
    return () => clearTimeout(readyTimer);
  }, [isConnected]);

  const phaseKey: string = `workspace.boot.phases.${phase}`;
  const progress: number =
    phase === BootHandshakePhase.Initializing
      ? 18
      : phase === BootHandshakePhase.Connecting
        ? 42
        : phase === BootHandshakePhase.Live
          ? 78
          : 100;

  return (
    <BootRoot aria-live="polite">
      <BootRow>
        <BootCopy>
          <BootTitle>{t('workspace.boot.transportStatus')}</BootTitle>
          <BootPhase>{t(phaseKey)}</BootPhase>
        </BootCopy>
        <BootTrack aria-hidden>
          <BootFill
            $progress={progress}
            $live={phase === BootHandshakePhase.Live || phase === BootHandshakePhase.Ready}
          />
        </BootTrack>
      </BootRow>
    </BootRoot>
  );
};
