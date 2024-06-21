import { Modal } from '@hcc/ui';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: '@hcc/Modal',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Modal>
        <Modal.Trigger>버튼</Modal.Trigger>

        <Modal.Content>
          <Modal.Close />
          <div>
            <h2 style={{ marginTop: 0 }}>모달 제목</h2>
            <p>
              모달 내용이 여기에 표시됩니다.모달 내용이 여기에 표시됩니다.모달
              내용이 여기에 표시됩니다.모달 내용이 여기에 표시됩니다.
            </p>
            <Modal.Close as="button">Close</Modal.Close>
          </div>
        </Modal.Content>
      </Modal>
    );
  },
};
