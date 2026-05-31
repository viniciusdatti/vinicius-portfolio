// Libraries
import { Meta, StoryObj } from '@storybook/react';

// Types
import { CardProps, CardVariant } from './Card.types';

// Card
import { Card } from './Card';

const meta: Meta<CardProps> = {
  title: 'Components/Card',
  component: Card,
  args: {
    testId: 'card-story',
    children: 'Operational surface card',
  },
};

export default meta;

type Story = StoryObj<CardProps>;

export const MarketingGlass: Story = {
  args: {
    variant: CardVariant.MarketingGlass,
  },
};

export const StatSignal: Story = {
  args: {
    variant: CardVariant.StatSignal,
  },
};

export const Operational: Story = {
  args: {
    variant: CardVariant.Operational,
  },
};

export const InteractiveShowcase: Story = {
  args: {
    variant: CardVariant.Showcase,
    interactive: true,
  },
};
