import { useFormContext } from 'react-hook-form';

import type { GameFormTeamType, GameFormType } from '~/api';

export const useBasicInfoDerived = () => {
  const { watch } = useFormContext<GameFormType>();
  const [name, round, startTime, team1, team2] = watch([
    'name',
    'round',
    'startTime',
    'team1',
    'team2',
  ]);

  const isBasicValid = Boolean(
    name?.trim() &&
    round &&
    startTime &&
    team1?.leagueTeamId &&
    team2?.leagueTeamId &&
    team1.leagueTeamId !== team2.leagueTeamId,
  );

  const team1LineupDone = isTeamLineupComplete(team1);
  const team2LineupDone = isTeamLineupComplete(team2);
  const isSubmitReady = isBasicValid && team1LineupDone && team2LineupDone;

  return {
    team1Selected: Boolean(team1?.leagueTeamId),
    team2Selected: Boolean(team2?.leagueTeamId),
    team1LineupDone,
    team2LineupDone,
    isBasicValid,
    isSubmitReady,
  };
};

const isTeamLineupComplete = (team: GameFormTeamType) =>
  team.lineupPlayers.some((p) => p.state === 'STARTER') &&
  team.lineupPlayers.some((p) => p.isCaptain);
