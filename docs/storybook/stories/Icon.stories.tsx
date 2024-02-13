import * as icons from '@hcc/icons';
import { Icon } from '@hcc/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: '@hcc/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  args: {
    source: icons.HccIcon,
    size: 'xl',
    color: 'primary',
  },
  argTypes: {
    source: {
      control: 'inline-radio',
      options: Object.keys(icons),
      mapping: { ...icons },
    },
    size: {
      control: 'inline-radio',
      options: ['xl', 'lg', 'md', 'sm', 'xs', 'xxs'],
    },
    color: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'gray', 'error', 'success'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
