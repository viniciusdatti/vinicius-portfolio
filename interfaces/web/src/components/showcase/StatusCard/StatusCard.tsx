/**
 * StatusCard component (HighlightCard-style).
 * Displays title, value, optional unit, and a status dot with theme-driven colors.
 */

// Core
import React from 'react';

// Types
import type { StatusCardProps } from '@/components/Showcase/StatusCard/StatusCard.types';

// Components
import {
  StyledStatusCard,
  StatusCardTitle,
  StatusCardValue,
  StatusCardUnit,
} from '@/components/Showcase/StatusCard/StatusCard.style';

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
