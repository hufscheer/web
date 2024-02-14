import { Modal } from '@hcc/ui';
import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta = {
  title: '@hcc/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p>모달 내용이 여기에 표시됩니다.</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </Modal>
      </>
    );
  },
};

export const WithDisabledBackdrop: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          disableBackdropClick
        >
          <p>배경 클릭으로 모달 닫히지 않게 변경</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </Modal>
      </>
    );
  },
};

export const WithDisableEscapeKeyDown: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          disableEscapeKeyDown
        >
          <p>Escape 키로 모달 닫히지 않게 변경</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </Modal>
      </>
    );
  },
};
