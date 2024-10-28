import { Button } from '@hcc/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: '@hcc/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    colorScheme: {
      options: ['primary', 'secondary', 'outline'],
      control: { type: 'radio' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
