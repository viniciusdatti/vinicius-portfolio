/**
 * StatusCard component (HighlightCard-style).
 * Displays title, value, optional unit, and a status dot with theme-driven colors.
 */

// Core
import React from 'react';

// Types
import type { StatusCardProps } from './StatusCard.types';

// Components
import {
  StyledStatusCard,
  StatusCardTitle,
  StatusCardValue,
  StatusCardUnit,
} from './StatusCard.style';

export const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  unit,
  status,
}) => {
  return (
    <StyledStatusCard $status={status}>
      <StatusCardTitle>{title}</StatusCardTitle>
      <StatusCardValue>
        {value}
        {unit != null && <StatusCardUnit>{unit}</StatusCardUnit>}
      </StatusCardValue>
    </StyledStatusCard>
  );
};
