'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { startTransition, useEffect } from 'react';

import type { SportType } from '~/api/types';

import { useSportType } from '~/hooks/useSportType';

const SPORT_TABS: { value: SportType; label: string; emoji: string }[] = [
  { value: 'SOCCER', label: '축구', emoji: '⚽' },
  { value: 'BASKETBALL', label: '농구', emoji: '🏀' },
];

export const SportTab = () => {
  const { sport, setSport } = useSportType();

  useEffect(() => {
    setSport(sport, { scroll: false, history: 'replace', clearOnDefault: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (value: string) => {
    startTransition(() => {
      setSport(value as SportType, { scroll: false, history: 'replace', clearOnDefault: false });
    });
  };

  return (
    <Tabs.Root value={sport} onValueChange={handleChange}>
      <Tabs.List className="flex gap-1 border-b border-neutral-100 px-8">
        {SPORT_TABS.map(({ value, label, emoji }) => (
          <Tabs.Trigger
            key={value}
            value={value}
            className="flex cursor-pointer items-center gap-1.5 border-b-1 px-4 py-3 text-sm font-semibold transition-colors duration-150 data-[state=active]:border-(--color-primary-600) data-[state=active]:text-(--color-primary-600) data-[state=inactive]:border-transparent data-[state=inactive]:text-(--color-greyscale-300)"
          >
            <span>{emoji}</span>
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};
