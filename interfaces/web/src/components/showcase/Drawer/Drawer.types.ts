// Core
import type { ReactNode } from 'react';

// Types
import type { TestableProps } from '../../../types/testable';

export interface DrawerProps extends TestableProps {
  /** Whether the drawer is open */
  open: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Title in the drawer header */
  title: string;
  /** Drawer body content */
  children: ReactNode;
}
