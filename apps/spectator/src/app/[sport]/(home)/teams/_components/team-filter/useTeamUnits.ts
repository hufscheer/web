import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { startTransition, useMemo } from 'react';

export const useTeamUnits = () => {
  const [units, setUnits] = useQueryState('units', parseAsArrayOf(parseAsString).withDefault([]));

  const selected = useMemo(() => units.filter(Boolean), [units]);

  const toggle = (unit: string | null) => {
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

  const filterUnits = (keep: string[]) =>
    startTransition(() => {
      setUnits(keep, { scroll: false, history: 'replace' });
    });

  return {
    selected,
    toggle,
    clear,
    filterUnits,
  };
};
