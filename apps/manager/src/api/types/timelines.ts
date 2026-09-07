import type { GameQuarterType } from './games';
import type { SportType } from './leagues';

export const PROGRESS_TYPE = {
  GAME_START: 'GAME_START',
  QUARTER_START: 'QUARTER_START',
  QUARTER_END: 'QUARTER_END',
  GAME_END: 'GAME_END',
} as const;

export type ProgressType = (typeof PROGRESS_TYPE)[keyof typeof PROGRESS_TYPE];

export const QUARTER_TYPE = {
  PRE_GAME: 'PRE_GAME',
  FIRST_HALF: 'FIRST_HALF',
  SECOND_HALF: 'SECOND_HALF',
  EXTRA_TIME: 'EXTRA_TIME',
  PENALTY_SHOOTOUT: 'PENALTY_SHOOTOUT',
  POST_GAME: 'POST_GAME',
  // basketball
  FIRST_QUARTER: 'FIRST_QUARTER',
  SECOND_QUARTER: 'SECOND_QUARTER',
  THIRD_QUARTER: 'THIRD_QUARTER',
  FOURTH_QUARTER: 'FOURTH_QUARTER',
  OVERTIME: 'OVERTIME',
};

export type QuarterType = (typeof QUARTER_TYPE)[keyof typeof QUARTER_TYPE];

export type ScoreType = {
  gameId?: number;
  recordedQuarter: QuarterType;
  recordedAt: number;
  gameTeamId: number;
  scoreLineupPlayerId: number;
  sportType: SportType;
  assistLineupPlayerId: number | null;
  isOwnGoal?: boolean | null;
  score?: number;
};

export type ReplacementType = {
  gameId?: number;
  sportType: SportType;
  recordedQuarter: QuarterType;
  recordedAt: number;
  gameTeamId: number;
  originLineupPlayerId: number;
  replacementLineupPlayerId: number;
  isFoulOut?: boolean;
};

export type ProgressStateType = {
  gameId?: number;
  sportType: SportType;
  recordedQuarter: QuarterType;
  recordedAt: number | null;
  gameProgressType: ProgressType;
};

export type ProgressAvailableAction = {
  quarter: QuarterType;
  gameProgressType: ProgressType;
  displayName: string;
};

export type ProgressAvailableActionsResponse = {
  availableActions: ProgressAvailableAction[];
};

export type PkType = {
  gameId: number;
  sportType: SportType;
  recordedQuarter: QuarterType;
  recordedAt: number;
  gameTeamId: number;
  scorerId: number;
  isSuccess: boolean;
};
export type FoulType = {
  gameId?: number;
  recordedQuarter: QuarterType;
  recordedAt: number;
  gameTeamId: number;
  offenderLineupPlayerId: number;
  sportType: SportType;
};

export const CARD_TYPE = {
  YELLOW: 'YELLOW',
  RED: 'RED',
};
export type CardType = (typeof CARD_TYPE)[keyof typeof CARD_TYPE];

export type WarningType = {
  gameId?: number;
  recordedQuarter: QuarterType;
  recordedAt: number;
  gameTeamId: number;
  warnedLineupPlayerId: number;
  cardType: CardType;
  sportType: SportType;
};

type ScoreSnapshotType = {
  teamName: string;
  teamImageUrl: string;
  score: number;
};

export type ScoreRecordType = {
  scoreRecordId: number;
  score: number;
  snapshot: ScoreSnapshotType[];
  assistPlayerName: string | null;
};

export type ReplacementRecordType = {
  replacementRecordId: number;
  replacedPlayerName: string;
  isFoulOut: boolean | null;
};

export type ProgressRecordType = {
  gameProgressType: ProgressType;
};

type CommonTimelineRecordFields = {
  recordId: number;
  recordedAt: number;
  playerName: string;
  gameTeamId: number;
  teamName: string;
  teamImageUrl: string;
  deletable?: boolean;
  undeletableReason?: string;
};

export const RecordType = {
  SCORE: 'SCORE',
  SOCCER_REPLACEMENT: 'SOCCER_REPLACEMENT',
  BASKETBALL_REPLACEMENT: 'BASKETBALL_REPLACEMENT',
  PROGRESS: 'GAME_PROGRESS',
  PK: 'PK',
  WARNING_CARD: 'WARNING_CARD',
  FOUL: 'FOUL',
  OWN_GOAL: 'OWN_GOAL',
} as const;

export type PkRecordType = {
  pkRecordId: number;
  isSuccess: boolean;
};
export type OwnGoalRecordType = {
  ownGoalRecordId: number;
};
export type WarningCardRecordType = {
  warningCardType: CardType;
};

