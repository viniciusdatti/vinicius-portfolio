/**
 * @fileoverview Admin Dashboard component.
 * Main dashboard page for the admin panel with statistics and quick actions.
 */

// Core
import React, { useState, useCallback } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { env } from '@/config/env';

// Store
import { useAdminChatStore } from '@/store/adminChatStore';
import { useAuthStore } from '@/store';

// =================================================================================================
// ============================================ STYLES =============================================
// =================================================================================================
import { staggerContainer, staggerItem } from '@/styles/animations';
import {
  PageContainer,
  Header,
  Logo,
  UserInfo,
  UserName,
  LogoutButton,
  Content,
  Title,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  QuickActions,
  ActionCard,
  SectionTitle,
  SecuritySection,
  SecurityTitle,
  PasswordForm,
  FormGroup,
  FormLabel,
  FormInput,
  SubmitButton,
  FormMessage,
} from '@/pages/Admin/Dashboard/Dashboard.style';

/**
 * Admin Dashboard component.
 * Displays statistics overview and quick action links for admin users.
 *
 * @returns {React.ReactElement} The rendered Dashboard component
 */
const API_BASE: string = env.apiUrl;

interface ChangePasswordState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialChangePasswordState: ChangePasswordState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const Dashboard = (): React.ReactElement => {
  const { t } = useTranslation();
  const { user, tokens, logout } = useAuthStore();
  const chatSessions = useAdminChatStore((s) => s.sessions);
  const chatUnreadTotal: number = chatSessions.reduce(
    (sum, session) => sum + session.unread_count,
    0,
  );
  const [passwordForm, setPasswordForm] = useState<ChangePasswordState>(
    initialChangePasswordState,
  );
  const [passwordMessage, setPasswordMessage] = useState<{
    text: string;
    error: boolean;
  } | null>(null);
  const [passwordSubmitting, setPasswordSubmitting] = useState<boolean>(false);

  /**
   * Handles user logout action.
   * Clears auth state and redirects to login page.
   */
  const handleLogout = (): void => {
    logout();
    window.location.href = '/admin/login';
  };

  /**
   * Handles change password form submit.
   * Calls API and shows success or error message.
   */
  const handleChangePassword = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      setPasswordMessage(null);
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        setPasswordMessage({
          text: t('admin.dashboard.errors.mismatch'),
          error: true,
        });
        return;
      }
      if (passwordForm.newPassword.length < 8) {
        setPasswordMessage({
          text: t('admin.dashboard.errors.minLength'),
          error: true,
        });
        return;
      }
      const token: string | undefined = tokens?.access_token;
      if (!token) {
        setPasswordMessage({
          text: t('admin.dashboard.errors.invalidSession'),
          error: true,
        });
        return;
      }
      setPasswordSubmitting(true);
      try {
        const baseUrl: string = API_BASE.replace(/\/api\/v1\/?$/, '') || '';
        const url: string = `${baseUrl}/api/v1/auth/change-password`;
        const res: Response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            current_password: passwordForm.currentPassword,
            new_password: passwordForm.newPassword,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const detail: string = typeof data?.detail === 'string'
            ? data.detail
            : t('admin.dashboard.errors.generic');
          setPasswordMessage({ text: detail, error: true });
          return;
        }
        setPasswordMessage({
          text: t('admin.dashboard.passwordSuccess'),
          error: false,
        });
        setPasswordForm(initialChangePasswordState);
      } catch {
        setPasswordMessage({
          text: t('admin.dashboard.errors.network'),
          error: true,
        });
      } finally {
        setPasswordSubmitting(false);
      }
    },
    [passwordForm, t, tokens?.access_token],
  );

  return (
    <PageContainer>
      <Header>
        <Logo to="/admin">
          Admin
          <span>.</span>
        </Logo>
        <UserInfo>
          <UserName>{user?.name || t('admin.dashboard.fallbackName')}</UserName>
          <LogoutButton onClick={handleLogout}>
            {t('admin.dashboard.logout')}
          </LogoutButton>
        </UserInfo>
      </Header>

      <Content>
        <Title>{t('admin.dashboard.title')}</Title>

        <StatsGrid
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <StatCard variants={staggerItem}>
            <StatValue>{chatSessions.length}</StatValue>
            <StatLabel>{t('admin.dashboard.stats.activeChats')}</StatLabel>
          </StatCard>
          <StatCard variants={staggerItem}>
            <StatValue>{chatUnreadTotal}</StatValue>
            <StatLabel>{t('admin.dashboard.stats.unread')}</StatLabel>
          </StatCard>
          <StatCard variants={staggerItem}>
            <StatValue>0</StatValue>
            <StatLabel>{t('admin.dashboard.stats.messagesToday')}</StatLabel>
          </StatCard>
          <StatCard variants={staggerItem}>
            <StatValue>0</StatValue>
            <StatLabel>{t('admin.dashboard.stats.pendingContacts')}</StatLabel>
          </StatCard>
          <StatCard variants={staggerItem}>
            <StatValue>14</StatValue>
            <StatLabel>{t('admin.dashboard.stats.skills')}</StatLabel>
          </StatCard>
        </StatsGrid>

        <SectionTitle>{t('admin.dashboard.quickActions')}</SectionTitle>
        <QuickActions>
          <ActionCard to="/admin/chat">
            <span>💬</span>
            <h3>{t('admin.dashboard.chatActionTitle')}</h3>
            <p>{t('admin.dashboard.chatActionDesc')}</p>
          </ActionCard>
          <ActionCard to="/">
            <span>🌐</span>
            <h3>{t('admin.dashboard.siteActionTitle')}</h3>
            <p>{t('admin.dashboard.siteActionDesc')}</p>
          </ActionCard>
        </QuickActions>

        <SecuritySection variants={staggerItem}>
          <SecurityTitle>{t('admin.dashboard.changePassword')}</SecurityTitle>
          <PasswordForm onSubmit={handleChangePassword}>
            <FormGroup>
              <FormLabel htmlFor="current-password">
                {t('admin.dashboard.currentPassword')}
              </FormLabel>
              <FormInput
                id="current-password"
                type="password"
                autoComplete="current-password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="new-password">
                {t('admin.dashboard.newPassword')}
              </FormLabel>
              <FormInput
                id="new-password"
                type="password"
                autoComplete="new-password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="confirm-password">
                {t('admin.dashboard.confirmPassword')}
              </FormLabel>
              <FormInput
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))}
                required
              />
            </FormGroup>
            {passwordMessage && (
              <FormMessage $error={passwordMessage.error}>
                {passwordMessage.text}
              </FormMessage>
            )}
            <SubmitButton type="submit" disabled={passwordSubmitting}>
              {passwordSubmitting
                ? t('admin.dashboard.submittingPassword')
                : t('admin.dashboard.submitPassword')}
            </SubmitButton>
          </PasswordForm>
        </SecuritySection>
      </Content>
    </PageContainer>
  );
};
