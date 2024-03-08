import ReplacementTimeline from '@/app/game/[id]/_components/Timeline/Replacement';
import ScoreTimeline from '@/app/game/[id]/_components/Timeline/Score';
import { useTimelineById } from '@/queries/useTimelineById';
import { GameRecordType, GameTimelineType } from '@/types/game';

import * as styles from './Timeline.css';

type TimelineProps = {
  gameId: string;
};

const getLastRecord = (gameData: GameTimelineType[]): GameRecordType | null => {
  const lastQuarterWithRecords = [...gameData]
    .reverse()
    .find(quarter => quarter.records.length > 0);
  return lastQuarterWithRecords
    ? lastQuarterWithRecords.records[lastQuarterWithRecords.records.length - 1]
    : null;
};

export default function CheerTalkTimeline({ gameId }: TimelineProps) {
  const { data: timelines } = useTimelineById(gameId);

  const record = getLastRecord(timelines);

  if (!record) return null;

  return (
    <div className={styles.wrapper}>
      {record.type === 'SCORE' ? (
        <ScoreTimeline key={record.recordedAt} {...record} />
      ) : (
        <ReplacementTimeline key={record.recordedAt} {...record} />
      )}
    </div>
  );
}
