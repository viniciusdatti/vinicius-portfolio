// Core
import React from 'react';

// Libraries
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Store
import { useAuthStore } from '../../../store';

// Styles
import { staggerContainer, staggerItem } from '../../../styles/animations';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const UserName = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LogoutButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.error}20;
  color: ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  &:hover {
    background-color: ${({ theme }) => theme.colors.error}30;
  }
`;

const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const StatCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ActionCard = styled(Link)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  text-align: center;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  span {
    font-size: 2rem;
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = '/admin/login';
  };

  return (
    <PageContainer>
      <Header>
        <Logo to="/admin">Admin<span>.</span></Logo>
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

        <h2 style={{ marginBottom: '1.5rem' }}>Ações Rápidas</h2>
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
      </Content>
    </PageContainer>
  );
};

export default AdminDashboard;
