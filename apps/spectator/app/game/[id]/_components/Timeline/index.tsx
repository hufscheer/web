import { useTimelineById } from '@/queries/useTimelineById';
import { NotFoundError } from '@/services/errors';

import Quarter from './Quarter';
import * as styles from './Timeline.css';

type TimelineProps = {
  gameId: string;
};

export default function Timeline({ gameId }: TimelineProps) {
  const { data: timelines } = useTimelineById(gameId);

  if (timelines.length === 0)
    throw new NotFoundError('아직 타임라인이 등록되지 않았어요.', '4040');

  return (
    <div className={styles.root}>
      {timelines.map(timeline => (
        <Quarter key={timeline.gameQuarter} {...timeline} />
      ))}
    </div>
  );
}
