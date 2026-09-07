'use client';

import { KeyboardArrowDownIcon } from '@hcc/icons';
import { SelectPrimitives } from '@hcc/ui/primitives';
import { twMerge } from 'tailwind-merge';

import type { SportType } from '~/api';

import { getPositionGroups } from './positions';

type Props = {
  sportType: SportType;
  value: string | null;
  disabled?: boolean;
  onSelect: (position: string | null) => void;
};

/**
 * Grouped Select alternative — Base UI Select with per-group header rows.
 * Native-feeling keyboard nav + compact vertical list.
 */
export const PositionSelect = ({ sportType, value, disabled, onSelect }: Props) => {
  const groups = getPositionGroups(sportType);

  return (
    <SelectPrimitives.Root value={value} onValueChange={onSelect} disabled={disabled}>
      <SelectPrimitives.Container
        render={
          <button
            aria-label="포지션 선택"
            className={twMerge(
              'flex items-center !gap-0.5 !rounded-md !px-1.5 !py-0 text-xs font-medium transition-colors',
              disabled
                ? '!cursor-not-allowed !text-neutral-300'
                : '!text-neutral-700 hover:!bg-neutral-100',
            )}
          />
        }
      >
        <SelectPrimitives.Value placeholder="선택" className="!w-6 !px-0 !text-center" />
        <KeyboardArrowDownIcon />
      </SelectPrimitives.Container>

      <SelectPrimitives.Popup
        side="bottom"
        align="end"
        className="!min-w-[7rem] !p-1 !text-neutral-900"
      >
        {groups.map((group, index) => (
          <div key={group.code}>
            {index > 0 && <div className="my-1 h-px bg-neutral-100" />}
            <div className="px-3 py-1 text-[11px] font-semibold text-neutral-400">{group.code}</div>

            {group.subs.map((sub) => (
              <SelectPrimitives.Item
                key={sub}
                value={sub}
                className="cursor-pointer rounded-md !px-3 !py-1.5 text-sm text-neutral-700 outline-none data-[highlighted]:bg-neutral-100 data-[selected]:font-semibold data-[selected]:text-blue-600"
              >
                <SelectPrimitives.ItemText>{sub}</SelectPrimitives.ItemText>
              </SelectPrimitives.Item>
            ))}
          </div>
        ))}
      </SelectPrimitives.Popup>
    </SelectPrimitives.Root>
  );
};
