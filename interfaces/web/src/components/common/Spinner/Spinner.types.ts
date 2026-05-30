// Types
import { TestableProps } from '../../../types/testable';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerContainerProps {
  $size: SpinnerSize;
}

export interface SpinnerProps extends TestableProps {
  size?: SpinnerSize;
  className?: string;
}
