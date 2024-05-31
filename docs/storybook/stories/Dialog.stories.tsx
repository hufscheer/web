import { Dialog, DialogTrigger, DialogContent } from '@hcc/ui';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: '@hcc/Dialog',
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render: () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button>click</button>
        </DialogTrigger>
        <DialogContent>
          <div>
            <h2 style={{ marginTop: 0 }}>모달 제목</h2>
            <p>
              모달 내용이 여기에 표시됩니다.모달 내용이 여기에 표시됩니다.모달
              내용이 여기에 표시됩니다.모달 내용이 여기에 표시됩니다.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
};
