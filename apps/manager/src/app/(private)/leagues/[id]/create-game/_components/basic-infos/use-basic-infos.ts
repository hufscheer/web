import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { type GameFormType, useSuspenseLeague, useSuspenseLeagueTeams } from '~/api';
import { getRoundOptions } from '~/constants/leagues';

export const useBasicInfoData = (leagueId: number) => {
  const { control } = useFormContext<GameFormType>();
  const { data: league } = useSuspenseLeague({ leagueId });
  const round = useWatch({ control, name: 'round' });
  const thirdPlaceMatch = useWatch({ control, name: 'thirdPlaceMatch' });
  const { data: teams } = useSuspenseLeagueTeams({
    leagueId,
    round,
    thirdPlaceMatch,
  });
  const isThirdPlaceMatchEnabled = league.thirdPlaceMatchEnabled === true;

  const roundOptions = useMemo(
    () =>
      getRoundOptions(league.sportType, isThirdPlaceMatchEnabled)
        .filter((item) => league.maxRound >= item.round)
        .map((item) => ({ value: item.value.toString(), label: item.label })),
    [isThirdPlaceMatchEnabled, league.maxRound, league.sportType],
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
