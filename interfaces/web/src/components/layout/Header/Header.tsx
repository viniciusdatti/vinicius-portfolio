// Core
import React, { useState, useEffect } from 'react';

// Libraries
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';

// Components
import {
  hamburgerTop,
  hamburgerMiddle,
  hamburgerBottom,
  motionEase,
} from '@/styles/animations';
import { motionPresets } from '@/styles/motionPresets';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { HeaderStatusPills } from '@/components/layout/Header/HeaderStatusPills';
import {
  HeaderContainer,
  HeaderShell,
  HeaderContent,
  HeaderCenter,
  HeaderTrailing,
  Logo,
  LogoMark,
  LogoSuffix,
  Nav,
  NavLink,
  HeaderActions,
  HamburgerButton,
  HamburgerLine,
} from '@/components/layout/Header/Header.style';

interface NavItem {
  path: string;
  labelKey: string;
}

const navItems: NavItem[] = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/projects', labelKey: 'nav.projects' },
  { path: '/skills', labelKey: 'nav.skills' },
  { path: '/live-lab', labelKey: 'nav.liveLab' },
  { path: '/contact', labelKey: 'nav.contact' },
];

interface HeaderState {
  scrolled: boolean;
  mobileMenuOpen: boolean;
}

const initialState: HeaderState = {
  scrolled: false,
  mobileMenuOpen: false,
};

export function Header(): React.ReactElement {
  const { t } = useTranslation();
  const location = useLocation();
  const [state, setState] = useState<HeaderState>(initialState);
  const isLiveLab: boolean = location.pathname === '/live-lab';

  useEffect(() => {
    const handleScroll = (): void => {
      setState((prev: HeaderState) => ({
        ...prev,
        scrolled: window.scrollY > 50,
      }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setState((prev: HeaderState) => ({ ...prev, mobileMenuOpen: false }));
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open (class in GlobalStyles)
  useEffect(() => {
    document.body.classList.toggle('menu-scroll-locked', state.mobileMenuOpen);
    return () => {
      document.body.classList.remove('menu-scroll-locked');
    };
  }, [state.mobileMenuOpen]);

  return (
    <>
      <HeaderContainer
        $scrolled={state.scrolled}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: motionPresets.duration.page,
          ease: motionEase,
        }}
      >
        <HeaderShell $scrolled={state.scrolled}>
          <HeaderContent>
            <Logo
              to="/"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={t('header.logoAria')}
            >
              <LogoMark>{t('system.logoMark')}</LogoMark>
              <LogoSuffix>{t('system.logoSuffix')}</LogoSuffix>
            </Logo>

            <HeaderCenter $isWorkspace={isLiveLab}>
              <Nav>
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    $active={location.pathname === item.path}
                  >
                    {t(item.labelKey)}
                  </NavLink>
                ))}
              </Nav>
            </HeaderCenter>

            <HeaderTrailing $isWorkspace={isLiveLab}>
              <HeaderStatusPills />
              <HeaderActions>
                <LanguageToggle />
                <ThemeToggle />
                <HamburgerButton
                  onClick={() => setState((prev: HeaderState) => ({
                    ...prev,
                    mobileMenuOpen: !prev.mobileMenuOpen,
                  }))}
                  aria-label={
                    state.mobileMenuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')
                  }
                  aria-expanded={state.mobileMenuOpen}
                >
                  <HamburgerLine
                    variants={hamburgerTop}
                    animate={state.mobileMenuOpen ? 'open' : 'closed'}
                  />
                  <HamburgerLine
                    variants={hamburgerMiddle}
                    animate={state.mobileMenuOpen ? 'open' : 'closed'}
                  />
                  <HamburgerLine
                    variants={hamburgerBottom}
                    animate={state.mobileMenuOpen ? 'open' : 'closed'}
                  />
                </HamburgerButton>
              </HeaderActions>
            </HeaderTrailing>
          </HeaderContent>
        </HeaderShell>
      </HeaderContainer>

      <AnimatePresence>
        {state.mobileMenuOpen && (
          <MobileMenu
            navItems={navItems}
            currentPath={location.pathname}
            onClose={() => setState((prev: HeaderState) => ({ ...prev, mobileMenuOpen: false }))}
          />
        )}
      </AnimatePresence>
    </>
  );
}
