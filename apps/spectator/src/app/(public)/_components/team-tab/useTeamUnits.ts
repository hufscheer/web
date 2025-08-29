import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { startTransition } from 'react';
import { TEAM_UNIT_LIST, type TeamUnitType } from '~/api';

export const useTeamUnits = () => {
  const [selected, setSelected] = useQueryState(
    'units',
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const toggle = (unit: TeamUnitType) => {
    const filteredSelected = selected.filter(unit =>
      TEAM_UNIT_LIST.includes(unit as TeamUnitType),
    ) as TeamUnitType[];

    const isSelected = filteredSelected.includes(unit);
    const updated = isSelected
      ? filteredSelected.filter(u => u !== unit)
      : [...filteredSelected, unit];

    startTransition(() => {
      setSelected(updated, { scroll: false, history: 'replace' });
    });
  };

  const clear = () => setSelected([], { scroll: false, history: 'replace' });

  return {
    selected: selected.filter(unit =>
      TEAM_UNIT_LIST.includes(unit as TeamUnitType),
    ) as TeamUnitType[],
    toggle,
    clear,
  };
};
