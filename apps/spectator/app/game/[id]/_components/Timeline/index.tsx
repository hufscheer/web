import { useGame, useTimeline } from '@hcc/api';
import { Spinner } from '@hcc/ui';
import { Fragment } from 'react';

import { NotFoundError } from '@/services/errors';

import EventRecord from './EventRecord';
import TextRecord from './TextRecord';
import * as styles from './Timeline.css';
import { getProgressSemantics } from './Timeline.utils';

type TimelineProps = {
  gameId: string;
};

export default function Timeline({ gameId }: TimelineProps) {
  const { data: game } = useGame(gameId);
  const { data: timelines } = useTimeline(gameId);

  if (!game || !timelines) return <Spinner />;

  // TODO FallBack
  if (!timelines) return <div>에러 메시지</div>;

  if (timelines.length === 0)
    throw new NotFoundError(
      '경기가 시작한 뒤 시간 순으로 타임라인이 업데이트됩니다.',
    );

  const homeTeamId: number = game?.gameTeams[0].gameTeamId;

  return (
    <Fragment>
      {timelines.map(timeline => {
        return (
          <ul key={timeline.gameQuarter} className={styles.root}>
            {timeline.records.map(record => {
              if (record.progressRecord?.gameProgressType)
                return (
                  <TextRecord key={record.recordId} showDividerLine={true}>
                    {timeline.gameQuarter}이(가)&nbsp;
                    {getProgressSemantics(
                      record.progressRecord.gameProgressType,
                    )}
                    되었습니다.
                  </TextRecord>
                );

              return (
                <EventRecord
                  key={record.recordId}
                  record={record}
                  homeTeamId={homeTeamId}
                />
              );
            })}
          </ul>
        );
      })}
    </Fragment>
  );
}
