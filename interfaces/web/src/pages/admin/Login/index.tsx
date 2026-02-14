// Core
import React, { useState } from 'react';

// Libraries
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

// Store
import { useAuthStore } from '../../../store';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const LoginCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  width: 100%;
  max-width: 400px;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize.xxl};
    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

const SubmitButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.md};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.7;
  }
`;

const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.error}20;
  color: ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;
`;

interface LoginForm {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError('');

    try {
      const apiBase =
        process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

      // Call login API
      const response = await fetch(`${apiBase}/auth/login/json`, {
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
      const userResponse = await fetch(`${apiBase}/auth/me`, {
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
    } catch (err) {
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

export default AdminLogin;
