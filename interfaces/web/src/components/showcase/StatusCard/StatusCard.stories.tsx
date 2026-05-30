// Libraries
import { Meta, StoryObj } from '@storybook/react';

// Types
import { HighlightCardStatus } from '../../../types';
import { StatusCardProps } from './StatusCard.types';

// StatusCard
import { StatusCard } from './StatusCard';

const meta: Meta<StatusCardProps> = {
  title: 'Components/StatusCard',
  component: StatusCard,
  args: {
    title: 'Spin rate',
    value: '1450',
    unit: 'rpm',
    status: HighlightCardStatus.Success,
  },
};

export default meta;

type Story = StoryObj<StatusCardProps>;

export const Success: Story = {};

export const Error: Story = {
  args: {
    status: HighlightCardStatus.Error,
    value: '1620',
  },
};

export const Neutral: Story = {
  args: {
    status: HighlightCardStatus.Neutral,
    value: '—',
    unit: undefined,
  },
};
