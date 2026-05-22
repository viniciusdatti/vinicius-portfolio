// Core
import type { HTMLAttributes, ReactNode } from 'react';

// Types
import type { TestableProps } from '../../types/testable';

export interface CardProps extends HTMLAttributes<HTMLDivElement>, TestableProps {
  children: ReactNode;
}
