// Core
import React, { useEffect, useMemo, useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { useScrollMotion } from '@/hooks/useScrollMotion';

// Components
import { useSystemHealth, SystemHealthStatus } from '@/hooks/useSystemHealth';
import {
  PresenceStrip,
  PresenceInner,
  PresenceLead,
  PresencePill,
  PresenceLink,
  PresenceMicro,
  PresenceMicroDot,
} from '@/components/home/RealtimePresence/RealtimePresence.style';

// =================================================================================================
// ========================================== COMPONENT ============================================
// =================================================================================================

/**
 * Subtle live strip on home — connection truth and micro-activity without console chrome.
 */
export const RealtimePresence = (): React.ReactElement => {
  const { t } = useTranslation();
  const { stagger, item, viewport } = useScrollMotion();
  const { status, version } = useSystemHealth();
  const [tick, setTick] = useState<number>(0);

  useEffect(() => {
    const id: ReturnType<typeof setInterval> = setInterval(() => {
      setTick((prev: number) => prev + 1);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const apiTone: 'ok' | 'idle' | 'warn' = useMemo(() => {
    if (status === SystemHealthStatus.Online) {
      return 'ok';
    }
    if (status === SystemHealthStatus.Offline) {
      return 'warn';
    }
    return 'idle';
  }, [status]);

  const getApiLabel = (): string => {
    if (status === SystemHealthStatus.Online) return t('home.realtime.apiLive');
    if (status === SystemHealthStatus.Offline) return t('home.realtime.apiAway');
    return t('home.realtime.apiSync');
  };

  const apiLabel: string = getApiLabel();

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
        <PresencePill $tone="idle" variants={item}>
          {t('home.realtime.channelIdle')}
        </PresencePill>
        <PresenceMicro variants={item}>
          <PresenceMicroDot $live={apiTone === 'ok'} aria-hidden />
          <span>{microLabel}</span>
        </PresenceMicro>
        <PresenceLink to="/live-lab" variants={item}>
          {t('home.realtime.openLab')}
        </PresenceLink>
      </PresenceInner>
    </PresenceStrip>
  );
};
