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
} as const;

export type PkRecordType = {
  pkRecordId: number;
  isSuccess: boolean;
};

export type TimelineRecordType =
  | (CommonTimelineRecordFields & {
      type: typeof RecordType.SCORE;
      scoreRecord: ScoreRecordType[];
      replacementRecord: undefined;
      progressRecord: undefined;
      pkRecord: undefined;
    })
  | (CommonTimelineRecordFields & {
      type: typeof RecordType.REPLACEMENT;
      scoreRecord: undefined;
      replacementRecord: ReplacementRecordType;
      progressRecord: undefined;
      pkRecord: undefined;
    })
  | (CommonTimelineRecordFields & {
      type: typeof RecordType.PROGRESS;
      scoreRecord: undefined;
      replacementRecord: undefined;
      progressRecord: ProgressRecordType;
      pkRecord: undefined;
    })
  | (CommonTimelineRecordFields & {
      type: typeof RecordType.PK;
      scoreRecord: undefined;
      replacementRecord: undefined;
      progressRecord: undefined;
      pkRecord: PkRecordType;
    });

export type TimelineType = {
  gameQuarter: string;
  records: TimelineRecordType[];
};

export type CommonCreateType = {
  recordedQuarterId: number;
  recordedAt: number;
};

export type ProgressCreateType = CommonCreateType & {
  gameProgressType: string;
};

export type ReplacementCreateType = CommonCreateType & {
  gameTeamId: number;
  originLineupPlayerId: number;
  replacementLineupPlayerId: number;
};

export type ScoreCreateType = CommonCreateType & {
  gameTeamId: number;
  scoreLineupPlayerId: number;
};

export type PkCreateType = CommonCreateType & {
  gameTeamId: number;
  scorerId: number;
  isSuccess: boolean;
};
