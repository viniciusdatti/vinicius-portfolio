// Core
import {
  FC,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';

// Types
import { TestableProps } from '../../types/testable';

export enum CardVariant {
  MarketingGlass = 'marketing-glass',
  StatSignal = 'stat-signal',
  Operational = 'operational',
  Showcase = 'showcase',
}

export interface CardProps extends HTMLAttributes<HTMLDivElement>, TestableProps {
  children: ReactNode;
  variant?: CardVariant;
  interactive?: boolean;
}

export type CardComponent = FC<CardProps>;

export type CardRenderFn = (props: CardProps) => ReactElement;
