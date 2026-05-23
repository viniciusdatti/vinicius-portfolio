// Core
import React, { useMemo } from 'react';

// Libraries
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Components
import { useSystemHealth, SystemHealthStatus } from '@/hooks/useSystemHealth';
import {
  StatusPill,
  StatusDot,
} from '@/components/Layout/SystemBar/SystemBar.style';
import { HeaderStatusWrap } from '@/components/Layout/Header/Header.style';

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

/**
 * Header status — minimal API signal on portfolio routes; full transport chrome only in Live Lab.
 */
export const HeaderStatusPills = (): React.ReactElement | null => {
  const { t } = useTranslation();
  const location = useLocation();
  const { status } = useSystemHealth();
  const isLiveLab: boolean = location.pathname === '/live-lab';
  const apiTone: 'ok' | 'warn' | 'idle' = useMemo(() => {
    if (status === SystemHealthStatus.Online) {
      return 'ok';
    }
    if (status === SystemHealthStatus.Offline) {
      return 'warn';
    }
    return 'idle';
  }, [status]);

  const apiLabel: string = useMemo(() => {
    if (status === SystemHealthStatus.Online) {
      return t('header.status.apiOnline');
    }
    if (status === SystemHealthStatus.Offline) {
      return t('header.status.apiOffline');
    }
    return t('header.status.apiChecking');
  }, [status, t]);

  /* Live Lab has its own transport chrome — avoid crowding the navbar. */
  if (isLiveLab) {
    return null;
  }

  return (
    <HeaderStatusWrap role="status" aria-live="polite">
      <StatusPill $tone={apiTone}>
        <StatusDot $tone={apiTone} aria-hidden />
        {apiLabel}
      </StatusPill>
    </HeaderStatusWrap>
  );
};
