import React from 'react';
import { StyledCard } from './Card.style';
import type { CardProps } from './Card.types';

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};
