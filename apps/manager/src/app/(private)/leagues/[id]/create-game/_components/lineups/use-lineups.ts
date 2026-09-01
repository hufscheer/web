import { useFormContext } from 'react-hook-form';

import {
  type GameFormType,
  useSuspenseLeague,
  useSuspenseLeagueTeams,
  useSuspenseLeagueTeamsPlayers,
} from '~/api';
import { getStarterLimit } from '~/constants/leagues';

import type { TeamNum } from '../../constants';

export type TeamInfo = { teamName: string; leagueTeamId: number } | undefined;
export type TeamPlayer = ReturnType<typeof useSuspenseLeagueTeamsPlayers>['data'][number];

export type TeamBucket = {
  info: TeamInfo;
  players: TeamPlayer[];
};

export const useLineupsData = (leagueId: number) => {
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: teams } = useSuspenseLeagueTeams({ leagueId });

  const { watch } = useFormContext<GameFormType>();
  const [team1Id, team2Id] = watch(['team1.leagueTeamId', 'team2.leagueTeamId']);

  const team1 = teams.find((t) => t.leagueTeamId === Number(team1Id));
  const team2 = teams.find((t) => t.leagueTeamId === Number(team2Id));

  const { data: team1Players } = useSuspenseLeagueTeamsPlayers({
    leagueTeamId: team1?.leagueTeamId || 0,
  });
  const { data: team2Players } = useSuspenseLeagueTeamsPlayers({
    leagueTeamId: team2?.leagueTeamId || 0,
  });

  const teamBuckets: Record<TeamNum, TeamBucket> = {
    1: { info: team1, players: team1Players },
    2: { info: team2, players: team2Players },
  };

  return { teamBuckets, starterLimit: getStarterLimit(league.sportType) };
};
