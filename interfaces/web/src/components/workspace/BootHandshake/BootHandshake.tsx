// Core
import React, { useEffect, useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { useScrollMotion } from '../../../hooks/useScrollMotion';

// Styles
import {
  BootRoot,
  BootRow,
  BootCopy,
  BootTitle,
  BootPhase,
  BootTrack,
  BootFill,
} from './BootHandshake.style';

// Workspace
import { useTelemetry } from '../TelemetryProvider';

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

export const BootHandshake = (): React.ReactElement | null => {
  const { t } = useTranslation();
  const { connected } = useTelemetry();
  const { section, viewport } = useScrollMotion();
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

  if (phase === BootHandshakePhase.Ready) {
    return null;
  }

  return (
    <BootRoot
      aria-label={t('liveLab.boot.transportStatus')}
      aria-live="polite"
      variants={section}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <BootRow>
        <BootCopy>
          <BootTitle>{t('liveLab.boot.transportStatus')}</BootTitle>
          <BootPhase>
            <span aria-hidden>{'› '}</span>
            {t(phaseKey)}
          </BootPhase>
        </BootCopy>
        <BootTrack aria-hidden>
          <BootFill
            $progress={progress}
            $live={phase === BootHandshakePhase.Live}
          />
        </BootTrack>
      </BootRow>
    </BootRoot>
  );
};
