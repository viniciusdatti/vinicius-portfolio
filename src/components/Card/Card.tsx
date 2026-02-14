// Core
import React from 'react';

// Types
import type { CardProps } from './Card.types';

// Components
import { StyledCard } from './Card.style';

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};
