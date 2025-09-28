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
};

export type QuarterType = (typeof QUARTER_TYPE)[keyof typeof QUARTER_TYPE];

export type ScoreType = {
  gameId?: number;
  recordedQuarter: QuarterType;
  recordedAt: number;
  gameTeamId: number;
  scoreLineupPlayerId: number;
};

export type ReplacementType = {
  gameId?: number;
  recordedQuarter: QuarterType;
  recordedAt: number;
  gameTeamId: number;
  originLineupPlayerId: number;
  replacementLineupPlayerId: number;
};

export type ProgressStateType = {
  gameId?: number;
  recordedQuarter: QuarterType;
  recordedAt: number;
  gameProgressType: ProgressType;
};

export type PkType = {
  recordedQuarter: QuarterType;
  recordedAt: number;
  gameTeamId: number;
  scorerId: number;
  isSuccess: boolean;
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
};

export type ReplacementRecordType = {
  replacementRecordId: number;
  replacedPlayerName: string;
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
  REPLACEMENT: 'REPLACEMENT',
  PROGRESS: 'GAME_PROGRESS',
  PK: 'PK',
  WARNING_CARD: 'WARNING_CARD',
} as const;

export type PkRecordType = {
  pkRecordId: number;
  isSuccess: boolean;
};
export type WarningCardRecordType = {
  warningCardType: CardType;
};

export type TimelineRecordType =
  | (CommonTimelineRecordFields & {
      type: typeof RecordType.SCORE;
      scoreRecord: ScoreRecordType[];
      replacementRecord: undefined;
      progressRecord: undefined;
      pkRecord: undefined;
      warningCardRecord?: WarningCardRecordType;
    })
  | (CommonTimelineRecordFields & {
      type: typeof RecordType.REPLACEMENT;
      scoreRecord: undefined;
      replacementRecord: ReplacementRecordType;
      progressRecord: undefined;
      pkRecord: undefined;
      warningCardRecord?: WarningCardRecordType;
    })
  | (CommonTimelineRecordFields & {
      type: typeof RecordType.PROGRESS;
      scoreRecord: undefined;
      replacementRecord: undefined;
      progressRecord: ProgressRecordType;
      pkRecord: undefined;
      warningCardRecord?: WarningCardRecordType;
    })
  | (CommonTimelineRecordFields & {
      type: typeof RecordType.PK;
      scoreRecord: undefined;
      replacementRecord: undefined;
      progressRecord: undefined;
      pkRecord: PkRecordType;
      warningCardRecord?: WarningCardRecordType;
    })
  | (CommonTimelineRecordFields & {
      type: typeof RecordType.WARNING_CARD;
      scoreRecord: undefined;
      replacementRecord: undefined;
      progressRecord: undefined;
      pkRecord: undefined;
      warningCardRecord: WarningCardRecordType;
    });

export type TimelinePayload = {
  gameId: number;
};

export type TimelineType = {
  gameQuarter: string;
  records: TimelineRecordType[];
};
