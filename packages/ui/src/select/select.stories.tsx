import type { Meta, StoryObj } from '@storybook/react-vite';

import { ErrorIcon } from '@hcc/icons';
import { useState } from 'react';

import { Select } from '.';

export default {
  title: 'Select',
  component: Select.Root,
  argTypes: {
    size: {
      options: ['md', 'lg'],
      control: { type: 'inline-radio' },
    },
    labelPosition: {
      options: ['top', 'left'],
      control: { type: 'inline-radio' },
    },
    label: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
    clear: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
  },
} satisfies Meta<typeof Select.Root>;

type Story = StoryObj<typeof Select.Root>;

export const Default: Story = {
  render: ({
    label = 'Label',
    description = 'Description',
    placeholder = '선택하세요',
    ...args
  }) => {
    return (
      <Select.Root
        clear
        label={label}
        description={description}
        placeholder={placeholder}
        {...args}
      >
        <Select.Item value="apple" left={<div>dsaf</div>}>
          Apple
        </Select.Item>
        <Select.Item value="banana">Banana</Select.Item>
        <Select.Item value="cherry">Cherry</Select.Item>
      </Select.Root>
    );
  },
};

export const WithSlots: Story = {
  render: ({
    label = 'Label',
    description = 'Description',
    placeholder = '선택하세요',
    ...args
  }) => {
    return (
      <Select.Root
        label={label}
        description={description}
        placeholder={placeholder}
        left={<ErrorIcon size="20px" style={{ flexShrink: 0 }} />}
        right={<ErrorIcon size="20px" style={{ flexShrink: 0 }} />}
        clear
        {...args}
      >
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="banana">Banana</Select.Item>
        <Select.Item value="cherry">Cherry</Select.Item>
      </Select.Root>
    );
  },
};

export const Controlled: Story = {
  render: ({
    label = 'Label',
    description = 'Description',
    placeholder = '선택하세요',
    ...args
  }) => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <Select.Root
        {...args}
        label={label}
        description={description}
        placeholder={placeholder}
        value={value}
        onValueChange={(next) => {
          setValue(next);
          console.log(next);
        }}
        clear
      >
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="banana">Banana</Select.Item>
        <Select.Item value="cherry">Cherry</Select.Item>
      </Select.Root>
    );
  },
};
