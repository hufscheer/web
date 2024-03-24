import { GAME_STATE } from '@/constants/configs';

export interface GameListType extends GameType {
  id: number;
}

export type GameListParams = {
  league_id?: string;
  state: GameState;
  sport_id?: string;
  cursor?: string | number;
  size?: string;
  league_team_id?: string;
  round?: string;
};

export interface GameType {
  gameTeams: GameTeamType[];
  startTime: string;
  gameQuarter: string;
  gameName: string;
  sportsName: string;
  videoId?: string;
  state: GameState;
}

export type GameTeamType = {
  gameTeamId: number;
  gameTeamName: string;
  logoImageUrl: string;
  score: number;
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

export type TeamDirection = 'left' | 'right';

type CommonRecordType = {
  direction: TeamDirection;
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

export type GameLineupType = {
  gameTeamId: number;
  teamName: string;
  gameTeamPlayers: GamePlayerType[];
};

export type GamePlayerType = {
  playerName: string;
  description: string;
  number: number;
  isCaptain: boolean;
};

export type GameCheerTalkType = {
  cheerTalkId: number;
  content: string;
  gameTeamId: number;
  createdAt: string;
  isBlocked: boolean;
};

export type GameCheerTalkWithTeamInfo = GameCheerTalkType & {
  direction: TeamDirection;
  logoImageUrl: string;
};

export type GameCheerTalkPayload = Pick<
  GameCheerTalkType,
  'gameTeamId' | 'content'
>;

export type GameVideoType = {
  videoId: string;
};

export type GameState = (typeof GAME_STATE)[keyof typeof GAME_STATE];
