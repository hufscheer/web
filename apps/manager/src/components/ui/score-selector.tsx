'use client';

import { twMerge } from 'tailwind-merge';

type ScoreSelectorOption = {
  label: string;
  value: number;
};

type ScoreSelectorRow = {
  id: string | number;
  value: number | null;
  onChange: (value: number) => void;
};

type ScoreSelectorProps = {
  options?: ScoreSelectorOption[];
  rows: ScoreSelectorRow[];
};

const DEFAULT_OPTIONS: ScoreSelectorOption[] = [
  { label: '1점', value: 1 },
  { label: '2점', value: 2 },
  { label: '3점', value: 3 },
];

export function ScoreSelector({ options = DEFAULT_OPTIONS, rows }: ScoreSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      {rows.map((row) => (
        <div key={row.id} className="flex overflow-hidden rounded-xl bg-[#E9EBEE] p-1">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={twMerge(
                'flex flex-1 items-center justify-center rounded-lg py-3 text-base font-medium transition-colors',
                row.value === option.value ? 'bg-white text-black shadow-sm' : 'text-neutral-400',
              )}
              onClick={() => row.onChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
