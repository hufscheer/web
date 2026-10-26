'use client';

import { useSuspenseQueries } from '@hcc/api-base';

import type { SportType } from '~/app/(desktop)/_types';

import { queryKeys } from '~/api';
import { PageHeader } from '~/app/(desktop)/_components/layout/page-header';
import { routes } from '~/app/(desktop)/_constants/routes';
import { getSportConfig } from '~/constants/sports';

import { TeamForm } from '../../../_components/team-form';
import { TeamDeleteButton } from './team-delete-button';

export const TeamEdit = ({ teamId, sportType }: { teamId: number; sportType: SportType }) => {
  const [{ data: team }, { data: units }] = useSuspenseQueries({
    queries: [queryKeys.teams.detail({ id: teamId }), queryKeys.teams.units({ sportType })],
  });

  return (
    <div className="flex flex-col">
      <PageHeader
        title={team.name}
        breadcrumb={[
          '팀 관리',
          { label: getSportConfig(sportType).label, href: routes.teams(sportType) },
        ]}
        description={`${team.winCount}승 ${team.drawCount}무 ${team.loseCount}패`}
        actions={
          <TeamDeleteButton teamId={team.teamId} teamName={team.name} sportType={team.sportType} />
        }
      />
      <div className="p-6">
        <TeamForm
          sportType={team.sportType}
          units={units}
          teamId={team.teamId}
          initial={{
            name: team.name,
            unit: team.unit,
            teamColor: team.teamColor ?? '',
            logoImageUrl: team.logoImageUrl ?? '',
            teamPlayers: (team.teamPlayers ?? []).map((player) => ({
              teamPlayerId: player.teamPlayerId,
              playerId: player.playerId,
              name: player.name ?? '',
              studentNumber: player.studentNumber ?? '',
              jerseyNumber: player.jerseyNumber ?? 0,
            })),
          }}
        />
      </div>
    </div>
  );
};
