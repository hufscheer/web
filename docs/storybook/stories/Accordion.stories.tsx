import { Accordion } from '@hcc/ui';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: '@hcc/Accordion',
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
      <Accordion>
        <Accordion.Item value="2021">
          <Accordion.Trigger>2021년도</Accordion.Trigger>
          <Accordion.Content>콘텐츠입니다.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="2022">
          <Accordion.Trigger>2022년도</Accordion.Trigger>
          <Accordion.Content>콘텐츠입니다.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="2023">
          <Accordion.Trigger>2023년도</Accordion.Trigger>
          <Accordion.Content>콘텐츠입니다.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="2024">
          <Accordion.Trigger>2024년도</Accordion.Trigger>
          <Accordion.Content>
            콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
  },
};

export const Single: Story = {
  render: () => {
    return (
      <Accordion type="single">
        <Accordion.Item value="2023">
          <Accordion.Trigger>2023년도</Accordion.Trigger>
          <Accordion.Content>콘텐츠입니다.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="2024">
          <Accordion.Trigger>2024년도</Accordion.Trigger>
          <Accordion.Content>
            콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="2025">
          <Accordion.Trigger>2025년도</Accordion.Trigger>
          <Accordion.Content>
            콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="2026">
          <Accordion.Trigger>2026년도</Accordion.Trigger>
          <Accordion.Content>
            콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.
            콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.
            콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.
            콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.콘텐츠입니다.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
  },
};
