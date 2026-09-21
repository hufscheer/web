import type { GameTeamType } from '~/api';

import type { SportType } from './leagues';

const quarters = [
  { key: 'PRE_GAME', label: '경기전' },
  { key: 'FIRST_HALF', label: '전반전' },
  { key: 'SECOND_HALF', label: '후반전' },
  { key: 'EXTRA_TIME', label: '연장전' },
  { key: 'PENALTY_SHOOTOUT', label: '승부차기' },
  { key: 'POST_GAME', label: '종료' },
  { key: 'FIRST_QUARTER', label: '1쿼터' },
  { key: 'SECOND_QUARTER', label: '2쿼터' },
  { key: 'THIRD_QUARTER', label: '3쿼터' },
  { key: 'FOURTH_QUARTER', label: '4쿼터' },
  { key: 'OVERTIME', label: '연장전' },
] as const;

export type GameQuarterType = (typeof quarters)[number];

type GameData = {
  startTime: string;
  gameQuarter: GameQuarterType;
  gameName: string;
  round: number;
  thirdPlaceMatch: boolean;
  videoId: string;
  gameTeams: GameTeamType[];
  isPkTaken: boolean;
  leagueId: number;
  leagueName: string;
  state: GameStateType;
};

export type GameType = {
  gameId: number;
} & GameData;

export type GameStateType = 'SCHEDULED' | 'PLAYING' | 'FINISHED';

export type GameSearchPayload = {
  year: number;
  month: number;
};

export type GameListPayload = {
  league_id?: number;
  state?: GameStateType;
  cursor?: number;
  size?: number;
  league_team_id?: string;
  round?: number;
  third_place_match?: boolean;
};

export type GameListType = {
  id: number;
  gameState: GameStateType;
} & GameData;

export type GameListResponse = {
  leagueId: number;
  leagueName: string;
  leagueProgress: 'BEFORE_START' | 'IN_PROGRESS' | 'FINISHED';
  sportType: SportType;
  games: GameListType[];
};

export type GamesListPageResponse = {
  content: GameListResponse[];
  nextCursor: number | null;
  hasNext: boolean;
};

export type GameDetailPayload = { gameId: number };

export type GameCheerPayload = { gameId: number };

export type GameCheerType = {
  gameTeamId: number;
  cheerCount: number;
};

export type QuarterType =
  | 'FIRST_QUARTER'
  | 'SECOND_QUARTER'
  | 'THIRD_QUARTER'
  | 'FOURTH_QUARTER'
  | 'OVERTIME';

export type ScoreType = {
  gameTeamId: number;
  score: number;
};

export type GameQuarterScoresType = {
  quarter: QuarterType;
  displayName: string;
  scores: ScoreType[];
}[];

export type GameLineupPayload = { gameId: number };

export type GameTeamPlayerType = {
  id: number;
  playerName: string;
  description?: string;
  jerseyNumber: number;
  isCaptain: boolean;
  isReplaced: boolean;
  position?: string | null;
  replacedPlayer: Pick<GameTeamPlayerType, 'id' | 'jerseyNumber' | 'playerName'> | null;
  state: 'STARTER' | 'CANDIDATE';
};

export type GameLineupType = {
  gameTeamId: number;
  teamName: string;
  starterPlayers: GameTeamPlayerType[];
  candidatePlayers: GameTeamPlayerType[];
};

export type GameLineupPlayingType = {
  gameTeamId: number;
  teamName: string;
  teamColor: string;
  gameTeamPlayers: GameTeamPlayerType[];
};

export type GameVideoPayload = { gameId: number };

export type GameVideoType = {
  videoId: string;
};
