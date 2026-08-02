'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense } from 'react';

import type { SportType } from '~/api/types';

import { replaceSportInPathname } from '~/utils/sport-route';

const SPORT_TABS: { value: SportType; label: string; emoji: string }[] = [
  { value: 'SOCCER', label: '축구', emoji: '⚽' },
  { value: 'BASKETBALL', label: '농구', emoji: '🏀' },
];

interface Props {
  sport: SportType;
}

const SportTabInner = ({ sport }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (value: string) => {
    const nextSport = value as SportType;
    if (nextSport === sport) return;

    router.replace(replaceSportInPathname(pathname, nextSport), { scroll: false });
  };

  return (
    <Tabs.Root value={sport} onValueChange={handleChange}>
      <Tabs.List className="flex items-center justify-center gap-1 border-b border-neutral-100 px-8">
        {SPORT_TABS.map(({ value, label, emoji }) => (
          <Tabs.Trigger
            key={value}
            value={value}
            className="flex w-100 cursor-pointer justify-center gap-1.5 border-b-1 px-4 py-3 text-sm font-semibold transition-colors duration-150 data-[state=active]:border-(--color-primary-600) data-[state=active]:text-(--color-primary-600) data-[state=inactive]:border-transparent data-[state=inactive]:text-(--color-greyscale-300)"
          >
            <span>{emoji}</span>
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};

export const SportTab = ({ sport }: Props) => (
  <Suspense fallback={null}>
    <SportTabInner sport={sport} />
  </Suspense>
);
