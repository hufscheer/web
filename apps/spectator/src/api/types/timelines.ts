import type { GameQuarterType } from './games';

export const PROGRESS_TYPE = {
  GAME_START: 'GAME_START',
  QUARTER_START: 'QUARTER_START',
  QUARTER_END: 'QUARTER_END',
  GAME_END: 'GAME_END',
} as const;

export type ProgressType = (typeof PROGRESS_TYPE)[keyof typeof PROGRESS_TYPE];

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

export type WarningCardRecordType = {
  warningCardType: 'YELLOW' | 'RED';
};

export type OwnGoalRecordType = {
  ownGoalRecordId: number;
  score: number;
  snapshot: ScoreSnapshotType[];
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

type SoccerReplacementTimelineRecord = CommonTimelineRecordFields & {
  type: typeof RecordType.SOCCER_REPLACEMENT;
  scoreRecord: ScoreRecordType | null;
  replacementRecord: ReplacementRecordType;
  progressRecord: ProgressRecordType | null;
  pkRecord: PkRecordType | null;
  warningCardRecord: WarningCardRecordType | null;
  ownGoalRecord: OwnGoalRecordType | null;
};

type BasketballReplacementTimelineRecord = CommonTimelineRecordFields & {
  type: typeof RecordType.BASKETBALL_REPLACEMENT;
  scoreRecord: ScoreRecordType | null;
  replacementRecord: ReplacementRecordType;
  progressRecord: ProgressRecordType | null;
  pkRecord: PkRecordType | null;
  warningCardRecord: WarningCardRecordType | null;
  ownGoalRecord: OwnGoalRecordType | null;
};

type ProgressTimelineRecord = CommonTimelineRecordFields & {
  type: typeof RecordType.PROGRESS;
  scoreRecord: ScoreRecordType | null;
  replacementRecord: ReplacementRecordType | null;
  progressRecord: ProgressRecordType;
  pkRecord: PkRecordType | null;
  warningCardRecord: WarningCardRecordType | null;
  ownGoalRecord: OwnGoalRecordType | null;
};

type PkTimelineRecord = CommonTimelineRecordFields & {
  type: typeof RecordType.PK;
  scoreRecord: ScoreRecordType | null;
  replacementRecord: ReplacementRecordType | null;
  progressRecord: ProgressRecordType | null;
  pkRecord: PkRecordType;
  warningCardRecord: WarningCardRecordType | null;
  ownGoalRecord: OwnGoalRecordType | null;
};

type WarningCardTimelineRecord = CommonTimelineRecordFields & {
  type: typeof RecordType.WARNING_CARD;
  scoreRecord: ScoreRecordType | null;
  replacementRecord: ReplacementRecordType | null;
  progressRecord: ProgressRecordType | null;
  pkRecord: PkRecordType | null;
  warningCardRecord: WarningCardRecordType;
  ownGoalRecord: OwnGoalRecordType | null;
};

type FoulTimelineRecord = CommonTimelineRecordFields & {
  type: typeof RecordType.FOUL;
  scoreRecord: ScoreRecordType | null;
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

export type TimelineRecordType =
  | ScoreTimelineRecord
  | SoccerReplacementTimelineRecord
  | BasketballReplacementTimelineRecord
  | ProgressTimelineRecord
  | PkTimelineRecord
  | WarningCardTimelineRecord
  | FoulTimelineRecord
  | OwnGoalTimelineRecord;

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
  records: TimelineRecordType[];
};

export type TimelineResponseType = {
  winner: WinnerType | null;
  timelines: TimelineType[];
};
