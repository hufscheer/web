import type { GameFormTeamType, GameFormType } from '~/api';

type BasicFields = Pick<GameFormType, 'name' | 'round' | 'startTime' | 'team1' | 'team2'>;

export const isBasicValid = (v: BasicFields): boolean =>
  Boolean(
    v.name?.trim() &&
    v.round &&
    v.startTime &&
    v.team1?.leagueTeamId &&
    v.team2?.leagueTeamId &&
    v.team1.leagueTeamId !== v.team2.leagueTeamId,
  );

export const isTeamLineupComplete = (team: GameFormTeamType): boolean =>
  team.lineupPlayers.some((p) => p.state === 'STARTER') &&
  team.lineupPlayers.some((p) => p.isCaptain);

export const isFullyValid = (v: GameFormType): boolean =>
  isBasicValid(v) && isTeamLineupComplete(v.team1) && isTeamLineupComplete(v.team2);
