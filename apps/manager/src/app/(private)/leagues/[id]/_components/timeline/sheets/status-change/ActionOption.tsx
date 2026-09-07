'use client';

import { CheckSmallIcon } from '@hcc/icons';
import { twMerge } from 'tailwind-merge';

type Props = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

export function ActionOption({ label, selected, onClick }: Props) {
  return (
    <button
      type="button"
      className={twMerge(
        'flex items-center justify-between rounded-xl border px-4 py-4 text-left text-sm font-medium transition-colors',
        selected ? 'border-blue-500 text-black' : 'border-neutral-200 text-neutral-400',
      )}
      onClick={onClick}
    >
      <span>{label}</span>
      <span
        className={twMerge(
          'flex h-5 w-5 items-center justify-center rounded border',
          selected ? 'border-blue-500 bg-blue-500' : 'border-neutral-300',
        )}
      >
        {selected && <CheckSmallIcon className="text-white" />}
      </span>
    </button>
  );
}
