'use client';

import { Select } from '@hcc/ui';

type SelectOption = { value: string; label: string };
type SelectProps = Select.Root.Props & {
  options: SelectOption[];
};

export const InputSelect = ({ options, label, ...props }: SelectProps) => {
  return (
    <Select.Root
      label={label}
      {...props}
      renderValue={(value) => options.find((option) => option.value === value)?.label}
    >
      {options.map((option) => (
        <Select.Item key={option.value} value={option.value}>
          {option.label}
        </Select.Item>
      ))}
    </Select.Root>
  );
};
