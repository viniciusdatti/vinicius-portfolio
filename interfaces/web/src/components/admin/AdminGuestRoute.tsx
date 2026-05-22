/**
 * Guards /admin/login — redirects authenticated admins away from the login page.
 */

// Core
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import { UserRole } from '@/types';

// Components
import { env } from '@/config/env';
import { AdminAuthLoading } from '@/components/admin/AdminAuthLoading';
import { useAuthStore } from '@/store';

const API_BASE: string = env.apiUrl;

enum GuestGateStatus {
  Checking = 'checking',
  AllowGuest = 'allow_guest',
  RedirectAdmin = 'redirect_admin',
}

/**
 * Renders login routes only for guests; valid admin sessions go to /admin.
 */
export function AdminGuestRoute(): React.ReactElement {
  const { t } = useTranslation();
  const {
    tokens, user, logout, setAuth,
  } = useAuthStore();
  const [status, setStatus] = useState<GuestGateStatus>(GuestGateStatus.Checking);

  useEffect(() => {
    const accessToken: string | undefined = tokens?.access_token;
    if (!accessToken) {
      setStatus(GuestGateStatus.AllowGuest);
      return;
    }

    const isAdminUser: boolean = (
      user?.role === UserRole.Admin || user?.role === UserRole.SuperAdmin
    );
    if (isAdminUser && tokens) {
      setStatus(GuestGateStatus.RedirectAdmin);
      return;
    }

    const baseUrl: string = API_BASE.replace(/\/api\/v1\/?$/, '') || '';
    const verifySession = async (): Promise<void> => {
      try {
        const res: Response = await fetch(`${baseUrl}/api/v1/auth/me`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!res.ok) {
          logout();
          setStatus(GuestGateStatus.AllowGuest);
          return;
        }
        const me = await res.json();
        const isAdmin: boolean = me.role === UserRole.Admin || me.role === UserRole.SuperAdmin;
        if (!isAdmin) {
          logout();
          setStatus(GuestGateStatus.AllowGuest);
          return;
        }
        if (tokens) {
          setAuth(
            {
              id: me.id, email: me.email, name: me.name, role: me.role,
            },
            tokens,
          );
        }
        setStatus(GuestGateStatus.RedirectAdmin);
      } catch {
        logout();
        setStatus(GuestGateStatus.AllowGuest);
      }
    };

    verifySession().catch(() => undefined);
  }, [tokens, user, logout, setAuth]);

  if (status === GuestGateStatus.Checking) {
    return <AdminAuthLoading message={t('admin.auth.checkingSession')} />;
  }

  if (status === GuestGateStatus.RedirectAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
