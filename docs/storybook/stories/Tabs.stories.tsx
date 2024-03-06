import { Tabs } from '@hcc/ui';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: '@hcc/Tabs',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Tabs defaultValue="A">
        <Tabs.List>
          <Tabs.Trigger value="A">A</Tabs.Trigger>
          <Tabs.Trigger value="B">B</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="A">
          <div>저는 A입니다.</div>
        </Tabs.Content>
        <Tabs.Content value="B">
          <div>저는 B입니다.</div>
        </Tabs.Content>
      </Tabs>
    );
  },
};
