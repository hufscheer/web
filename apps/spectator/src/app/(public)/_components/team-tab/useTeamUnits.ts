import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { startTransition } from 'react';
import { TEAM_UNIT_LIST, type TeamUnitType } from '~/api';

export const useTeamUnits = () => {
  const [units, setUnits] = useQueryState('units', parseAsArrayOf(parseAsString).withDefault([]));

  const toggle = (unit: TeamUnitType | null) => {
    if (unit === null) {
      startTransition(() => {
        setUnits([], { scroll: false, history: 'replace' });
      });
      return;
    }

    const activeUnits = units.filter(u =>
      TEAM_UNIT_LIST.includes(u as TeamUnitType),
    ) as TeamUnitType[];

    const isActive = activeUnits.includes(unit);
    const updated = isActive ? activeUnits.filter(u => u !== unit) : [...activeUnits, unit];

    startTransition(() => {
      setUnits(updated, { scroll: false, history: 'replace' });
    });
  };

  const clear = () => setUnits([], { scroll: false, history: 'replace' });

  return {
    selected: units.filter(u => TEAM_UNIT_LIST.includes(u as TeamUnitType)) as TeamUnitType[],
    toggle,
    clear,
  };
};
