import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from './checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => {
    return <Checkbox {...args} label="레이블" />;
  },
};
