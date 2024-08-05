import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from '@hcc/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: '@hcc/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div>
        <BottomSheet>
          <BottomSheetTrigger>sadfsdaf</BottomSheetTrigger>
          <BottomSheetContent>
            <BottomSheetHeader>
              <BottomSheetTitle>Title</BottomSheetTitle>
              <BottomSheetDescription>
                DescriptBottomSheetDescription
              </BottomSheetDescription>
            </BottomSheetHeader>
          </BottomSheetContent>
        </BottomSheet>
      </div>
    );
  },
};
