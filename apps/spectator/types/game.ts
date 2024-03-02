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

export type RecordType = 'SCORE' | 'REPLACEMENT';

type Snapshot = {
  teamName: string;
  score: number;
  teamImageUrl: string;
};

type CommonRecordType = {
  direction: 'left' | 'right';
  recordedAt: number;
  playerName: string;
  teamName: string;
  teamImageUrl: string;
};

export type ScoreRecordType = CommonRecordType & {
  type: 'SCORE';
  scoreRecord: {
    score: number;
    snapshot: Snapshot[];
  };
  replacementRecord: null;
};

export type ReplacementRecordType = CommonRecordType & {
  type: 'REPLACEMENT';
  replacementRecord: {
    replacedPlayerName: string;
  };
  scoreRecord: null;
};

export type GameRecordsType = ScoreRecordType | ReplacementRecordType;

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

export type GameCheerTalkType = {
  cheerTalkId: number;
  content: string;
  gameTeamId: number;
  createdAt: string;
  isBlocked: boolean;
  order: number;
};

export type GameCheerTalkPayload = Pick<
  GameCheerTalkType,
  'gameTeamId' | 'content'
>;

export type GameVideoType = {
  videoId: string;
};

export type GameStatus = 'playing' | 'scheduled' | 'finished';
