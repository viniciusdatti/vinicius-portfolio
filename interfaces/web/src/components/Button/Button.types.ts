export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  as?: React.ElementType;
  to?: string;
}
