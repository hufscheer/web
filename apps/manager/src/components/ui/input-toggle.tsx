'use client';

import { ToggleIcon } from '@hcc/icons';

type InputToggleProps = {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
};

export const InputToggle = ({
  label,
  checked,
  onCheckedChange,
  disabled = false,
}: InputToggleProps) => {
  return (
    <div className="flex h-15 items-center justify-between rounded-lg border border-neutral-100 bg-white px-4">
      <span className="text-base font-medium text-black">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={`focus-visible:outline-primary-600 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${checked ? 'text-primary-600' : 'text-neutral-300'}`}
      >
        <ToggleIcon
          checked={checked}
          color={checked ? 'var(--color-primary-600)' : 'var(--color-neutral-300)'}
        />
      </button>
    </div>
  );
};
