/**
 * @fileoverview Protects admin routes: validates JWT + admin role before rendering children.
 */

// Core
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import { UserRole } from '../../types';

// Components
import {
  AdminAuthLoading,
  AdminSystemBar,
  AdminMain,
} from '../../components/admin';
import { env } from '../../config/env';
import {
  startAdminChatRealtime,
  stopAdminChatRealtime,
} from '../../realtime/adminChatRealtime';
import { useAuthStore } from '../../store';

const API_BASE: string = env.apiUrl;

enum AdminGateStatus {
  Loading = 'loading',
  Authorized = 'authorized',
  Unauthorized = 'unauthorized',
}

/**
 * Layout gate for /admin/* (except login). Starts chat realtime when authorized.
 */
export const AdminLayout: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const { tokens, user, setAuth, logout } = useAuthStore();
  const [gateStatus, setGateStatus] = useState<AdminGateStatus>(
    AdminGateStatus.Loading
  );
  const accessToken: string | undefined = tokens?.access_token;

  useEffect(() => {
    if (!accessToken) {
      setGateStatus(AdminGateStatus.Unauthorized);
      return;
    }

    const baseUrl: string = API_BASE.replace(/\/api\/v1\/?$/, '') || '';
    const url: string = `${baseUrl}/api/v1/auth/me`;

    const checkAdmin = async (): Promise<void> => {
      try {
        const res: Response = await fetch(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (res.status === 401 || res.status === 403 || !res.ok) {
          logout();
          setGateStatus(AdminGateStatus.Unauthorized);
          return;
        }
        const me = await res.json();
        const isAdmin: boolean =
          me.role === UserRole.Admin || me.role === UserRole.SuperAdmin;
        if (!isAdmin) {
          logout();
          setGateStatus(AdminGateStatus.Unauthorized);
          return;
        }
        if (!tokens) {
          logout();
          setGateStatus(AdminGateStatus.Unauthorized);
          return;
        }
        setAuth(
          { id: me.id, email: me.email, name: me.name, role: me.role },
          tokens
        );
        setGateStatus(AdminGateStatus.Authorized);
      } catch {
        logout();
        setGateStatus(AdminGateStatus.Unauthorized);
      }
    };

    void checkAdmin();
  }, [accessToken, logout, setAuth, tokens]);

  useEffect(() => {
    if (gateStatus !== AdminGateStatus.Authorized || !accessToken || !user) {
      return;
    }
    startAdminChatRealtime(accessToken);
    return () => {
      stopAdminChatRealtime();
    };
  }, [gateStatus, accessToken, user]);

  if (gateStatus === AdminGateStatus.Loading) {
    return <AdminAuthLoading message={t('admin.auth.validating')} />;
  }

  if (gateStatus === AdminGateStatus.Unauthorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <>
      <AdminSystemBar />
      <AdminMain>
        <Outlet />
      </AdminMain>
    </>
  );
};
