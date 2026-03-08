/**
 * @fileoverview Admin Dashboard component.
 * Main dashboard page for the admin panel with statistics and quick actions.
 */

// Core
import React, { useState, useCallback } from 'react';

// Store
import { useAuthStore } from '../../../store';

// Styles
import { staggerContainer, staggerItem } from '../../../styles/animations';
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
} from './Dashboard.style';

/**
 * Admin Dashboard component.
 * Displays statistics overview and quick action links for admin users.
 *
 * @returns {React.ReactElement} The rendered Dashboard component
 */
const API_BASE: string =
  process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

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

export const Dashboard: React.FC = (): React.ReactElement => {
  const { user, tokens, logout } = useAuthStore();
  const [passwordForm, setPasswordForm] = useState<ChangePasswordState>(
    initialChangePasswordState
  );
  const [passwordMessage, setPasswordMessage] = useState<{
    text: string;
    error: boolean;
  } | null>(null);
  const [passwordSubmitting, setPasswordSubmitting] =
    useState<boolean>(false);

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
        setPasswordMessage({ text: 'As senhas não conferem.', error: true });
        return;
      }
      if (passwordForm.newPassword.length < 8) {
        setPasswordMessage({
          text: 'A nova senha deve ter no mínimo 8 caracteres.',
          error: true,
        });
        return;
      }
      const token: string | undefined = tokens?.access_token;
      if (!token) {
        setPasswordMessage({ text: 'Sessão inválida. Faça login novamente.', error: true });
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
          const detail: string =
            typeof data?.detail === 'string'
              ? data.detail
              : 'Erro ao alterar senha.';
          setPasswordMessage({ text: detail, error: true });
          return;
        }
        setPasswordMessage({
          text: 'Senha alterada com sucesso.',
          error: false,
        });
        setPasswordForm(initialChangePasswordState);
      } catch {
        setPasswordMessage({
          text: 'Erro de conexão. Tente novamente.',
          error: true,
        });
      } finally {
        setPasswordSubmitting(false);
      }
    },
    [passwordForm, tokens?.access_token]
  );

  return (
    <PageContainer>
      <Header>
        <Logo to="/admin">
          Admin<span>.</span>
        </Logo>
        <UserInfo>
          <UserName>{user?.name || 'Admin'}</UserName>
          <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
        </UserInfo>
      </Header>

      <Content>
        <Title>Dashboard</Title>

        <StatsGrid
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <StatCard variants={staggerItem}>
            <StatValue>0</StatValue>
            <StatLabel>Chats Ativos</StatLabel>
          </StatCard>
          <StatCard variants={staggerItem}>
            <StatValue>0</StatValue>
            <StatLabel>Mensagens Hoje</StatLabel>
          </StatCard>
          <StatCard variants={staggerItem}>
            <StatValue>0</StatValue>
            <StatLabel>Contatos Pendentes</StatLabel>
          </StatCard>
          <StatCard variants={staggerItem}>
            <StatValue>14</StatValue>
            <StatLabel>Skills Cadastradas</StatLabel>
          </StatCard>
        </StatsGrid>

        <SectionTitle>Ações Rápidas</SectionTitle>
        <QuickActions>
          <ActionCard to="/admin/chat">
            <span>💬</span>
            <h3>Chat</h3>
            <p>Gerenciar conversas</p>
          </ActionCard>
          <ActionCard to="/">
            <span>🌐</span>
            <h3>Ver Site</h3>
            <p>Abrir portfólio</p>
          </ActionCard>
        </QuickActions>

        <SecuritySection variants={staggerItem}>
          <SecurityTitle>Alterar senha</SecurityTitle>
          <PasswordForm onSubmit={handleChangePassword}>
            <FormGroup>
              <FormLabel htmlFor="current-password">Senha atual</FormLabel>
              <FormInput
                id="current-password"
                type="password"
                autoComplete="current-password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="new-password">Nova senha (mín. 8 caracteres)</FormLabel>
              <FormInput
                id="new-password"
                type="password"
                autoComplete="new-password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="confirm-password">Confirmar nova senha</FormLabel>
              <FormInput
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                required
              />
            </FormGroup>
            {passwordMessage && (
              <FormMessage $error={passwordMessage.error}>
                {passwordMessage.text}
              </FormMessage>
            )}
            <SubmitButton type="submit" disabled={passwordSubmitting}>
              {passwordSubmitting ? 'Alterando...' : 'Alterar senha'}
            </SubmitButton>
          </PasswordForm>
        </SecuritySection>
      </Content>
    </PageContainer>
  );
};
