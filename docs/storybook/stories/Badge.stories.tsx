import { Badge } from '@hcc/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: '@hcc/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    colorScheme: {
      options: ['primary', 'accentPrimary', 'alert'],
      control: { type: 'radio' },
    },
  },
  args: {
    children: 'Badge',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
