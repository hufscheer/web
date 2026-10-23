import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import type { GameFormType, useSuspenseLeagueTeams } from '~/api';

type Team = ReturnType<typeof useSuspenseLeagueTeams>['data'][number];

export const useTeamSelectHandler = (teams: Team[]) => {
  const { setValue } = useFormContext<GameFormType>();

  return useCallback(
    (teamNum: 1 | 2, leagueTeamIdStr: string) => {
      const target = teams.find((t) => t.leagueTeamId.toString() === leagueTeamIdStr);
      if (!target) return;

      setValue(`team${teamNum}.teamId`, target.teamId);
      setValue(`team${teamNum}.leagueTeamId`, target.leagueTeamId);
      setValue(`team${teamNum}.lineupPlayers`, []);
    },
    [teams, setValue],
  );
};
