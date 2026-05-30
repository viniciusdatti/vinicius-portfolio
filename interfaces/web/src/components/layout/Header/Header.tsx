// Core
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';

// Libraries
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Hooks
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

// Layout
import { MobileMenu } from '../MobileMenu';

// Components
import { LanguageToggle } from '../../LanguageToggle';

// Styles
import {
  hamburgerTop,
  hamburgerMiddle,
  hamburgerBottom,
  motionEase,
} from '../../../styles/animations';
import { motionPresets } from '../../../styles/motionPresets';
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
  NavLink as HeaderNavLink,
  HeaderActions,
  HamburgerButton,
  HamburgerLine,
} from './Header.style';

// Common
import { ThemeToggle } from '../../common/ThemeToggle';

// Lib
import { prefetchRouteModule } from '../../../lib/routing';

// Utils
import {
  BodyScrollLockClass,
  lockBodyScroll,
} from '../../../utils/bodyScrollLock';

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

export const Header: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const location = useLocation();
  const [state, setState] = useState<HeaderState>(initialState);
  const scrollUnlockRef = useRef<(() => void) | null>(null);
  const reducedMotion: boolean = usePrefersReducedMotion();
  const isLiveLab: boolean = location.pathname === '/live-lab';

  const closeMobileMenu = useCallback((): void => {
    scrollUnlockRef.current?.();
    scrollUnlockRef.current = null;
    setState((prev: HeaderState) => ({ ...prev, mobileMenuOpen: false }));
  }, []);

  const openMobileMenu = useCallback((): void => {
    scrollUnlockRef.current = lockBodyScroll(BodyScrollLockClass.Menu);
    setState((prev: HeaderState) => ({ ...prev, mobileMenuOpen: true }));
  }, []);

  const toggleMobileMenu = useCallback((): void => {
    if (state.mobileMenuOpen) {
      closeMobileMenu();
      return;
    }
    openMobileMenu();
  }, [state.mobileMenuOpen, closeMobileMenu, openMobileMenu]);

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
    scrollUnlockRef.current?.();
    scrollUnlockRef.current = null;
    setState((prev: HeaderState) => ({ ...prev, mobileMenuOpen: false }));
  }, [location.pathname]);

  useEffect(() => (): void => {
    scrollUnlockRef.current?.();
    scrollUnlockRef.current = null;
  }, []);

  const handleNavLinkPrefetch = useCallback((path: string): void => {
    prefetchRouteModule(path);
  }, []);

  return (
    <>
      <HeaderContainer
        $scrolled={state.scrolled}
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: motionPresets.duration.fast,
          ease: motionEase,
        }}
      >
        <HeaderShell $scrolled={state.scrolled} $isWorkspace={isLiveLab}>
          <HeaderContent $isWorkspace={isLiveLab}>
            <Logo
              to="/"
              whileTap={{ scale: 0.98 }}
              aria-label={t('header.logoAria')}
            >
              <LogoMark>{t('system.logoMark')}</LogoMark>
              <LogoSuffix>{t('system.logoSuffix')}</LogoSuffix>
            </Logo>

            <HeaderCenter $compact={isLiveLab}>
              <Nav $compact={isLiveLab}>
                {navItems.map((item) => (
                  <HeaderNavLink
                    key={item.path}
                    to={item.path}
                    $active={location.pathname === item.path}
                    $compact={isLiveLab}
                    onMouseEnter={() => handleNavLinkPrefetch(item.path)}
                    onFocus={() => handleNavLinkPrefetch(item.path)}
                  >
                    {t(item.labelKey)}
                  </HeaderNavLink>
                ))}
              </Nav>
            </HeaderCenter>

            <HeaderTrailing $isWorkspace={isLiveLab}>
              <HeaderActions>
                <LanguageToggle />
                <ThemeToggle />
                <HamburgerButton
                  onClick={toggleMobileMenu}
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

      <MobileMenu
        isOpen={state.mobileMenuOpen}
        navItems={navItems}
        currentPath={location.pathname}
        onClose={closeMobileMenu}
      />
    </>
  );
};
