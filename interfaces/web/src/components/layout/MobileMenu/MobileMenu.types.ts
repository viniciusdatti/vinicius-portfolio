/**
 * @fileoverview Types for the mobile navigation drawer.
 */

export interface MobileMenuNavItem {
  path: string;
  labelKey: string;
}

export interface MobileMenuProps {
  navItems: MobileMenuNavItem[];
  currentPath: string;
  onClose: () => void;
}

export interface MenuLinkStyleProps {
  $active?: boolean;
  $delay?: number;
}
