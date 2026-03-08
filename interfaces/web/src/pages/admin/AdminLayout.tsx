/**
 * @fileoverview Admin layout that connects the admin chat socket when the user
 * is in the admin area (Dashboard or Chat). Validates that the user has admin
 * role via /me before rendering; redirects to login on 401/403.
 */

// Core
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// Types
import { UserRole } from '../../types';

// Store
import { useAuthStore } from '../../store';

// Utils
import { socketService } from '../../utils/socket';

const API_BASE: string =
  process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

export const AdminLayout: React.FC = (): React.ReactElement | null => {
  const navigate = useNavigate();
  const { tokens, user, setAuth, logout } = useAuthStore();
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  useEffect(() => {
    if (!tokens?.access_token) {
      navigate('/admin/login', { replace: true });
      return;
    }

    const baseUrl: string = API_BASE.replace(/\/api\/v1\/?$/, '') || '';
    const url: string = `${baseUrl}/api/v1/auth/me`;

    const checkAdmin = async (): Promise<void> => {
      try {
        const res: Response = await fetch(url, {
          headers: { Authorization: `Bearer ${tokens.access_token}` },
        });
        if (res.status === 401 || res.status === 403) {
          logout();
          navigate('/admin/login', { replace: true });
          return;
        }
        if (!res.ok) {
          logout();
          navigate('/admin/login', { replace: true });
          return;
        }
        const me = await res.json();
        const isAdmin: boolean =
          me.role === UserRole.Admin || me.role === UserRole.SuperAdmin;
        if (!isAdmin) {
          logout();
          navigate('/admin/login', { replace: true });
          return;
        }
        setAuth(
          { id: me.id, email: me.email, name: me.name, role: me.role },
          tokens
        );
      } catch {
        logout();
        navigate('/admin/login', { replace: true });
        return;
      } finally {
        setAuthChecked(true);
      }
    };

    checkAdmin();
  }, [tokens?.access_token, navigate, logout, setAuth]);

  useEffect(() => {
    if (!tokens?.access_token || !authChecked || !user) return;
    socketService.connectAdmin(tokens.access_token);
    return () => {
      socketService.disconnectAdmin();
    };
  }, [tokens?.access_token, authChecked, user]);

  if (!tokens?.access_token || !authChecked) {
    return null;
  }

  return <Outlet />;
};
