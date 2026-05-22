// Libraries
import styled from 'styled-components';

export const ToggleWrapper = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

export const LangButton = styled.button<{ $active?: boolean }>`
  padding: 0.35rem 0.75rem;
  font-size: 0.875rem;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.textSecondary)};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primarySurface : 'transparent'};
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.primaryBorderFaint : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.primary};
  };
`;
