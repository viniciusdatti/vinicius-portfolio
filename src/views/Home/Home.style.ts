// Libraries
import styled from 'styled-components';

export const ProjectsSection = styled.section`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography?.fontSize?.xl ?? '1.5rem'};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  font-weight: ${({ theme }) => theme.typography?.fontWeight?.bold ?? 700};
`;
