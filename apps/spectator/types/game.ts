export interface GameListType extends GameType {
  id: number;
}

export interface GameType {
  gameTeams: GameTeamType[];
  startTime: string;
  gameQuarter: string;
  gameName: string;
  sportsName: string;
}

export type GameTeamType = {
  gameTeamId: number;
  gameTeamName: string;
  logoImageUrl: string;
  score: number;
  order: number;
};

export type GameCheerType = {
  gameTeamId: number;
  cheerCount: number;
};

export type GameRecordsType = {
  scoredAt: number;
  playerName: string;
  teamName: string;
  score: number;
};

// TODO 추후 회의를 통해 Quarter 타입을 특정하고 유니온 타입으로 사용할 것
export type GameTimelineType = {
  gameQuarter: string;
  records: GameRecordsType[];
};

export type GameLineupType = {
  gameTeamId: number;
  teamName: string;
  gameTeamPlayers: GamePlayerType[];
  order: number;
};

export type GamePlayerType = {
  playerName: string;
  description: string;
};

export type GameCommentType = {
  commentId: number;
  content: string;
  gameTeamId: number;
  createdAt: string;
  isBlocked: boolean;
  order: number;
};

export type GameCommentPayload = Pick<
  GameCommentType,
  'gameTeamId' | 'content'
>;

export type GameVideoType = {
  videoId: string;
};

export type GameStatus = 'playing' | 'scheduled' | 'finished';
