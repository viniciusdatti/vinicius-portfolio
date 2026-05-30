// Core
import { ReactNode } from 'react';

// Types
import { TestableProps } from '../../../types/testable';

export interface DrawerProps extends TestableProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}
