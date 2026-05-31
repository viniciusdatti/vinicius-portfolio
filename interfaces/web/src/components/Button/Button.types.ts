// Core
import {
  FC,
  ReactElement,
  ReactNode,
} from 'react';

// Types
import { TestableProps } from '../../types/testable';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, TestableProps {
  variant?: ButtonVariant;
  children: ReactNode;
  as?: React.ElementType;
  to?: string;
  replace?: boolean;
  state?: unknown;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
}

export type ButtonComponent = FC<ButtonProps>;

export type ButtonRenderFn = (props: ButtonProps) => ReactElement;
