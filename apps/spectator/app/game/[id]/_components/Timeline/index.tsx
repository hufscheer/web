import { useTimelineById } from '@/queries/useTimelineById';

import Quarter from './Quarter';
import * as styles from './Timeline.css';

type TimelineProps = {
  gameId: string;
};

export default function Timeline({ gameId }: TimelineProps) {
  const { data: timelines } = useTimelineById(gameId);

  return (
    <div className={styles.root}>
      {timelines.map(timeline => (
        <Quarter key={timeline.gameQuarter} {...timeline} />
      ))}
    </div>
  );
}
