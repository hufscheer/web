import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@hcc/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: '@hcc/Select',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="쿼터" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            <SelectLabel>쿼터</SelectLabel>
            <SelectItem value="16">16강</SelectItem>
            <SelectItem value="8">8강</SelectItem>
            <SelectItem value="4">4강</SelectItem>
            <SelectItem value="2">결승</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  },
};

export const WithSeparator: Story = {
  render: () => {
    return (
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="쿼터" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>쿼터</SelectLabel>
            <SelectItem value="16">16강</SelectItem>
            <SelectSeparator />
            <SelectItem value="8">8강</SelectItem>
            <SelectSeparator />
            <SelectItem value="4">4강</SelectItem>
            <SelectSeparator />
            <SelectItem value="2">결승</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  },
};

export const Scrollable: Story = {
  render: () => {
    return (
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="쿼터" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            <SelectLabel>쿼터</SelectLabel>
            <SelectSeparator />
            <SelectItem value="16">16강</SelectItem>
            <SelectItem value="8">8강</SelectItem>
            <SelectItem value="4">4강</SelectItem>
            <SelectItem value="2">결승</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>과일</SelectLabel>
            <SelectItem value="apple">사과</SelectItem>
            <SelectItem value="banana">바나나</SelectItem>
            <SelectItem value="kiwi">키위</SelectItem>
            <SelectItem value="grape">포도</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>동물</SelectLabel>
            <SelectItem value="cat">고양이</SelectItem>
            <SelectItem value="dog">강아지</SelectItem>
            <SelectItem value="beaver">비버</SelectItem>
            <SelectItem value="panda">푸바오</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>숫자</SelectLabel>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="11">11</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="13">13</SelectItem>
          </SelectGroup>
          <SelectSeparator />
        </SelectContent>
      </Select>
    );
  },
};
