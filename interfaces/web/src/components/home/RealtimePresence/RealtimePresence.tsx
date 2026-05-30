// Core
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { useScrollMotion } from '../../../hooks/useScrollMotion';
import { useSystemHealth, SystemHealthStatus } from '../../../hooks/useSystemHealth';

// Styles
import {
  PresenceStrip,
  PresenceInner,
  PresenceLead,
  PresencePill,
  PresenceLink,
  PresenceMicro,
  PresenceMicroDot,
} from './RealtimePresence.style';

// Types
import { OperationalStatusTone } from '../../../types/telemetry';

// Lib
import {
  resolveSystemHealthLabel,
  resolveSystemHealthTone,
} from '../../../lib/systemHealth';

export const RealtimePresence = (): React.ReactElement => {
  const { t } = useTranslation();
  const {
    stagger,
    item,
    viewport,
  } = useScrollMotion();
  const reduced: boolean = usePrefersReducedMotion();
  const { status, version } = useSystemHealth();
  const [tick, setTick] = useState<number>(0);

  useEffect(() => {
    if (reduced) {
      return undefined;
    }
    const id: ReturnType<typeof setInterval> = setInterval(() => {
      setTick((prev: number) => prev + 1);
    }, 3500);
    return () => clearInterval(id);
  }, [reduced]);

  const apiTone: OperationalStatusTone = useMemo(
    (): OperationalStatusTone => resolveSystemHealthTone(status),
    [status],
  );

  const apiLabel: string = useMemo(
    (): string => resolveSystemHealthLabel(status, t, 'homeRealtime'),
    [status, t],
  );

  const microLabel: string = useMemo(() => {
    if (status === SystemHealthStatus.Checking) {
      return t('home.realtime.micro.checking');
    }
    if (version && tick % 2 === 0) {
      return t('home.realtime.micro.build', { version });
    }
    return t('home.realtime.micro.channel');
  }, [status, version, tick, t]);

  return (
    <PresenceStrip id="portfolio-presence">
      <PresenceInner
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <PresenceLead variants={item}>{t('home.realtime.lead')}</PresenceLead>
        <PresencePill $tone={apiTone} variants={item}>
          {apiLabel}
        </PresencePill>
        <PresencePill $tone={OperationalStatusTone.Idle} variants={item}>
          {t('home.realtime.channelIdle')}
        </PresencePill>
        <PresenceMicro variants={item}>
          <PresenceMicroDot $live={apiTone === OperationalStatusTone.Ok} aria-hidden />
          <span>{microLabel}</span>
        </PresenceMicro>
        <PresenceLink to="/live-lab" variants={item}>
          {t('home.realtime.openLab')}
        </PresenceLink>
      </PresenceInner>
    </PresenceStrip>
  );
};
