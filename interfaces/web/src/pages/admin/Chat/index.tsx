// Core
import React from 'react';

// Libraries
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
`;

const Content = styled.main`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: calc(100vh - 73px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  overflow-y: auto;
`;

const SessionList = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
`;

const NoChatSelected = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const AdminChat: React.FC = () => {
  return (
    <PageContainer>
      <Header>
        <BackLink to="/admin">
          ← Voltar
        </BackLink>
        <Title>Chat Admin</Title>
        <div />
      </Header>

      <Content>
        <Sidebar>
          <SessionList>
            <EmptyState>
              <p>Nenhuma conversa ativa</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                As conversas aparecerão aqui quando visitantes iniciarem um chat.
              </p>
            </EmptyState>
          </SessionList>
        </Sidebar>

        <ChatArea>
          <NoChatSelected>
            Selecione uma conversa para começar
          </NoChatSelected>
        </ChatArea>
      </Content>
    </PageContainer>
  );
};

export default AdminChat;
