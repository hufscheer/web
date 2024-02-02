export interface MatchListType extends MatchType {
  id: number;
}

export interface MatchType {
  gameTeams: MatchTeamType[];
  startTime: string;
  gameQuarter: string;
  gameName: string;
  sportsName: string;
}

export type MatchTeamType = {
  gameTeamId: number;
  gameTeamName: string;
  logoImageUrl: string;
  score: number;
  order: number;
};

export type MatchCheerType = {
  gameTeamId: number;
  cheerCount: number;
};

export type MatchRecordsType = {
  scoredAt: number;
  playerName: string;
  teamName: string;
  score: number;
};

// TODO 추후 회의를 통해 Quarter 타입을 특정하고 유니온 타입으로 사용할 것
export type MatchTimelineType = {
  gameQuarter: string;
  records: MatchRecordsType[];
};

export type MatchLineupType = {
  gameTeamId: number;
  teamName: string;
  gameTeamPlayers: MatchPlayerType[];
  order: number;
};

export type MatchPlayerType = {
  playerName: string;
  description: string;
};

export type MatchCommentType = {
  commentId: number;
  content: string;
  gameTeamId: number;
  createdAt: string;
  isBlocked: boolean;
  order: number;
};

export type MatchCommentPayload = Pick<
  MatchCommentType,
  'gameTeamId' | 'content'
>;

export type MatchVideoType = {
  videoId: string;
};

export type MatchStatus = 'playing' | 'scheduled' | 'finished';
