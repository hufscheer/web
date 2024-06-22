import { Calendar, Input } from '@hcc/ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta = {
  title: '@hcc/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const SelectDate: Story = {
  render: () => {
    const [date, setDate] = useState<Value>(new Date());

    return (
      <>
        <Calendar value={date} onChange={setDate} />
        <Input value={date?.toLocaleString()} />
      </>
    );
  },
};
