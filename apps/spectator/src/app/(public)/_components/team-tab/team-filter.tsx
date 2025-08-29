'use client';

import Conveyer from '@egjs/conveyer';
import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { TEAM_UNIT_LIST } from '~/api';
import { useTeamUnits } from './useTeamUnits';

export const TeamFilter = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<Conveyer | null>(null);
  const { selected, toggle } = useTeamUnits();

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    scrollerRef.current = new Conveyer(scrollRef.current, {
      horizontal: true,
    });

    return () => scrollerRef.current?.destroy();
  }, []);

  const units = [...TEAM_UNIT_LIST].sort((a, b) => {
    const isASelected = selected.includes(a);
    const isBSelected = selected.includes(b);

    if (isASelected && !isBSelected) {
      return -1;
    }
    if (!isASelected && isBSelected) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="my-3">
      <div ref={scrollRef} className="flex overflow-hidden">
        <div className="flex gap-2 px-5">
          {units.map(unit => {
            const isSelected = selected.includes(unit);
            return (
              <button
                key={unit}
                type="button"
                onClick={() => toggle(unit)}
                className={twMerge(
                  'shrink-0 rounded-full px-4 py-2 font-medium text-sm transition-colors',
                  'border border-gray-200 hover:border-gray-300',
                  isSelected
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50',
                )}
              >
                {unit}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
