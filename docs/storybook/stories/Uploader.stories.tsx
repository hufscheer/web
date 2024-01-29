import { Uploader } from '@hcc/ui';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: '@hcc/Uploader',
  component: Uploader,
  argTypes: {
    onChange: { action: 'changed!' },
  },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Uploader>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render: args => (
    <Uploader {...args}>
      {(_, file) => <button>{file ? file.name : 'upload'}</button>}
    </Uploader>
  ),
};

export const Preview: Story = {
  render: args => {
    return (
      <Uploader {...args}>
        {src => (
          <img src={src || 'https://via.placeholder.com/200'} alt="img" />
        )}
      </Uploader>
    );
  },
};
