import type { Meta, StoryObj } from '@storybook/react-vite';

import { ErrorIcon } from '@hcc/icons';
import { useState } from 'react';

import { TextField } from '.';

export default {
  title: 'TextField',
  component: TextField,
  argTypes: {
    size: {
      options: ['md', 'lg'],
      control: { type: 'inline-radio' },
    },
    labelPosition: {
      options: ['top', 'left'],
      control: { type: 'inline-radio' },
    },
    label: {
      control: { type: 'text' },
    },
    description: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof TextField>;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  render: ({ label = 'Label', description = 'Description', placeholder = 'asdfasdf', ...args }) => {
    return (
      <TextField
        label={label}
        description={description}
        placeholder={placeholder}
        left={<ErrorIcon size="20px" style={{ flexShrink: 0 }} />}
        right={<ErrorIcon size="20px" style={{ flexShrink: 0 }} />}
        clear
        {...args}
      />
    );
  },
};

export const CustomInputIds: Story = {
  argTypes: {
    inputId: { control: { type: 'text' } },
    descriptionId: { control: { type: 'text' } },
  },
  render: ({
    inputId,
    descriptionId,
    label = 'Label',
    description = 'Description',
    placeholder = 'asdfasdf',
    ...args
  }) => {
    return (
      <TextField
        inputId={inputId}
        descriptionId={descriptionId}
        label={label}
        description={description}
        placeholder={placeholder}
        left={<ErrorIcon size="20px" style={{ flexShrink: 0 }} />}
        right={<ErrorIcon size="20px" style={{ flexShrink: 0 }} />}
        clear
        {...args}
      />
    );
  },
};

export const ClearButton: Story = {
  render: ({ label = 'Label', description = 'Description', placeholder = 'asdfasdf', ...args }) => {
    const [value, setValue] = useState('');
    const handleValueChange = (value: string) => {
      setValue(value);
      console.log(value);
    };

    return (
      <TextField
        {...args}
        value={value}
        onValueChange={handleValueChange}
        label={label}
        description={description}
        placeholder={placeholder}
        clear
      />
    );
  },
};
