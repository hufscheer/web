import Conveyer from '@egjs/conveyer';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { FilterBadge } from '~/components/ui';

interface Props {
  year: number;
}

export const YearFilter = ({ year }: Props) => {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const conveyerRef = useRef<Conveyer | null>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!containerRef.current) return;
    conveyerRef.current = new Conveyer(containerRef.current, { horizontal: true });
    return () => conveyerRef.current?.destroy();
  }, []);

  const years = Array.from({ length: currentYear - 2023 + 1 }, (_, i) => currentYear - i);

  const handleSelectYear = (selectedYear: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('year', selectedYear.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="my-3">
      <div ref={containerRef} className="flex overflow-hidden">
        <div className="flex gap-2 [&>*:first-child]:ml-5 [&>*:last-child]:mr-5">
          {years.map(_year => {
            return (
              <div key={_year} className="flex shrink-0 items-center gap-2">
                <FilterBadge isActive={year === _year} onClick={() => handleSelectYear(_year)}>
                  {_year}
                </FilterBadge>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
