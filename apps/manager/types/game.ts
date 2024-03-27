import { Optional } from './utils';

export type GameInfoType = {
  sports: SportsType;
  startTime: string;
  gameName: string;
  state: StateType;
  videoId: string | null;
  gameQuarter: string;
  round: number;
};

export const stateMap = {
  playing: '진행 중',
  scheduled: '예정',
  finished: '종료',
} as const;

export type StateType = keyof typeof stateMap;

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

export type GameUpdatePayload = {
  sportsId: number;
  startTime: string;
  gameName: string;
  videoId: string | null;
  gameQuarter: string;
  state: StateType;
  round: number;
};

export type GameInfo = {
  sports: SportsType;
  startTime: string;
  gameName: string;
  state: StateType;
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
  state: StateType;
  sport_id?: string;
  cursor?: string | number;
  size?: string;
  league_team_id?: string;
  round?: string;
};

export type GameLineupType = {
  id: number;
  name: string;
  description: string | null;
  number: number | null;
  isCaptain: boolean;
  leagueTeamPlayerId: number;
};

export type OptionalLineup = Optional<GameLineupType, 'id'>;

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

export type GameTimelineRecord = TimelineRecordType & {
  recordInfo: {
    game: number;
    gameTeam: {
      gameTeamId: number;
      gameTeamName: string;
    };
    recordType: RecordType;
    recordedAt: number;
    recordedQuarter: SportsQuarterType;
  };
};

export type TimelineRecordType =
  | GeneralTimelineRecordType<'SCORE'>
  | GeneralTimelineRecordType<'REPLACEMENT'>;

export type GeneralTimelineRecordType<T extends 'SCORE' | 'REPLACEMENT'> = {
  score: T extends 'SCORE' ? number : null;
  lineupPlayer: T extends 'SCORE'
    ? { id: number; name: string; number: number }
    : null;
  originLineupPlayer: T extends 'REPLACEMENT'
    ? { id: number; name: string; number: number }
    : null;
  replacedLineupPlayer: T extends 'REPLACEMENT'
    ? { id: number; name: string; number: number }
    : null;
};

export type LowerRecordType = Lowercase<RecordType>;
export type GenericRecordPayload<T extends LowerRecordType> =
  CommonRecordPayload &
    (T extends 'score' ? ScorePayload : null) &
    (T extends 'replacement' ? ReplacementPayload : null);
