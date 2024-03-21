export type GameInfoType = {
  sports: SportsType;
  startTime: string;
  gameName: string;
  state: gameStateType;
  videoId: string | null;
  gameQuarter: string;
};

export const gameState = {
  PLAYING: '진행중',
  SCHEDULED: '예정',
  FINISHED: '종료',
} as const;

export type gameStateType = keyof typeof gameState;

export type SportsQuarterType = {
  id: number;
  name: string;
};

export type SportsIdType = {
  sportsId: number;
};

export type SportsNameType = {
  sportsName: string;
};

export type SportsType = SportsIdType & SportsNameType;

export type PutMatchInfoPayload = Omit<GameInfoType, 'sports'> & SportsIdType;

export type MatchInfoStateType = Omit<GameInfoType, 'sports'> & SportsNameType;

export type GameCreatePayload = {
  sportsId: number;
  startTime: string;
  gameName: string;
  videoId: string | null;
  teamIds: number[];
  round: number;
};

export type GameInfo = {
  sports: SportsType;
  startTime: string;
  gameName: string;
  state: gameStateType;
  videoId: string;
  gameQuarter: string;
  round: number;
};

export type RecordType = 'SCORE' | 'REPLACEMENT';

type Snapshot = {
  teamName: string;
  score: number;
  teamImageUrl: string;
};

type CommonRecordType = {
  recordId: number;
  recordedAt: number;
  gameTeamId: number;
  playerName: string;
  teamName: string;
  teamImageUrl: string;
};

export type ScoreRecord = { score: number; snapshot: Snapshot[] };
export type ReplacementRecord = { replacedPlayerName: string };
export type GenericRecordType<T extends 'SCORE' | 'REPLACEMENT'> =
  CommonRecordType & {
    type: T;
    scoreRecord: T extends 'SCORE' ? ScoreRecord : null;
    replacementRecord: T extends 'REPLACEMENT' ? ReplacementRecord : null;
  };

export type GameRecordType =
  | GenericRecordType<'SCORE'>
  | GenericRecordType<'REPLACEMENT'>;

// TODO 추후 회의를 통해 Quarter 타입을 특정하고 유니온 타입으로 사용할 것
export type GameTimelineType = {
  gameQuarter: string;
  records: GameRecordType[];
};

export type GameTeamType = {
  gameTeamId: number;
  gameTeamName: string;
  logoImageUrl: string;
  score: number;
};

export interface GameType {
  gameTeams: GameTeamType[];
  startTime: string;
  gameQuarter: string;
  gameName: string;
  sportsName: string;
}

export interface GameListType extends GameType {
  id: number;
}

export type GameListParams = {
  league_id?: number;
  state: GameState;
  sport_id?: string;
  cursor?: string | number;
  size?: string;
  league_team_id?: string;
  round?: string;
};

export type GameState = 'playing' | 'scheduled' | 'finished';

export type GameLineupType = {
  id: number;
  name: string;
  description: string;
  number: number;
  isCaptain: boolean;
};

// timeline payload

type ScorePayload = {
  scoreLineupPlayerId: number;
  score: number;
};

type ReplacementPayload = {
  originLineupPlayerId: number;
  replacedLineupPlayerId: number;
};

export type CommonRecordPayload = {
  gameId: string;
  gameTeamId: number;
  recordedQuarterId: number;
  recordedAt: string;
};

export type LowerRecordType = Lowercase<RecordType>;
export type GenericRecordPayload<T extends LowerRecordType> =
  CommonRecordPayload &
    (T extends 'score' ? ScorePayload : null) &
    (T extends 'replacement' ? ReplacementPayload : null);
