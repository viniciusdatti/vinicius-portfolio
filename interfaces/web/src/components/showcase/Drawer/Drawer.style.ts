/**
 * Styled components for Drawer (side panel overlay).
 */

// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Components
import { drawerPanelChrome } from '@/styles/surfaces';

export const DrawerOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.overlay};
  z-index: ${({ theme }) => theme.zIndex.modal};
  pointer-events: none;

  &[data-open='true'] {
    pointer-events: auto;
  };
`;

export const DrawerPanel = styled(motion.aside)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(400px, 100vw);
  background-color: ${({ theme }) => theme.colors.surface};
  ${drawerPanelChrome};
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
  display: flex;
  flex-direction: column;
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const DrawerTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin: 0;
`;

export const DrawerCloseButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.text};
  };
`;

export const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;
