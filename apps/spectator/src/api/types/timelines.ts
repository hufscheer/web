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
  REPLACEMENT: 'REPLACEMENT',
  BASKETBALL_REPLACEMENT: 'BASKETBALL_REPLACEMENT',
  PROGRESS: 'GAME_PROGRESS',
  PK: 'PK',
  WARNING_CARD: 'WARNING_CARD',
} as const;

export type PkRecordType = {
  pkRecordId: number;
  isSuccess: boolean;
};

export type WarningCardRecordType = {
  warningCardType: 'YELLOW' | 'RED';
};

export type TimelineRecordType =
  | (CommonTimelineRecordFields & {
      type: typeof RecordType.SCORE;
      scoreRecord: ScoreRecordType;
      replacementRecord: undefined;
      progressRecord: undefined;
      pkRecord: undefined;
      warningCardRecord: undefined;
    })
  | (CommonTimelineRecordFields & {
      type: typeof RecordType.REPLACEMENT;
      scoreRecord: undefined;
      replacementRecord: ReplacementRecordType;
      progressRecord: undefined;
      pkRecord: undefined;
      warningCardRecord: undefined;
    })
  | (CommonTimelineRecordFields & {
      type: typeof RecordType.BASKETBALL_REPLACEMENT;
      scoreRecord: undefined;
      replacementRecord: ReplacementRecordType;
      progressRecord: undefined;
      pkRecord: undefined;
      warningCardRecord: undefined;
    })
  | (CommonTimelineRecordFields & {
      type: typeof RecordType.PROGRESS;
      scoreRecord: undefined;
      replacementRecord: undefined;
      progressRecord: ProgressRecordType;
      pkRecord: undefined;
      warningCardRecord: undefined;
    })
  | (CommonTimelineRecordFields & {
      type: typeof RecordType.PK;
      scoreRecord: undefined;
      replacementRecord: undefined;
      progressRecord: undefined;
      pkRecord: PkRecordType;
      warningCardRecord: undefined;
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
  gameQuarter: GameQuarterType;
  records: TimelineRecordType[];
};
