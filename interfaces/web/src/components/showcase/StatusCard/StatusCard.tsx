/**
 * StatusCard component (HighlightCard-style).
 * Displays title, value, optional unit, and a status dot with theme-driven colors.
 */

// Core
import React from 'react';

// Component
import type { StatusCardProps } from './StatusCard.types';
import {
  StyledStatusCard,
  StatusCardTitle,
  StatusCardValue,
  StatusCardUnit,
} from './StatusCard.style';

export const StatusCard = ({
  title,
  value,
  unit,
  status,
}: StatusCardProps): React.ReactElement => (
  <StyledStatusCard $status={status}>
    <StatusCardTitle>{title}</StatusCardTitle>
    <StatusCardValue>
      {value}
      {unit != null && <StatusCardUnit>{unit}</StatusCardUnit>}
    </StatusCardValue>
  </StyledStatusCard>
);
