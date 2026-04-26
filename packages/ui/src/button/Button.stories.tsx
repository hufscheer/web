import type { Meta } from '@storybook/react-vite';

import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: { type: 'inline-radio' },
      options: ['primary', 'danger'],
    },
    variant: {
      control: { type: 'inline-radio' },
      options: ['solid', 'subtle', 'ghost'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Button>;

export const Default: Meta<typeof Button> = {
  render: (args) => <Button {...args}>Button</Button>,
};
