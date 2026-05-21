/**
 * @fileoverview Admin Login — restricted area; validates role before granting access.
 */

// Core
import React, { useState } from 'react';

// Libraries
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Types
import { UserRole } from '../../../types';
import type { AdminLoginForm } from './Login.types';
import {
  initialAdminLoginViewState,
  type AdminLoginViewState,
} from './Login.types';

// Components
import { env } from '../../../config/env';
import { useAuthStore } from '../../../store';
import {
  BackToSiteLink,
  Brand,
  ErrorMessage,
  FooterNote,
  Form,
  Input,
  InputGroup,
  Label,
  LoginCard,
  Logo,
  PageContainer,
  PageShell,
  PasswordFieldWrap,
  SecurityNote,
  Subtitle,
  SubmitButton,
  TogglePasswordButton,
  TopBar,
} from './Login.style';

const API_BASE: string = env.apiUrl;

const isAdminRole = (role: string): boolean =>
  role === UserRole.Admin || role === UserRole.SuperAdmin;

/**
 * Admin login page with server-side role validation.
 */
export const Login: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setAuth, logout } = useAuthStore();

  const [viewState, setViewState] = useState<AdminLoginViewState>(
    initialAdminLoginViewState
  );

  const { register, handleSubmit } = useForm<AdminLoginForm>();

  const onSubmit = async (data: AdminLoginForm): Promise<void> => {
    setViewState((prev: AdminLoginViewState) => ({
      ...prev,
      isLoading: true,
      error: '',
    }));

    try {
      const response: Response = await fetch(`${API_BASE}/auth/login/json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email.trim(),
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error('INVALID_CREDENTIALS');
      }

      const tokens = await response.json();

      const userResponse: Response = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });

      if (!userResponse.ok) {
        throw new Error('FORBIDDEN');
      }

      const user = await userResponse.json();

      if (!isAdminRole(user.role)) {
        logout();
        throw new Error('FORBIDDEN');
      }

      setAuth(
        { id: user.id, email: user.email, name: user.name, role: user.role },
        tokens
      );

      navigate('/admin', { replace: true });
    } catch (err: unknown) {
      const errorMessage: string =
        err instanceof Error && err.message === 'FORBIDDEN'
          ? t('admin.login.errors.forbidden')
          : t('admin.login.errors.invalidCredentials');
      setViewState((prev: AdminLoginViewState) => ({
        ...prev,
        error: errorMessage,
      }));
    } finally {
      setViewState((prev: AdminLoginViewState) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  const toggleShowPassword = (): void => {
    setViewState((prev: AdminLoginViewState) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  return (
    <PageShell>
      <TopBar>
        <Brand>
          Vinicius<span>.</span>
        </Brand>
        <BackToSiteLink to="/">{t('admin.login.backToSite')}</BackToSiteLink>
      </TopBar>

      <PageContainer>
        <LoginCard
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Logo>
            <h1>
              {t('admin.login.brand')}<span>.</span>
            </h1>
            <Subtitle>{t('admin.login.subtitle')}</Subtitle>
          </Logo>

          <SecurityNote>{t('admin.login.securityNote')}</SecurityNote>

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            {viewState.error ? (
              <ErrorMessage role="alert">{viewState.error}</ErrorMessage>
            ) : null}

            <InputGroup>
              <Label htmlFor="admin-email">{t('admin.login.email')}</Label>
              <Input
                id="admin-email"
                {...register('email', { required: true })}
                type="email"
                autoComplete="username"
                placeholder={t('admin.login.emailPlaceholder')}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="admin-password">{t('admin.login.password')}</Label>
              <PasswordFieldWrap>
                <Input
                  id="admin-password"
                  {...register('password', { required: true })}
                  type={viewState.showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder={t('admin.login.passwordPlaceholder')}
                  required
                />
                <TogglePasswordButton
                  type="button"
                  onClick={toggleShowPassword}
                  aria-label={
                    viewState.showPassword
                      ? t('admin.login.hidePassword')
                      : t('admin.login.showPassword')
                  }
                >
                  {viewState.showPassword
                    ? t('admin.login.hidePassword')
                    : t('admin.login.showPassword')}
                </TogglePasswordButton>
              </PasswordFieldWrap>
            </InputGroup>

            <SubmitButton
              type="submit"
              disabled={viewState.isLoading}
              whileHover={{ scale: viewState.isLoading ? 1 : 1.02 }}
              whileTap={{ scale: viewState.isLoading ? 1 : 0.98 }}
            >
              {viewState.isLoading
                ? t('admin.login.submitting')
                : t('admin.login.submit')}
            </SubmitButton>
          </Form>

          <FooterNote>{t('admin.login.footerNote')}</FooterNote>
        </LoginCard>
      </PageContainer>
    </PageShell>
  );
};
