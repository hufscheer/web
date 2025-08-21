'use client';

import { ChevronForwardIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import Link from 'next/link';
import { useSuspenseTeams } from '~/api';
import { routes } from '~/constants/routes';

export const TeamList = () => {
  const { data } = useSuspenseTeams();

  return (
    <div className="column h-full gap-3 overflow-y-auto pt-5 pb-[92px]">
      {data.map(team => (
        <div key={team.id} className="row-between rounded-lg border border-neutral-100 px-4 py-2.5">
          <div className="center-y gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-neutral-100" />
            <div>
              <Typography weight="medium">{team.name}</Typography>
              <Typography color="var(--color-neutral-500)" fontSize={12} weight="medium">
                {team.unit}
              </Typography>
            </div>
          </div>

          <Link className="center" href={`/${routes.team}/${team.id}`}>
            <ChevronForwardIcon size={24} />
          </Link>
        </div>
      ))}
    </div>
  );
};
