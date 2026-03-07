/**
 * Types for Spinner component.
 */

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerContainerProps {
  $size: SpinnerSize;
}

export interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}
