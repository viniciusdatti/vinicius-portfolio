/**
 * @fileoverview Mobile navigation drawer — full-height panel, touch targets, safe areas.
 */

// Libraries
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

// Types
import type { MenuLinkStyleProps } from '@/components/layout/MobileMenu/MobileMenu.types';

// Components
import { drawerPanelChrome } from '@/styles/surfaces';

/* *************************************************************************************************
 ********************************************* STYLES **********************************************
 ************************************************************************************************ */

export const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.overlay};
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

export const MenuContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  right: 0;
  width: min(360px, 100vw);
  height: 100dvh;
  min-height: 100vh;
  max-height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceElevated};
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.menu};
  -webkit-backdrop-filter: ${({ theme }) => theme.effects.backdrop.menu};
  box-shadow: ${({ theme }) => theme.elevation.lg};
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
  ${drawerPanelChrome};
`;

export const MenuHeader = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  min-height: ${({ theme }) => theme.sizes.layout.headerOffset};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  padding-top: max(
    ${({ theme }) => theme.spacing.md},
    env(safe-area-inset-top, 0px)
  );
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

export const MenuHeaderLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const MenuCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surfaceGlass};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition:
    background-color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.borderLight};
  };

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  };
`;

export const MenuNav = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const menuLinkActiveStyles = css`
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.accentMuted};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  &::before {
    opacity: 1;
  };
`;

export const MenuLink = styled(motion.a)<MenuLinkStyleProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 48px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};
  transition-delay: ${({ $delay }) => ($delay !== undefined ? `${$delay}s` : '0s')};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: ${({ theme }) => theme.spacing.sm};
    bottom: ${({ theme }) => theme.spacing.sm};
    width: 3px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background: ${({ theme }) => theme.colors.gradientNavUnderline};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.fast};
  };

  ${({ $active }) => $active && menuLinkActiveStyles}

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      background-color: ${({ theme }) => theme.colors.surfaceHover};
    };
  };

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  };
`;

export const MenuFooter = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  padding-bottom: max(
    ${({ theme }) => theme.spacing.lg},
    env(safe-area-inset-bottom, 0px)
  );
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
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

  svg {
    width: 20px;
    height: 20px;
  };
`;
