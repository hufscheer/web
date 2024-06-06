import { CrossIcon } from '@hcc/icons';
import { Icon, Toast, ToastAction, Toaster, useToast } from '@hcc/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: '@hcc/NewToast',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <>
        <Toaster />

        <button
          onClick={() => {
            toast({
              title: 'Scheduled: Catch up',
              description: 'Friday, February 10, 2023 at 5:57 PM',
            });
          }}
        >
          Show Toast
        </button>
      </>
    );
  },
};

export const OnlyTitle: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <>
        <Toaster />

        <button
          onClick={() => {
            toast({
              title: 'Scheduled: Catch up ',
              action: (
                <ToastAction altText="Goto schedule to undo">
                  <Icon source={CrossIcon} width={16} height={16} />
                </ToastAction>
              ),
            });
          }}
        >
          Add to calendar
        </button>
      </>
    );
  },
};

export const Undo: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <>
        <Toaster />

        <button
          onClick={() => {
            toast({
              variant: 'destructive',
              title: 'Scheduled: Catch up ',
              description: 'Friday, February 10, 2023 at 5:57 PM',
              action: (
                <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
              ),
            });
          }}
        >
          Add to calendar
        </button>
      </>
    );
  },
};
