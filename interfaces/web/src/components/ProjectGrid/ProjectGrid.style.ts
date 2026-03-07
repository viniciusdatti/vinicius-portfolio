// Libraries
import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

export const ProjectLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing?.sm ?? '0.5rem'};
  margin-top: 1rem;
`;

export const ProjectLink = styled.a`
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: ${({ theme }) => theme.typography?.fontSize?.sm ?? '0.875rem'};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius?.md ?? '8px'};
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-1px);
  };
`;

export const ProjectDescription = styled.div`
  margin-top: 0.5rem;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

export const Tag = styled.span`
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  background: rgba(0, 112, 243, 0.15);
  border-radius: 6px;
`;

export const EmptyMessage = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  color: ${({ theme }) => theme.colors?.textMuted ?? theme.colors?.text};
  font-size: ${({ theme }) => theme.typography?.fontSize?.md ?? '1rem'};
  padding: 2rem;
`;
