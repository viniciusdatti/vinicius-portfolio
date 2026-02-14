/**
 * @fileoverview Admin Login page component.
 * Handles user authentication for the admin panel.
 */

// Core
import React, { useState } from 'react';

// Libraries
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Store
import { useAuthStore } from '../../../store';

// Styles
import {
  PageContainer,
  LoginCard,
  Logo,
  Form,
  InputGroup,
  Label,
  Input,
  SubmitButton,
  ErrorMessage,
} from './Login.style';

/**
 * Form data structure for login credentials.
 */
interface LoginForm {
  email: string;
  password: string;
}

/**
 * Admin Login page component.
 * Provides authentication form for admin panel access.
 *
 * @returns The login page with email/password form
 */
export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { register, handleSubmit } = useForm<LoginForm>();

  /**
   * Handles form submission and authentication.
   * Makes API calls to login and fetch user data.
   *
   * @param data - The login form data containing email and password
   */
  const onSubmit = async (data: LoginForm): Promise<void> => {
    setIsLoading(true);
    setError('');

    try {
      const apiBase: string =
        process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

      // Call login API
      const response: Response = await fetch(`${apiBase}/auth/login/json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Email ou senha inválidos');
      }

      const tokens = await response.json();

      // Get user info
      const userResponse: Response = await fetch(`${apiBase}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error('Erro ao obter dados do usuário');
      }

      const user = await userResponse.json();

      setAuth(
        { id: user.id, email: user.email, name: user.name, role: user.role },
        tokens
      );

      navigate('/admin');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Email ou senha inválidos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Logo>
          <h1>Vinicius<span>.</span></h1>
          <p>Admin Panel</p>
        </Logo>

        <Form onSubmit={handleSubmit(onSubmit)}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <InputGroup>
            <Label>Email</Label>
            <Input
              {...register('email')}
              type="email"
              placeholder="admin@example.com"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Senha</Label>
            <Input
              {...register('password')}
              type="password"
              placeholder="••••••••"
              required
            />
          </InputGroup>

          <SubmitButton
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </SubmitButton>
        </Form>
      </LoginCard>
    </PageContainer>
  );
};
