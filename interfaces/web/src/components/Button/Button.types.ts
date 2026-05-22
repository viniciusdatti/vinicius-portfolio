import type { TestableProps } from '../../types/testable';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, TestableProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  as?: React.ElementType;
  to?: string;
}
