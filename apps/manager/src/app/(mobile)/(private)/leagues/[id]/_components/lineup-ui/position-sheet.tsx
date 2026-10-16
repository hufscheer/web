'use client';

import { KeyboardArrowDownIcon } from '@hcc/icons';
import { BottomSheet } from '@hcc/ui';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import type { SportType } from '~/api';

import { findGroupBySub, getPositionGroups } from './positions';

type Props = {
  sportType: SportType;
  value: string | null;
  disabled?: boolean;
  onSelect: (position: string | null) => void;
};

export const PositionSheet = ({ sportType, value, disabled, onSelect }: Props) => {
  const groups = getPositionGroups(sportType);
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(
    () => findGroupBySub(sportType, value)?.code ?? groups[0].code,
  );

  useEffect(() => {
    if (open) setActiveGroup(findGroupBySub(sportType, value)?.code ?? groups[0].code);
  }, [open, sportType, value, groups]);

  const subs = groups.find((g) => g.code === activeGroup)?.subs ?? [];

  const handleSelect = (position: string) => {
    onSelect(position);
    setOpen(false);
  };

  return (
    <BottomSheet open={open} onOpenChange={setOpen}>
      <BottomSheet.Trigger
        disabled={disabled}
        aria-label="포지션 선택"
        className={twMerge(
          'flex items-center !gap-0.5 !rounded-md !px-1.5 !py-0 text-xs font-medium transition-colors',
          disabled
            ? '!cursor-not-allowed !text-neutral-300'
            : '!text-neutral-700 hover:!bg-neutral-100',
        )}
      >
        <span className="inline-block w-6 text-center">{value ?? '선택'}</span>
        <KeyboardArrowDownIcon />
      </BottomSheet.Trigger>

      <BottomSheet.Content>
        <div className="px-4 pb-6">
          <BottomSheet.Title className="mb-4 text-lg font-semibold">포지션 선택</BottomSheet.Title>

          <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-neutral-100">
            <PositionColumn
              label="포지션"
              items={groups.map((g) => ({ value: g.code, label: g.code }))}
              activeValue={activeGroup}
              onSelect={setActiveGroup}
              variant="primary"
              className="border-r border-neutral-100"
            />
            <PositionColumn
              label="세부 포지션"
              items={[
                ...subs.map((s) => ({ value: s, label: s })),
                { value: activeGroup, label: '선택 안 함', muted: true },
              ]}
              activeValue={value}
              onSelect={handleSelect}
              variant="secondary"
            />
          </div>
        </div>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

type PositionItem = { value: string; label: string; muted?: boolean };

type PositionColumnProps = {
  label: string;
  items: PositionItem[];
  activeValue: string | null;
  onSelect: (value: string) => void;
  variant: 'primary' | 'secondary';
  className?: string;
};

const PositionColumn = ({
  label,
  items,
  activeValue,
  onSelect,
  variant,
  className,
}: PositionColumnProps) => (
  <div className={className}>
    <div className="border-b border-neutral-100 bg-neutral-50 px-4 py-2 text-xs font-medium text-neutral-500">
      {label}
    </div>
    <ul>
      {items.map((item) => (
        <li key={item.value + item.label}>
          <PositionOption
            label={item.label}
            active={activeValue === item.value}
            muted={item.muted}
            variant={variant}
            onClick={() => onSelect(item.value)}
          />
        </li>
      ))}
    </ul>
  </div>
);

type PositionOptionProps = {
  label: string;
  active: boolean;
  muted?: boolean;
  variant: 'primary' | 'secondary';
  onClick: () => void;
};

const PositionOption = ({ label, active, muted, variant, onClick }: PositionOptionProps) => (
  <button
    type="button"
    onClick={onClick}
    className={twMerge(
      'w-full px-4 py-3 text-left text-sm transition-colors hover:bg-neutral-50',
      !active && (muted ? 'text-neutral-500' : 'text-neutral-700'),
      active && variant === 'primary' && 'bg-blue-500 font-semibold text-white hover:bg-blue-500',
      active && variant === 'secondary' && 'font-semibold text-blue-600',
    )}
  >
    {label}
  </button>
);
