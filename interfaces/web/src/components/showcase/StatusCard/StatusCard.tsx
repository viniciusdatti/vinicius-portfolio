// Core
import React from 'react';

// Styles
import {
  StyledStatusCard,
  StatusCardTitle,
  StatusCardValue,
  StatusCardUnit,
} from './StatusCard.style';

// Types
import { StatusCardProps } from './StatusCard.types';

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
