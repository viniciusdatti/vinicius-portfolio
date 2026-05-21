// Libraries
import styled from 'styled-components';

export const LoadingRoot = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`;

export const LoadingText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;
