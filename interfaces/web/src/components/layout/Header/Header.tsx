// Core
import React, { useState, useEffect } from 'react';

// Libraries
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';

// Components
import { ThemeToggle } from '../../common/ThemeToggle';
import { LanguageToggle } from '../../LanguageToggle';
import { MobileMenu } from '../MobileMenu';
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  Nav,
  NavLink,
  HeaderActions,
  HamburgerButton,
  HamburgerLine,
} from './Header.style';

// Styles
import {
  hamburgerTop,
  hamburgerMiddle,
  hamburgerBottom,
} from '../../../styles/animations';

interface NavItem {
  path: string;
  labelKey: string;
}

const navItems: NavItem[] = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/skills', labelKey: 'nav.skills' },
  { path: '/live-lab', labelKey: 'nav.liveLab' },
  { path: '/contact', labelKey: 'nav.contact' },
];

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <HeaderContainer
        $scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <HeaderContent>
          <Logo
            to="/"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Vinicius<span>.</span>
          </Logo>

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

          <HeaderActions>
            <LanguageToggle />
            <ThemeToggle />
            <HamburgerButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <HamburgerLine
                variants={hamburgerTop}
                animate={mobileMenuOpen ? 'open' : 'closed'}
              />
              <HamburgerLine
                variants={hamburgerMiddle}
                animate={mobileMenuOpen ? 'open' : 'closed'}
              />
              <HamburgerLine
                variants={hamburgerBottom}
                animate={mobileMenuOpen ? 'open' : 'closed'}
              />
            </HamburgerButton>
          </HeaderActions>
        </HeaderContent>
      </HeaderContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            navItems={navItems}
            currentPath={location.pathname}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
