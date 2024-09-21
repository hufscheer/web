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
  gameProgressType: string;
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
  PROGRESS: 'PROGRESS',
} as const;

export type RecordType = (typeof RecordType)[keyof typeof RecordType];

export type TimelineRecordType =
  | (CommonTimelineRecordFields & {
      type: typeof RecordType.SCORE;
      scoreRecord: ScoreRecordType[];
      replacementRecord: undefined;
      progressRecord: undefined;
    })
  | (CommonTimelineRecordFields & {
      type: typeof RecordType.REPLACEMENT;
      scoreRecord: undefined;
      replacementRecord: ReplacementRecordType;
      progressRecord: undefined;
    })
  | (CommonTimelineRecordFields & {
      type: typeof RecordType.PROGRESS;
      scoreRecord: undefined;
      replacementRecord: undefined;
      progressRecord: ProgressRecordType;
    });

export type TimelineType = {
  gameQuarter: string;
  records: TimelineRecordType[];
};
