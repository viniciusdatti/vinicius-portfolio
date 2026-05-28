// Core
import React, { useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { useSystemHealth, SystemHealthStatus } from '../../hooks/useSystemHealth';

// Component
import {
  LiveMicroRoot,
  LiveMicroDot,
  LiveMicroLabel,
  LiveMicroHint,
} from './HeroLiveMicro.style';

export const HeroLiveMicro = (): React.ReactElement => {
  const { t } = useTranslation();
  const { status, version } = useSystemHealth();

  const isLive: boolean = status === SystemHealthStatus.Online;

  const statusLabel: string = useMemo(() => {
    if (status === SystemHealthStatus.Online) {
      return t('home.hero.liveMicro.apiLive');
    }
    if (status === SystemHealthStatus.Offline) {
      return t('home.hero.liveMicro.apiAway');
    }
    return t('home.hero.liveMicro.apiSync');
  }, [status, t]);

  const hintLabel: string = useMemo(() => {
    if (version) {
      return t('home.hero.liveMicro.build', { version });
    }
    return t('home.hero.liveMicro.channelHint');
  }, [version, t]);

  return (
    <LiveMicroRoot>
      <LiveMicroDot $live={isLive} aria-hidden />
      <div>
        <LiveMicroLabel>{statusLabel}</LiveMicroLabel>
        <LiveMicroHint>{hintLabel}</LiveMicroHint>
      </div>
    </LiveMicroRoot>
  );
};
