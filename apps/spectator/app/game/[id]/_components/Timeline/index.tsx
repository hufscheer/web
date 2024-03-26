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
    throw new NotFoundError(
      '경기가 시작한 뒤 시간 순으로 타임라인이 업데이트됩니다.',
    );

  return (
    <div className={styles.root}>
      {timelines.map(timeline => (
        <Quarter key={timeline.gameQuarter} {...timeline} />
      ))}
    </div>
  );
}
