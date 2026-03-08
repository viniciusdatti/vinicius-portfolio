/**
 * @fileoverview Admin layout that connects the admin chat socket when the user
 * is in the admin area (Dashboard or Chat). This makes the admin appear "Online"
 * to visitors in the Live Lab as soon as they open the panel, not only when
 * they open the Chat page.
 */

// Core
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// Store
import { useAuthStore } from '../../store';

// Utils
import { socketService } from '../../utils/socket';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const { tokens } = useAuthStore();

  useEffect(() => {
    if (!tokens?.access_token) {
      navigate('/admin/login', { replace: true });
      return;
    }

    socketService.connectAdmin(tokens.access_token);

    return () => {
      socketService.disconnectAdmin();
    };
  }, [tokens?.access_token, navigate]);

  if (!tokens?.access_token) {
    return null;
  }

  return <Outlet />;
};
