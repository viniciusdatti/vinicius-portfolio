// Core
import React, { useMemo } from 'react';

// Libraries
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Components
import { useAdminChatStore } from '@/store/adminChatStore';
import {
  AdminBarRoot,
  AdminBarInner,
  AdminBarCluster,
  AdminBarId,
  AdminBarModule,
  AdminBarPill,
} from '@/components/admin/AdminSystemBar/AdminSystemBar.style';

const ADMIN_MODULE_KEYS: Record<string, string> = {
  '/admin': 'admin.system.modules.dashboard',
  '/admin/chat': 'admin.system.modules.inbox',
  '/admin/login': 'admin.system.modules.login',
};

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

export const AdminSystemBar = (): React.ReactElement => {
  const { t } = useTranslation();
  const location = useLocation();
  const isConnected: boolean = useAdminChatStore((s) => s.isConnected);
  const sessions = useAdminChatStore((s) => s.sessions);

  const moduleKey: string = ADMIN_MODULE_KEYS[location.pathname] ?? 'admin.system.modules.console';

  const inboxLabel: string = useMemo((): string => {
    const count: number = sessions.length;
    return t('admin.system.inboxCount', { count });
  }, [sessions, t]);

  const wsTone: 'ok' | 'idle' = isConnected ? 'ok' : 'idle';
  const wsLabel: string = isConnected
    ? t('system.status.wsLive')
    : t('system.status.wsConnecting');

  return (
    <AdminBarRoot role="status" aria-live="polite">
      <AdminBarInner>
        <AdminBarCluster>
          <AdminBarId>{t('admin.system.id')}</AdminBarId>
          <AdminBarModule>{t(moduleKey)}</AdminBarModule>
        </AdminBarCluster>
        <AdminBarCluster>
          <AdminBarPill $tone={wsTone}>{wsLabel}</AdminBarPill>
          <AdminBarPill $tone="idle">{inboxLabel}</AdminBarPill>
        </AdminBarCluster>
      </AdminBarInner>
    </AdminBarRoot>
  );
};
