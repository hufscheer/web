import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { startTransition, useMemo } from 'react';
import { TEAM_UNIT_LIST, type TeamUnitType } from '~/api';

export const useTeamUnits = () => {
  const [units, setUnits] = useQueryState('units', parseAsArrayOf(parseAsString).withDefault([]));

  const selected = useMemo(
    () => units.filter((u) => TEAM_UNIT_LIST.includes(u as TeamUnitType)) as TeamUnitType[],
    [units],
  );

  const toggle = (unit: TeamUnitType | null) => {
    if (unit === null) {
      startTransition(() => {
        setUnits([], { scroll: false, history: 'replace' });
      });
      return;
    }

    const isActive = selected.includes(unit);
    const updated = isActive ? selected.filter((u) => u !== unit) : [...selected, unit];

    startTransition(() => {
      setUnits(updated, { scroll: false, history: 'replace' });
    });
  };

  const clear = () => setUnits([], { scroll: false, history: 'replace' });

  return {
    selected,
    toggle,
    clear,
  };
};
