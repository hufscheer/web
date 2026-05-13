'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { FilterBadge } from '~/components/ui';
import { useOrganizationId } from '~/hooks/useOrganizationId';

const SERVICE_START_YEAR = 2024;

interface Props {
  selectedYear: number;
}

export const YearFilter = ({ selectedYear }: Props) => {
  const currentYear = new Date().getFullYear();
  const searchParams = useSearchParams();
  const sport = searchParams.get('sport');
  const result = useOrganizationId();
  if (!result.isReady) return null;
  const { organizationId } = result;

  const years = Array.from(
    { length: currentYear - SERVICE_START_YEAR + 1 },
    (_, i) => currentYear - i,
  );

  return (
    <div className="sticky z-header flex overflow-hidden bg-white py-3">
      <div className="flex gap-2 overflow-x-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*:first-child]:pl-5 [&>*:last-child]:pr-5">
        {years.map((_year) => {
          return (
            <div key={_year} className="flex shrink-0 items-center gap-2">
              <FilterBadge
                render={
                  <Link
                    href={{
                      query: {
                        year: _year,
                        ...(sport && { sport }),
                        ...(organizationId && { org: organizationId }),
                      },
                    }}
                  />
                }
                isActive={selectedYear === _year}
              >
                {_year}
              </FilterBadge>
            </div>
          );
        })}
      </div>
    </div>
  );
};
