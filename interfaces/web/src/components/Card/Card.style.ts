// Libraries
import styled from 'styled-components';

// Components
import { elevatedSurface, interactiveLift } from '../../styles/surfaces';

export const StyledCard = styled.div`
  ${elevatedSurface};
  ${interactiveLift};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;
