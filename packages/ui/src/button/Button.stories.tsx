import type { Meta } from '@storybook/react-vite';

import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
} satisfies Meta<typeof Button>;

export const Default: Meta<typeof Button> = {
  render: (args) => <Button {...args}>Button</Button>,
};
