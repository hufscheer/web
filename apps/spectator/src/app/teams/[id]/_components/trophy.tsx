import type { FC } from 'react';

import type { TrophyType } from '~/api/types/teams';

type Props = {
  trophies?: TrophyType[];
};

export const TeamTrophy: FC<Props> = ({ trophies }) => {
  if (!trophies || trophies.length === 0) return null;

  return (
    <div className="scrollbar-hide flex w-full flex-row items-center justify-center gap-2 overflow-x-auto rounded-xl bg-neutral-100 px-2 py-1">
      {trophies.map((trophy) => (
        <div
          key={trophy.leagueId}
          className="flex flex-shrink-0 flex-col items-center gap-2 px-2 py-1"
        >
          <div className="text-center text-3xl">🏆</div>
          <div className="text-xs whitespace-nowrap text-neutral-700">{trophy.leagueName}</div>
        </div>
      ))}
    </div>
  );
};
