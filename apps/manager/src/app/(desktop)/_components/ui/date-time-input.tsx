'use client';

import { useState } from 'react';

import { cn } from '~/utils/cn';

import { controlClass } from './field';

type Props = {
  /** 'YYYY-MM-DDTHH:mm'. 비어 있으면 날짜를 아직 안 고른 것이다 */
  value: string;
  onChange: (next: string) => void;
  required?: boolean;
};

const pad = (n: number) => String(n).padStart(2, '0');
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);

/**
 * datetime-local 은 시간을 고르는 방식이 브라우저마다 달라 "날짜만 바뀐다"는 제보가 있었다.
 * 날짜(date)와 시·분(select)을 나눠 어느 브라우저에서나 같은 방식으로 시각을 정하게 한다.
 */
export const DateTimeInput = ({ value, onChange, required }: Props) => {
  // 날짜를 고르기 전에도 시간은 미리 맞춰 둘 수 있다. 값은 날짜가 생길 때 함께 나간다
  const [draft, setDraft] = useState({ hour: 10, minute: 0 });

  const [date = '', time = ''] = value.split('T');
  const hour = time ? Number(time.slice(0, 2)) : draft.hour;
  const minute = time ? Number(time.slice(3, 5)) : draft.minute;

  // 5분 단위가 아닌 기존 값도 그대로 보이게 한다. 열기만 해서 값이 바뀌면 안 된다
  const minutes = MINUTES.includes(minute) ? MINUTES : [...MINUTES, minute].sort((a, b) => a - b);

  const emit = (nextDate: string, nextHour: number, nextMinute: number) => {
    setDraft({ hour: nextHour, minute: nextMinute });
    onChange(nextDate ? `${nextDate}T${pad(nextHour)}:${pad(nextMinute)}` : '');
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        value={date}
        required={required}
        onChange={(e) => emit(e.target.value, hour, minute)}
        className={cn(controlClass, 'tnum min-w-0')}
      />
      <select
        aria-label="시"
        value={hour}
        onChange={(e) => emit(date, Number(e.target.value), minute)}
        className={cn(controlClass, 'tnum w-20 shrink-0 cursor-pointer pr-1.5')}
      >
        {HOURS.map((h) => (
          <option key={h} value={h}>
            {pad(h)}
          </option>
        ))}
      </select>
      <span className="shrink-0 text-[var(--color-neutral-400)]">:</span>
      <select
        aria-label="분"
        value={minute}
        onChange={(e) => emit(date, hour, Number(e.target.value))}
        className={cn(controlClass, 'tnum w-20 shrink-0 cursor-pointer pr-1.5')}
      >
        {minutes.map((m) => (
          <option key={m} value={m}>
            {pad(m)}
          </option>
        ))}
      </select>
    </div>
  );
};
