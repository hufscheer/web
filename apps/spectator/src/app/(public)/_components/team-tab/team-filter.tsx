'use client';

import Conveyer from '@egjs/conveyer';
import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { TEAM_UNIT_LIST } from '~/api';
import { useTeamUnits } from './useTeamUnits';

export const TeamFilter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const conveyerRef = useRef<Conveyer | null>(null);
  const { selected, toggle } = useTeamUnits();

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    conveyerRef.current = new Conveyer(containerRef.current, {
      horizontal: true,
    });

    return () => conveyerRef.current?.destroy();
  }, []);

  const sortedUnits = [...TEAM_UNIT_LIST].sort((a, b) => {
    const aSelected = selected.includes(a);
    const bSelected = selected.includes(b);

    if (aSelected && !bSelected) {
      return -1;
    }
    if (!aSelected && bSelected) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="my-3">
      <div ref={containerRef} className="flex overflow-hidden">
        <div className="flex gap-2 px-5">
          {sortedUnits.map((unit, idx) => {
            const isActive = selected.includes(unit);
            const prevUnit = sortedUnits[idx - 1];
            const wasPrevActive = prevUnit ? selected.includes(prevUnit) : false;
            const showDivider = idx > 0 && wasPrevActive && !isActive;

            return (
              <div key={unit} className="flex shrink-0 items-center gap-2">
                {showDivider && <div className="h-8 w-px bg-neutral-100" aria-hidden="true" />}
                <button
                  type="button"
                  onClick={() => toggle(unit)}
                  className={twMerge(
                    'shrink-0 rounded-full px-4 py-2 font-medium text-sm transition-colors',
                    'border border-gray-200 hover:border-gray-300',
                    isActive
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50',
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
