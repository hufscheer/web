'use client';

import type { SportType } from '~/app/(desktop)/_types';

import { POSITION_GROUPS } from '~/app/(desktop)/_constants/sports';
import { cn } from '~/utils/cn';

type Props = {
  sportType: SportType;
  value: string | null;
  onChange: (value: string | null) => void;
  /** 스크린 리더용 이름 */
  label: string;
  disabled?: boolean;
  className?: string;
};

/** 종목별 포지션을 고르는 select. 빈 값은 미입력(null)이다 */
export const PositionSelect = ({
  sportType,
  value,
  onChange,
  label,
  disabled = false,
  className,
}: Props) => (
  <select
    aria-label={label}
    value={value ?? ''}
    disabled={disabled}
    onChange={(e) => onChange(e.target.value || null)}
    className={cn(
      'text-t7 h-7 rounded-[var(--radius-control)] border px-1.5 font-bold tracking-wide transition-colors',
      value
        ? 'border-transparent bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)]'
        : 'border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] text-[var(--color-neutral-300)]',
      disabled && 'opacity-50',
      className,
    )}
  >
    <option value="">미입력</option>
    {POSITION_GROUPS[sportType].map(({ group, broad, items }) => (
      <optgroup key={group} label={group}>
        {broad && <option value={broad}>{broad} · 대분류</option>}
        {items.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </optgroup>
    ))}
  </select>
);
