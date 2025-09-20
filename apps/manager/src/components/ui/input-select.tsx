'use client';

import * as Select from '@radix-ui/react-select';
import { CheckSmallIcon, KeyboardArrowDownIcon } from '@hcc/icons';
import { useState } from 'react';

type SelectOption = { value: string; label: string };
type BoxSelectProps = Select.SelectProps & {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
};

export const InputSelect = ({ options, placeholder, label }: BoxSelectProps) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Select.Root value={value} onValueChange={setValue}>
      <Select.Trigger className="group relative flex h-15 w-full items-center justify-between rounded-lg border border-neutral-100 bg-white px-4 font-medium text-base focus:outline-none">
        <div className="flex flex-col">
          <span
            className={`font-medium text-neutral-400 transition-all ${
              value ? 'text-xs' : 'text-base'
            }`}
          >
            {label}
          </span>
          <Select.Value
            placeholder={placeholder}
            className="group-data-[placeholder]:text-gray-400"
          />
        </div>
        <Select.Icon className="text-[#141B21]">
          <KeyboardArrowDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={5}
          className="w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          <Select.Viewport className="max-h-60 overflow-y-auto p-1">
            {options.map(option => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="relative flex cursor-pointer select-none items-center rounded-md py-2 pr-4 pl-8 text-base outline-none data-[highlighted]:bg-gray-100"
              >
                <Select.ItemIndicator className="absolute left-2">
                  <CheckSmallIcon />
                </Select.ItemIndicator>
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
