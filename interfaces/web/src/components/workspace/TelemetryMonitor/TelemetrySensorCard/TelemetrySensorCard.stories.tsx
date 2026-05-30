// Core
import React from 'react';

// Libraries
import styled from 'styled-components';
import { Meta, StoryObj } from '@storybook/react';

// Types
import {
  SensorStatus,
  TelemetryState,
} from '../../../../types/telemetry';
import { SensorProps } from '../TelemetryMonitor.types';

// TelemetrySensorCard
import { TelemetrySensorCard } from './TelemetrySensorCard';

// Workspace
import { TelemetryFixtureProvider } from '../../TelemetryProvider';

const StoryCanvas = styled.div`
  width: 320px;
`;

const mockReading = {
  id: 'spin_rate',
  label: 'Spin rate',
  unit: 'rpm',
  value: 1450.25,
  threshold_warn: 1550,
  threshold_critical: 1600,
  status: SensorStatus.Ok,
  ts: Date.now(),
};

const mockTelemetryState: TelemetryState = {
  connected: true,
  readings: [mockReading],
  history: {
    spin_rate: [1420, 1435, 1448, 1450.25],
  },
  eventLog: [],
  tickCount: 12,
};

const meta: Meta<SensorProps> = {
  title: 'Workspace/TelemetrySensorCard',
  component: TelemetrySensorCard,
  decorators: [
    (Story): React.ReactElement => (
      <TelemetryFixtureProvider value={mockTelemetryState}>
        <StoryCanvas>
          <Story />
        </StoryCanvas>
      </TelemetryFixtureProvider>
    ),
  ],
  args: {
    reading: mockReading,
    index: 0,
  },
};

export default meta;

type Story = StoryObj<SensorProps>;

export const Default: Story = {};

export const Warn: Story = {
  args: {
    reading: {
      ...mockReading,
      value: 1562.4,
      status: SensorStatus.Warn,
    },
  },
};

export const Critical: Story = {
  args: {
    reading: {
      ...mockReading,
      value: 1610.8,
      status: SensorStatus.Critical,
    },
  },
};

export const Compact: Story = {
  args: {
    compact: true,
  },
};
