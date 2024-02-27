import { Dialog } from '@hcc/ui';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: '@hcc/Dialog',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Dialog>
        <Dialog.Trigger>버튼</Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Close />
          <div>
            <h2 style={{ marginTop: 0 }}>모달 제목</h2>
            <p>
              모달 내용이 여기에 표시됩니다.모달 내용이 여기에 표시됩니다.모달
              내용이 여기에 표시됩니다.모달 내용이 여기에 표시됩니다.
            </p>
            <Dialog.Close as="button">Close</Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog>
    );
  },
};
