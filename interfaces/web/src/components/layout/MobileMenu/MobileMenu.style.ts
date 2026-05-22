// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Components
import { drawerPanelChrome } from '@/styles/surfaces';

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.overlay};
  z-index: ${({ theme }) => theme.zIndex.modal - 1};
`;

export const MenuContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 320px;
  background: ${({ theme }) => theme.colors.surfaceElevated};
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.menu};
  -webkit-backdrop-filter: ${({ theme }) => theme.effects.backdrop.menu};
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.sizes.layout.headerOffset};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  ${drawerPanelChrome};
`;

export const MenuNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export interface MenuLinkProps {
  $active?: boolean;
  $delay?: number;
}

export const MenuLink = styled(motion.a)<MenuLinkProps>`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text)};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: color ${({ theme }) => theme.transitions.fast};
  transition-delay: ${({ $delay }) => ($delay !== undefined ? `${$delay}s` : '0s')};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const MenuFooter = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
