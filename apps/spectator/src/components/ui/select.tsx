import type { ReactNode } from 'react';

import { Select as BaseSelect } from '@base-ui/react';
import { CheckSmallIcon, KeyboardArrowDownIcon } from '@hcc/icons';
import { twMerge } from 'tailwind-merge';

export interface SelectOption<T extends string | number> {
  value: T;
  label: string;
}

interface SelectProps<T extends string | number> {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  placeholder?: string;
  className?: string;
  renderValue?: (option: SelectOption<T> | undefined) => ReactNode;
}

export const Select = <T extends string | number>({
  value,
  onChange,
  options,
  placeholder = '선택',
  className,
  renderValue,
}: SelectProps<T>) => {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <BaseSelect.Root value={value} onValueChange={onChange}>
      <BaseSelect.Trigger
        className={twMerge(
          'center-y cursor-pointer gap-4 rounded-xl bg-(--color-talk) px-2 py-1 text-sm font-medium text-neutral-800',
          '[&[data-open]>span]:rotate-180',
          className,
        )}
        aria-label={placeholder}
      >
        <BaseSelect.Value>
          {renderValue ? renderValue(selectedOption) : (selectedOption?.label ?? placeholder)}
        </BaseSelect.Value>
        <BaseSelect.Icon
          render={<span className="text-neutral-500 transition-transform duration-150" />}
        >
          <KeyboardArrowDownIcon size={16} />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Backdrop className="fixed inset-0 z-50" />
        <BaseSelect.Positioner className="z-50" sideOffset={4} align="start">
          <BaseSelect.Popup className="overflow-hidden rounded-xl border border-neutral-100 bg-white py-1 shadow-lg">
            <BaseSelect.List>
              {options.map((option) => (
                <BaseSelect.Item
                  key={option.value}
                  value={option.value}
                  className="row-between w-full cursor-pointer px-2 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 data-[selected]:font-semibold data-[selected]:text-(--color-primary-600)"
                >
                  <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator>
                    <CheckSmallIcon size={16} className="text-(--color-primary-600)" />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
};
