import ReplacementTimeline from '@/app/game/[id]/_components/Timeline/Replacement';
import ScoreTimeline from '@/app/game/[id]/_components/Timeline/Score';
import { useTimelineById } from '@/queries/useTimelineById';

import * as styles from './Timeline.css';

type TimelineProps = {
  gameId: string;
};

export default function CheerTalkTimeline({ gameId }: TimelineProps) {
  const { data: timelines } = useTimelineById(gameId);

  if (timelines.length === 0) return null;

  const lastRecord = timelines[0].records[0];

  if (!lastRecord) return null;

  return (
    <div className={styles.wrapper}>
      {lastRecord.type === 'SCORE' && <ScoreTimeline {...lastRecord} />}
      {lastRecord.type === 'REPLACEMENT' && (
        <ReplacementTimeline {...lastRecord} />
      )}
    </div>
  );
}
