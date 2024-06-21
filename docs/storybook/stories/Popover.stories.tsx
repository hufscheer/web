import { Popover, PopoverContent, PopoverTrigger } from '@hcc/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: '@hcc/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
    );
  },
};
