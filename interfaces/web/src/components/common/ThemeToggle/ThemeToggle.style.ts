// Libraries
import { motion } from 'framer-motion';
import styled from 'styled-components';

/* ************** THEME TOGGLE BUTTON ******************* */

export const ToggleButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast},
              border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.borderLight};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
