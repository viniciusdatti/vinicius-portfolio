// Core
import React, { useEffect, useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { useTelemetry } from '@/components/workspace/TelemetryProvider';
import {
  BootRoot,
  BootRow,
  BootCopy,
  BootTitle,
  BootPhase,
  BootTrack,
  BootFill,
} from '@/components/workspace/BootHandshake/BootHandshake.style';

enum BootHandshakePhase {
  Initializing = 'initializing',
  Connecting = 'connecting',
  Live = 'live',
  Ready = 'ready',
}

const getBootProgress = (phase: BootHandshakePhase): number => {
  if (phase === BootHandshakePhase.Initializing) return 18;
  if (phase === BootHandshakePhase.Connecting) return 42;
  if (phase === BootHandshakePhase.Live) return 78;
  return 100;
};

/**
 * Transport boot strip — mirrors production edge handshake: init → socket → live telemetry.
 */
export function BootHandshake(): React.ReactElement {
  const { t } = useTranslation();
  const { connected } = useTelemetry();
  const [phase, setPhase] = useState<BootHandshakePhase>(
    BootHandshakePhase.Initializing,
  );

  useEffect(() => {
    const initTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setPhase(BootHandshakePhase.Connecting);
    }, 320);
    return () => clearTimeout(initTimer);
  }, []);

  useEffect(() => {
    let readyTimer: ReturnType<typeof setTimeout> | undefined;

    if (!connected) {
      setPhase((current: BootHandshakePhase) => (current === BootHandshakePhase.Initializing
        ? current
        : BootHandshakePhase.Connecting));
    } else {
      setPhase(BootHandshakePhase.Live);
      readyTimer = setTimeout(() => {
        setPhase(BootHandshakePhase.Ready);
      }, 900);
    }

    return () => {
      if (readyTimer) clearTimeout(readyTimer);
    };
  }, [connected]);

  const phaseKey: string = `liveLab.boot.phases.${phase}`;
  const progress: number = getBootProgress(phase);

  return (
    <BootRoot aria-live="polite">
      <BootRow>
        <BootCopy>
          <BootTitle>{t('liveLab.boot.transportStatus')}</BootTitle>
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
}
