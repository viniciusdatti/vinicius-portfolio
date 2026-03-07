/**
 * Types for Drawer component (side panel).
 */

// Core
import type { ReactNode } from 'react';

export interface DrawerProps {
  /** Whether the drawer is open */
  open: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Title in the drawer header */
  title: string;
  /** Drawer body content */
  children: ReactNode;
}
