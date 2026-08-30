import { useMemo } from 'react';

import { useSuspenseLeague, useSuspenseLeagueTeams } from '~/api';
import { getRoundOptions } from '~/constants/leagues';

export const useBasicInfoData = (leagueId: number) => {
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: teams } = useSuspenseLeagueTeams({ leagueId });

  const roundOptions = useMemo(
    () =>
      getRoundOptions(league.sportType)
        .filter((item) => league.maxRound >= item.round)
        .map((item) => ({ value: item.value.toString(), label: item.label })),
    [league.maxRound, league.sportType],
  );

  const teamOptions = useMemo(
    () =>
      teams.map((t) => ({
        value: t.leagueTeamId.toString(),
        label: t.teamName,
      })),
    [teams],
  );

  return { teams, roundOptions, teamOptions };
};
