'use client';

import Conveyer from '@egjs/conveyer';
import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { TEAM_UNIT_LIST, type TeamUnitType } from '~/api';
import { useTeamUnits } from './useTeamUnits';

export const TeamFilter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const conveyerRef = useRef<Conveyer | null>(null);
  const { selected, toggle } = useTeamUnits();

  useEffect(() => {
    if (!containerRef.current) return;

    conveyerRef.current = new Conveyer(containerRef.current, {
      horizontal: true,
    });

    return () => conveyerRef.current?.destroy();
  }, []);

  const isEmpty = selected.length === 0;
  const allUnits = ['전체', ...TEAM_UNIT_LIST];

  const sortedUnits = [...allUnits].sort((a, b) => {
    if (a === '전체') return isEmpty ? -1 : 1;
    if (b === '전체') return isEmpty ? 1 : -1;

    const aSelected = selected.includes(a as TeamUnitType);
    const bSelected = selected.includes(b as TeamUnitType);

    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    return 0;
  });

  return (
    <div className="my-3">
      <div ref={containerRef} className="flex overflow-hidden">
        <div className="flex gap-2 [&>*:first-child]:ml-5 [&>*:last-child]:mr-5">
          {sortedUnits.map((unit, idx) => {
            const isAll = unit === '전체';
            const isActive = isAll ? isEmpty : selected.includes(unit as TeamUnitType);

            const prevUnit = sortedUnits[idx - 1];
            const wasPrevAll = prevUnit === '전체';
            const wasPrevActive = wasPrevAll
              ? isEmpty
              : selected.includes(prevUnit as TeamUnitType);

            const showDivider = idx > 0 && wasPrevActive && !isActive;

            return (
              <div key={unit} className="flex shrink-0 items-center gap-2">
                {showDivider && <div className="h-6 w-px bg-neutral-100" aria-hidden="true" />}
                <button
                  type="button"
                  onClick={() => toggle(isAll ? null : (unit as TeamUnitType))}
                  className={twMerge(
                    'shrink-0 cursor-pointer rounded-lg px-2 py-1.5 font-medium text-sm transition-colors',
                    isActive
                      ? 'bg-[var(--color-primary-100)] text-[var(--color-primary-600)] hover:bg-[var(--color-primary-200)]'
                      : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200',
                  )}
                >
                  {unit}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
