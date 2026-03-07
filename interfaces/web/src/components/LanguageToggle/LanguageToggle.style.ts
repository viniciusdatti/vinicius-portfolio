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
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.textMuted};
  background: ${({ theme, $active }) =>
    $active ? 'rgba(0, 112, 243, 0.2)' : 'transparent'};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius?.sm ?? '4px'};
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.primary};
  };
`;
