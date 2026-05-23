/**
 * @fileoverview Drawer overlay — viewport-fixed panel; bottom sheet on mobile.
 */

// Libraries
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

// Components
import { drawerPanelChrome } from '@/styles/surfaces';

// =================================================================================================
// ============================================= STYLES ============================================
// =================================================================================================

/** Full-viewport stacking context so fixed panel geometry stays correct. */
export const DrawerViewport = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  pointer-events: none;
`;

export const DrawerOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.overlay};
  pointer-events: auto;
`;

const drawerPanelDesktopChrome = css`
  top: 0;
  right: 0;
  bottom: 0;
  left: auto;
  width: min(420px, 100vw);
  height: 100dvh;
  min-height: 100vh;
  max-height: 100dvh;
  ${drawerPanelChrome};
`;

const drawerPanelMobileChrome = css`
  top: auto;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 100%;
  height: auto;
  min-height: min(50dvh, 100%);
  max-height: min(92dvh, 100%);
  border-left: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl}
    ${({ theme }) => theme.borderRadius.xl} 0 0;
  box-shadow: ${({ theme }) => theme.elevation.lg};
`;

export const DrawerPanel = styled(motion.aside)`
  position: fixed;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
  pointer-events: auto;
  ${drawerPanelDesktopChrome};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    ${drawerPanelMobileChrome};
  };
`;

export const DrawerHeader = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  padding-top: max(
    ${({ theme }) => theme.spacing.lg},
    env(safe-area-inset-top, 0px)
  );
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 56px;
  };
`;

export const DrawerTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
`;

export const DrawerCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surfaceGlass};
  cursor: pointer;
  transition:
    background-color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.borderLight};
  };

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  };
`;

export const DrawerBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: ${({ theme }) => theme.spacing.lg};
  padding-bottom: max(
    ${({ theme }) => theme.spacing.lg},
    env(safe-area-inset-bottom, 0px)
  );
`;