type ScoreTimelineRecord = CommonTimelineRecordFields & {
  type: typeof RecordType.SCORE;
  scoreRecord: ScoreRecordType;
  replacementRecord: ReplacementRecordType | null;
  progressRecord: ProgressRecordType | null;
  pkRecord: PkRecordType | null;
  warningCardRecord: WarningCardRecordType | null;
  ownGoalRecord: OwnGoalRecordType | null;
};

type OwnGoalTimelineRecord = CommonTimelineRecordFields & {
  type: typeof RecordType.OWN_GOAL;
  scoreRecord: ScoreRecordType | null;
  replacementRecord: ReplacementRecordType | null;
  progressRecord: ProgressRecordType | null;
  pkRecord: PkRecordType | null;
  warningCardRecord: WarningCardRecordType | null;
  ownGoalRecord: OwnGoalRecordType;
};

type SoccerReplacementTimelineRecord = CommonTimelineRecordFields & {
  type: typeof RecordType.SOCCER_REPLACEMENT;
  scoreRecord: ScoreRecordType | null;
  replacementRecord: ReplacementRecordType;
  progressRecord: ProgressRecordType | null;
  pkRecord: PkRecordType | null;
  warningCardRecord: WarningCardRecordType | null;
};

type BasketballReplacementTimelineRecord = CommonTimelineRecordFields & {
  type: typeof RecordType.BASKETBALL_REPLACEMENT;
  scoreRecord: ScoreRecordType | null;
  replacementRecord: ReplacementRecordType;
  progressRecord: ProgressRecordType | null;
  pkRecord: PkRecordType | null;
  warningCardRecord: WarningCardRecordType | null;
};

type ProgressTimelineRecord = CommonTimelineRecordFields & {
  type: typeof RecordType.PROGRESS;
  scoreRecord: ScoreRecordType | null;
  replacementRecord: ReplacementRecordType | null;
  progressRecord: ProgressRecordType;
  pkRecord: PkRecordType | null;
  warningCardRecord: WarningCardRecordType | null;
};

type PkTimelineRecord = CommonTimelineRecordFields & {
  type: typeof RecordType.PK;
  scoreRecord: ScoreRecordType | null;
  replacementRecord: ReplacementRecordType | null;
  progressRecord: ProgressRecordType | null;
  pkRecord: PkRecordType;
  warningCardRecord: WarningCardRecordType | null;
};

type WarningCardTimelineRecord = CommonTimelineRecordFields & {
  type: typeof RecordType.WARNING_CARD;
  scoreRecord: ScoreRecordType | null;
  replacementRecord: ReplacementRecordType | null;
  progressRecord: ProgressRecordType | null;
  pkRecord: PkRecordType | null;
  warningCardRecord: WarningCardRecordType;
};

type FoulTimelineRecord = CommonTimelineRecordFields & {
  type: typeof RecordType.FOUL;
  scoreRecord: ScoreRecordType | null;
  replacementRecord: ReplacementRecordType | null;
  progressRecord: ProgressRecordType | null;
  pkRecord: PkRecordType | null;
  warningCardRecord: WarningCardRecordType | null;
};

type AnyTimelineRecord =
  | ScoreTimelineRecord
  | SoccerReplacementTimelineRecord
  | BasketballReplacementTimelineRecord
  | ProgressTimelineRecord
  | PkTimelineRecord
  | WarningCardTimelineRecord
  | FoulTimelineRecord
  | OwnGoalTimelineRecord;

export type TimelineRecord = AnyTimelineRecord;

type TimelineRecordEventType = AnyTimelineRecord['type'];

export type TimelineRecordByType<TType extends TimelineRecordEventType = TimelineRecordEventType> =
  Extract<AnyTimelineRecord, { type: TType }>;

type SoccerTimelineEventType =
  | typeof RecordType.SCORE
  | typeof RecordType.SOCCER_REPLACEMENT
  | typeof RecordType.PROGRESS
  | typeof RecordType.PK
  | typeof RecordType.WARNING_CARD
  | typeof RecordType.OWN_GOAL;

type BasketballTimelineEventType =
  | typeof RecordType.SCORE
  | typeof RecordType.BASKETBALL_REPLACEMENT
  | typeof RecordType.WARNING_CARD
  | typeof RecordType.FOUL;

export type TimelineRecordTypeBySport<TSport extends SportType> = TSport extends 'BASKETBALL'
  ? TimelineRecordByType<BasketballTimelineEventType>
  : TimelineRecordByType<SoccerTimelineEventType>;

export type TimelinePayload = {
  gameId: number;
};

export type WinnerType = {
  gameTeamId: number;
  teamName: string;
  teamImageUrl: string;
};

export type TimelineType = {
  gameQuarter: GameQuarterType;
  records: TimelineRecordTypeBySport<SportType>[];
};

export type TimelineResponseType = {
  winner: WinnerType | null;
  timelines: TimelineType[];
};
