import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
  DialogClose,
} from '@hcc/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: '@hcc/Dialog',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button>click</button>
        </DialogTrigger>
        <DialogContent style={{ maxWidth: 380 }}>
          <DialogHeader>
            <DialogTitle>다이얼로그 제목입니다.</DialogTitle>
            <DialogDescription>다이얼로그 설명입니다.</DialogDescription>
          </DialogHeader>
          <div>
            모달 내용이 여기에 표시됩니다.모달 내용이 여기에 표시됩니다.모달
            내용이 여기에 표시됩니다.모달 내용이 여기에 표시됩니다.
          </div>
          <DialogFooter>
            <button
              style={{
                width: '100%',
                textAlign: 'center',
                backgroundColor: '#E9EBEE',
                color: '#374553',
                padding: '8px 0',
                border: '1px solid transparent',
                borderRadius: 6,
              }}
            >
              취소
            </button>
            <button
              style={{
                width: '100%',
                textAlign: 'center',
                backgroundColor: '#ECEEFF',
                color: '#121E8A',
                padding: '8px 0',
                borderRadius: 6,
                border: '1px solid transparent',
              }}
            >
              확인
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const WithOverlay: Story = {
  render: () => {
    return (
      <Dialog>
        <DialogOverlay />
        <DialogTrigger asChild>
          <button>click</button>
        </DialogTrigger>
        <DialogContent style={{ maxWidth: 380 }}>
          <DialogHeader>
            <DialogTitle>다이얼로그 제목입니다.</DialogTitle>
            <DialogDescription>다이얼로그 설명입니다.</DialogDescription>
          </DialogHeader>
          <div>
            모달 내용이 여기에 표시됩니다.모달 내용이 여기에 표시됩니다.모달
            내용이 여기에 표시됩니다.모달 내용이 여기에 표시됩니다.
          </div>
          <DialogFooter>
            <button
              style={{
                width: '100%',
                textAlign: 'center',
                backgroundColor: '#E9EBEE',
                color: '#374553',
                padding: '8px 0',
                border: '1px solid transparent',
                borderRadius: 6,
              }}
            >
              취소
            </button>
            <button
              style={{
                width: '100%',
                textAlign: 'center',
                backgroundColor: '#ECEEFF',
                color: '#121E8A',
                padding: '8px 0',
                borderRadius: 6,
                border: '1px solid transparent',
              }}
            >
              확인
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const WithCloseButton: Story = {
  render: () => {
    return (
      <Dialog>
        <DialogOverlay />
        <DialogTrigger asChild>
          <button>click</button>
        </DialogTrigger>
        <DialogContent style={{ maxWidth: 380 }}>
          <DialogClose />
          <DialogHeader>
            <DialogTitle>다이얼로그 제목입니다.</DialogTitle>
            <DialogDescription>다이얼로그 설명입니다.</DialogDescription>
          </DialogHeader>
          <div>
            모달 내용이 여기에 표시됩니다.모달 내용이 여기에 표시됩니다.모달
            내용이 여기에 표시됩니다.모달 내용이 여기에 표시됩니다.
          </div>
          <DialogFooter>
            <button
              style={{
                width: '100%',
                textAlign: 'center',
                backgroundColor: '#E9EBEE',
                color: '#374553',
                padding: '8px 0',
                border: '1px solid transparent',
                borderRadius: 6,
              }}
            >
              취소
            </button>
            <button
              style={{
                width: '100%',
                textAlign: 'center',
                backgroundColor: '#ECEEFF',
                color: '#121E8A',
                padding: '8px 0',
                borderRadius: 6,
                border: '1px solid transparent',
              }}
            >
              확인
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};
