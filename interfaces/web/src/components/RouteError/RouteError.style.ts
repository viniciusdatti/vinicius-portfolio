// Libraries
import styled from 'styled-components';

export const RouteErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const RouteErrorTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  margin: 0;
`;

export const RouteErrorText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: ${({ theme }) => theme.layout.prose};
  margin: 0;
`;
