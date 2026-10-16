import type { GameFormType } from '~/api';

export const STEPS = ['경기 정보', '라인업', '경기 영상'] as const;

export type Step = 0 | 1 | 2;

export type TeamNum = 1 | 2;

export const getGameFormDefaults = (leagueId: number): Partial<GameFormType> => ({
  leagueId,
  name: '',
  round: undefined as unknown as number,
  quarter: 'PRE_GAME',
  state: 'SCHEDULED',
  startTime: '',
  videoId: '',
  thirdPlaceMatch: false,
  team1: { teamId: 0, leagueTeamId: 0, lineupPlayers: [] },
  team2: { teamId: 0, leagueTeamId: 0, lineupPlayers: [] },
});
