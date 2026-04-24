'use client';

import { ChevronForwardIcon, DeleteForeverIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import Image from 'next/image';
import Link from 'next/link';

import type { SportType } from '~/api/types';

import { useManagerTeams } from '~/api/queries/useManagerTeams';
import { useTeamUnits } from '~/api/queries/useTeamUnits';
import { routes } from '~/constants/routes';

import { TeamDeleteDialog } from './team-delete-dialog';

type Props = {
  edit: boolean;
  sportType: SportType;
};

export const TeamList = ({ edit, sportType }: Props) => {
  const { data: units = [] } = useTeamUnits(sportType);
  const { data = [] } = useManagerTeams(
    units.map((u) => u.unitName),
    sportType,
  );

  return (
    <div className="column h-full gap-3 overflow-y-auto px-5 pt-5 pb-[92px]">
      {data.map((team) => (
        <div key={team.id} className="row-between rounded-lg border border-neutral-100 px-4 py-3">
          <div className="center-y gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={team.logoImageUrl}
                alt={`${team.name} logo`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
            <TeamDeleteDialog id={team.id}>
              <span className="cursor-pointer text-[var(--color-danger-600)]">
                <DeleteForeverIcon size={24} />
              </span>
            </TeamDeleteDialog>
          ) : (
            <Link
              className="center"
              href={`/${routes.teams}/${sportType.toLowerCase()}/${team.id}`}
            >
              <ChevronForwardIcon size={24} />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};
