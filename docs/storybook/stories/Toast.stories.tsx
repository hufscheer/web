import { Toast } from '@hcc/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: '@hcc/Toast',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <button
        onClick={() => {
          Toast.show('API 호출에 실패했습니다.');
        }}
      >
        Toast
      </button>
    );
  },
};

export const Children: Story = {
  render: () => {
    const ToastItem = () => {
      return (
        <div>
          <span>API 호출에 실패했습니다.</span>
          <button>다시 시도하기</button>
        </div>
      );
    };

    return (
      <button
        onClick={() => {
          Toast.show(<ToastItem />);
        }}
      >
        Toast
      </button>
    );
  },
};
