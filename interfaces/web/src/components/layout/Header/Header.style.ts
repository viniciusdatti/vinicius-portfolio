// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Components
import { glassSurface } from '../../../styles/surfaces';

const MotionLink = motion.create(Link);

export const HeaderContainer = styled(motion.header)<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky + 1};
  padding: ${({ theme }) => theme.spacing.md}
    ${({ theme }) => theme.spacing.pageX};
  background-color: transparent;
  transition: padding ${({ theme }) => theme.transitions.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.lg};
  };
`;

export const HeaderShell = styled.div<{ $scrolled: boolean }>`
  max-width: ${({ theme }) => theme.layout.contentWide};
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid
    ${({ $scrolled, theme }) => ($scrolled ? theme.colors.border : 'transparent')};
  background: ${({ $scrolled, theme }) => ($scrolled ? theme.colors.surfaceGlass : 'transparent')};
  backdrop-filter: ${({ $scrolled, theme }) => ($scrolled ? theme.effects.backdrop.header : 'none')};
  -webkit-backdrop-filter: ${({ $scrolled, theme }) => ($scrolled ? theme.effects.backdrop.header : 'none')};
  box-shadow: ${({ $scrolled, theme }) => ($scrolled ? theme.shadows.md : 'none')};
  transition:
    background ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal},
    backdrop-filter ${({ theme }) => theme.transitions.normal};
  min-width: 0;
  overflow: hidden;
`;

export const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 0;
`;

export const HeaderCenter = styled.div<{ $isWorkspace?: boolean }>`
  flex: 0 1 auto;
  display: ${({ $isWorkspace }) => ($isWorkspace ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  };
`;

export const HeaderTrailing = styled.div<{ $isWorkspace?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: ${({ $isWorkspace }) => ($isWorkspace ? '0' : '1')};
  flex: ${({ $isWorkspace }) => ($isWorkspace ? '1' : '0 1 auto')};
  justify-content: ${({ $isWorkspace }) => ($isWorkspace ? 'flex-end' : 'flex-start')};
  min-width: 0;
  overflow: hidden;
`;

export const Logo = styled(MotionLink)`
  display: inline-flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
`;

export const LogoMark = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const LogoSuffix = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  min-width: 0;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  };
`;

export const NavLink = styled(MotionLink)<{ $active?: boolean }>`
  position: relative;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.textMuted)};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    letter-spacing ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: 0.1em;
  };

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${({ $active }) => ($active ? '100%' : '0')};
    height: 2px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background: ${({ theme }) => theme.colors.gradientNavUnderline};
    transition: width 380ms ${({ theme }) => theme.motion.easeSpring};
  };

  &:hover::after {
    width: 100%;
  };
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0;
`;

export const HamburgerButton = styled(motion.button)`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ theme }) => theme.sizes.icon.md};
  height: ${({ theme }) => theme.sizes.icon.md};
  background: ${({ theme }) => theme.colors.surfaceGlass};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  padding: 0;
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
  ${glassSurface};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  };
`;

export const HamburgerLine = styled(motion.span)`
  display: block;
  width: ${({ theme }) => theme.sizes.hamburger.lineWidth};
  height: ${({ theme }) => theme.sizes.hamburger.lineHeight};
  background-color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.sizes.hamburger.lineGap} 0;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;
