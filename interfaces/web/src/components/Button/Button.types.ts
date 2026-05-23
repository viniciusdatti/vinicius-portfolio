import type { FC, ReactElement, ReactNode } from 'react';

import type { TestableProps } from '@/types/testable';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, TestableProps {
  variant?: ButtonVariant;
  children: ReactNode;
  as?: React.ElementType;
  to?: string;
}

export type ButtonComponent = FC<ButtonProps>;

export type ButtonRenderFn = (props: ButtonProps) => ReactElement;
