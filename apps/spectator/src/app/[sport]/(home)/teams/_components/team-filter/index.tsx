'use client';
import Conveyer from '@egjs/conveyer';
import { useEffect, useRef } from 'react';

import type { SportType } from '~/api/types';

import { useSuspenseTeamUnitAvailability } from '~/api/queries/useTeamUnitAvailability';
import { FilterBadge } from '~/components/ui';
import { useOrganizations } from '~/stores/use-organization';

import { useTeamUnits } from './useTeamUnits';

export const TeamFilter = ({ sport }: { sport: SportType }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const conveyerRef = useRef<Conveyer | null>(null);
  const { selected, toggle, filterUnits } = useTeamUnits();
  const { organization } = useOrganizations();
  const { data: unitAvailability } = useSuspenseTeamUnitAvailability({
    sportType: sport,
    ...(organization.id !== null && { organizationId: organization.id }),
  });

  // 종목 전환 시 hasTeam: false 된 항목 선택 해제
  useEffect(() => {
    const unavailable = unitAvailability.filter((u) => !u.hasTeam).map((u) => u.unitName);
    const nextSelected = selected.filter((u) => !unavailable.includes(u));
    if (nextSelected.length !== selected.length) {
      filterUnits(nextSelected);
    }
  }, [sport, unitAvailability, filterUnits, selected]);

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

  type UnitItem =
    | { isAll: true; unit: '전체'; unitName: '전체'; hasTeam: true }
    | { isAll: false; unit: string; unitName: string; hasTeam: boolean };

  const allUnits: UnitItem[] = [
    { isAll: true, unit: '전체', unitName: '전체', hasTeam: true },
    ...unitAvailability.map((u) => ({ isAll: false as const, ...u })),
  ];

  const sortedUnits = [...allUnits].sort((a, b) => {
    if (a.isAll) return isEmpty ? -1 : 1;
    if (b.isAll) return isEmpty ? 1 : -1;

    const aSelected = !a.isAll && selected.includes(a.unitName);
    const bSelected = !b.isAll && selected.includes(b.unitName);

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
        {sortedUnits.map((item, idx) => {
          const isActive = item.isAll ? isEmpty : selected.includes(item.unitName);

          const prevItem = sortedUnits[idx - 1];
          const wasPrevActive = prevItem?.isAll
            ? isEmpty
            : selected.includes(prevItem?.unitName ?? '');

          const showDivider = idx > 0 && wasPrevActive && !isActive;

          return (
            <div key={item.unit} className="flex shrink-0 items-center gap-2">
              {showDivider && <div className="h-6 w-px bg-neutral-100" aria-hidden="true" />}
              <FilterBadge
                isActive={isActive}
                disabled={!item.hasTeam}
                onClick={() =>
                  item.hasTeam ? toggle(item.isAll ? null : item.unitName) : undefined
                }
                className={!item.hasTeam ? 'cursor-not-allowed opacity-40' : undefined}
              >
                {item.unitName}
              </FilterBadge>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export * from './useTeamUnits';
