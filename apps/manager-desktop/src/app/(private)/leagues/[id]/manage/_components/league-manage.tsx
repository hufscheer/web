'use client';

import { useSuspenseQueries } from '@hcc/api-base';
import { queryKeys } from '@hcc/manager-api';

import { PageHeader } from '~/components/layout/page-header';
import { routes } from '~/constants/routes';
import { toLeague, toTeam } from '~/utils/convert';

import { LeagueDeleteButton } from './league-delete-button';
import { LeagueManageForm } from './league-manage-form';
import { RosterLauncher } from './roster-launcher';

export const LeagueManage = ({ leagueId }: { leagueId: number }) => {
  const [{ data: leagueData }, { data: leagueTeams }, { data: managerTeams }] = useSuspenseQueries({
    queries: [
      queryKeys.leagues.detail({ leagueId }),
      queryKeys.leagues.teams({ leagueId }),
      queryKeys.teams.manager,
    ],
  });

  const league = toLeague(leagueData, leagueId);
  const candidateTeams = managerTeams
    .map(toTeam)
    .filter((team) => team.sportType === league.sportType);

  return (
    <div className="flex flex-col">
      <PageHeader
        title="대회 정보 수정"
        breadcrumb={['대회 관리', { label: league.name, href: routes.league(league.leagueId) }]}
        actions={<LeagueDeleteButton leagueId={leagueId} leagueName={league.name} />}
      />
      <div className="p-6">
        <LeagueManageForm
          leagueId={leagueId}
          league={league}
          registeredTeamIds={leagueTeams.map((team) => team.teamId)}
          candidateTeams={candidateTeams}
        />

        <div className="mt-5">
          <RosterLauncher leagueId={leagueId} sportType={league.sportType} teams={leagueTeams} />
        </div>
      </div>
    </div>
  );
};
