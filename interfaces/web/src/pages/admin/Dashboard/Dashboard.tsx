/**
 * @fileoverview Admin Dashboard component.
 * Main dashboard page for the admin panel with statistics and quick actions.
 */

// Core
import React from 'react';

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
} from './Dashboard.style';

/**
 * Admin Dashboard component.
 * Displays statistics overview and quick action links for admin users.
 *
 * @returns {React.ReactElement} The rendered Dashboard component
 */
export const Dashboard: React.FC = (): React.ReactElement => {
  const { user, logout } = useAuthStore();

  /**
   * Handles user logout action.
   * Clears auth state and redirects to login page.
   */
  const handleLogout = (): void => {
    logout();
    window.location.href = '/admin/login';
  };

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
      </Content>
    </PageContainer>
  );
};
