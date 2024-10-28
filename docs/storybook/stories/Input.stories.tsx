import { Input } from '@hcc/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: '@hcc/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: {
        type: 'inline-radio',
        options: ['text', 'email', 'password'],
      },
      placeholder: 'text',
      disabled: { control: 'boolean' },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'text',
    placeholder: '뭐든 입력해보세요~',
    disabled: false,
  },
};
