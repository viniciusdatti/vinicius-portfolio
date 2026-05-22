// Libraries
import styled from 'styled-components';

// Components
import { glassSurface, livingSurface, pointerSpotlight } from '@/styles/surfaces';

export const StyledCard = styled.div`
  ${livingSurface};
  ${glassSurface};
  ${pointerSpotlight};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  transition:
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.elevation.lg};
    --spot-opacity: 1;
  }
`;
