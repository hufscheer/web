'use client';

import { clsx as cn } from 'clsx';

type Props = {
  id: number;
  displayName: string;
  selected: boolean;
  onSelect: (id: number) => void;
};

export const OrganizationCard = ({ id, displayName, selected, onSelect }: Props) => (
  <button
    type="button"
    onClick={() => onSelect(id)}
    aria-pressed={selected}
    className={cn(
      'flex w-full items-center gap-3 rounded-2xl border bg-white p-4 transition-colors',
      selected
        ? 'bg-primary-50 border-[var(--color-primary-600)]'
        : 'border-neutral-200 hover:border-neutral-300',
    )}
  >
    {/* 로고 슬롯: 추후 실제 이미지로 교체. 현재는 더미 원형 */}
    <div className="size-12 shrink-0 rounded-full bg-neutral-200" aria-hidden />
    <span className="truncate text-base font-medium text-neutral-900">{displayName}</span>
  </button>
);
