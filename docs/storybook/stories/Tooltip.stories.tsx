import { Tooltip } from '@hcc/ui';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: '@hcc/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    content: { control: 'text', description: '툴팁에 표시할 내용' },
    position: {
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'select' },
      description: '툴팁의 위치',
    },
    isVisible: { control: 'boolean', description: '툴팁이 보이는지 여부' },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    isVisible: false,
    content: '당신의 팀을 응원하는 톡을 남겨보세요!',
    position: 'top',
  },
  render: args => {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Tooltip {...args}>
          <p>Tooltip</p>
        </Tooltip>
      </div>
    );
  },
};
