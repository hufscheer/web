import Conveyer from '@egjs/conveyer';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useEffect, useRef } from 'react';
import { FilterBadge } from '~/components/ui';

export const YearFilter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const conveyerRef = useRef<Conveyer | null>(null);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useQueryState(
    'year',
    parseAsInteger.withDefault(currentYear),
  );

  useEffect(() => {
    if (!containerRef.current) return;

    conveyerRef.current = new Conveyer(containerRef.current, {
      horizontal: true,
    });

    return () => conveyerRef.current?.destroy();
  }, []);

  const years = Array.from({ length: currentYear - 2023 + 1 }, (_, i) => currentYear - i);

  const sortedYears = [...years].sort((a, b) => {
    const aSelected = selectedYear === a;
    const bSelected = selectedYear === b;

    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    return b - a;
  });

  return (
    <div className="my-3">
      <div ref={containerRef} className="flex overflow-hidden">
        <div className="flex gap-2 [&>*:first-child]:ml-5 [&>*:last-child]:mr-5">
          {sortedYears.map((year, idx) => {
            const isActive = selectedYear === year;

            const prevYear = sortedYears[idx - 1];
            const wasPrevActive = selectedYear === prevYear;

            const showDivider = idx > 0 && wasPrevActive && !isActive;

            return (
              <div key={year} className="flex shrink-0 items-center gap-2">
                {showDivider && <div className="h-6 w-px bg-neutral-100" aria-hidden="true" />}
                <FilterBadge isActive={isActive} onClick={() => setSelectedYear(year)}>
                  {year}
                </FilterBadge>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
