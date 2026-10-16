'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import type { SportType } from '~/api/types';

import { routes } from '~/constants/routes';
import { getSportConfig, SportIcon } from '~/constants/sports';

const TABS: { sportType: SportType; path: string }[] = [
  { sportType: 'SOCCER', path: 'soccer' },
  { sportType: 'BASKETBALL', path: 'basketball' },
];

export const SportTabs = () => {
  const { sport } = useParams<{ sport?: string }>();
  const activePath = sport ?? 'soccer';

  return (
    <div className="flex justify-center px-5 pt-3">
      <div className="relative flex w-full rounded-lg bg-gray-200 p-1">
        {TABS.map((tab) => (
          <Link
            key={tab.path}
            href={`/${routes.teams}/${tab.path}`}
            replace
            className={twMerge(
              'flex-1 center-y justify-center gap-1.5 rounded-md py-1 text-center font-medium text-sm transition-colors duration-150 ease-in-out',
              activePath === tab.path
                ? 'bg-white text-black shadow-md'
                : 'bg-transparent text-gray-500',
            )}
          >
            <SportIcon sportType={tab.sportType} />
            {getSportConfig(tab.sportType).label}
          </Link>
        ))}
      </div>
    </div>
  );
};
