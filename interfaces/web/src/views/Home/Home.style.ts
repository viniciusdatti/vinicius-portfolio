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

export const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors.textMuted};

  p {
    font-size: ${({ theme }) => theme.typography?.fontSize?.md ?? '1rem'};
    margin-bottom: 1rem;
  }
`;

export const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: ${({ theme }) => theme.typography?.fontSize?.sm ?? '0.875rem'};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius?.md ?? '8px'};
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
  }
`;
