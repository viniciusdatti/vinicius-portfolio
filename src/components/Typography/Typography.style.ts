// Libraries
import styled from 'styled-components';

export const H1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
  margin: 0;
  letter-spacing: -0.02em;
`;

export const H2 = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
  margin: 0;
  letter-spacing: -0.01em;
`;

export const Text = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin: 0;
`;
