// Libraries
import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
`;

export const ErrorTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography?.fontSize?.xl ?? '1.5rem'};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

export const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.typography?.fontSize?.md ?? '1rem'};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1.5rem;
  max-width: 400px;
`;
