'use client';

import { ChevronForwardIcon, DeleteForeverIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useSuspenseTeams } from '~/api';
import { routes } from '~/constants/routes';

type Props = {
  edit: boolean;
};

export const TeamList = ({ edit }: Props) => {
  const { data } = useSuspenseTeams();

  return (
    <div className="column h-full gap-3 overflow-y-auto pt-5 pb-[92px]">
      {data.map(team => (
        <div key={team.id} className="row-between rounded-lg border border-neutral-100 px-4 py-3">
          <div className="center-y gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={team.logoImageUrl}
                alt={`${team.name} logo`}
                sizes="100vw"
                draggable={false}
                priority
                fill
              />
            </div>
            <div className="column gap-1.5">
              <Typography weight="medium" lineHeight="none">
                {team.name}
              </Typography>
              <Typography
                color="var(--color-neutral-500)"
                fontSize={12}
                weight="medium"
                lineHeight="none"
              >
                {team.unit}
              </Typography>
            </div>
          </div>

          {edit ? (
            <span className="cursor-pointer text-[var(--color-danger-600)]">
              <DeleteForeverIcon size={24} />
            </span>
          ) : (
            <Link className="center" href={`/${routes.team}/${team.id}`}>
              <ChevronForwardIcon size={24} />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};
