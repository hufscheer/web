'use client';
import Conveyer from '@egjs/conveyer';
import { useEffect, useRef } from 'react';

import { TEAM_UNIT_LIST, type TeamUnitType } from '~/api';
import { FilterBadge } from '~/components/ui';

import { useTeamUnits } from './useTeamUnits';

export const TeamFilter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const conveyerRef = useRef<Conveyer | null>(null);
  const { selected, toggle } = useTeamUnits();

  useEffect(() => {
    if (!containerRef.current) return;
    conveyerRef.current = new Conveyer(containerRef.current, {
      horizontal: true,
      useDrag: true,
      useSideWheel: true,
      preventClickOnDrag: true,
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
    <div className="sticky z-header flex overflow-hidden bg-white py-3">
      <div
        ref={containerRef}
        className="flex gap-2 overflow-x-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*:first-child]:pl-5 [&>*:last-child]:pr-5"
      >
        {sortedUnits.map((unit, idx) => {
          const isAll = unit === '전체';
          const isActive = isAll ? isEmpty : selected.includes(unit as TeamUnitType);

          const prevUnit = sortedUnits[idx - 1];
          const wasPrevAll = prevUnit === '전체';
          const wasPrevActive = wasPrevAll ? isEmpty : selected.includes(prevUnit as TeamUnitType);

          const showDivider = idx > 0 && wasPrevActive && !isActive;

          return (
            <div key={unit} className="flex shrink-0 items-center gap-2">
              {showDivider && <div className="h-6 w-px bg-neutral-100" aria-hidden="true" />}
              <FilterBadge
                isActive={isActive}
                onClick={() => toggle(isAll ? null : (unit as TeamUnitType))}
              >
                {unit}
              </FilterBadge>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export * from './useTeamUnits';
