import { useFormContext } from 'react-hook-form';

import type { GameFormType } from '~/api';

import { isBasicValid, isTeamLineupComplete } from '../../validation';

export const useBasicInfoDerived = () => {
  const { watch } = useFormContext<GameFormType>();
  const [name, round, startTime, team1, team2] = watch([
    'name',
    'round',
    'startTime',
    'team1',
    'team2',
  ]);

  const basicValid = isBasicValid({ name, round, startTime, team1, team2 });
  const team1LineupDone = isTeamLineupComplete(team1);
  const team2LineupDone = isTeamLineupComplete(team2);

  return {
    team1Selected: Boolean(team1?.leagueTeamId),
    team2Selected: Boolean(team2?.leagueTeamId),
    team1LineupDone,
    team2LineupDone,
    isBasicValid: basicValid,
    isSubmitReady: basicValid && team1LineupDone && team2LineupDone,
  };
};
