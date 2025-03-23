import { NotFoundError, useGame, useTimeline } from '@hcc/api';
import { Spinner } from '@hcc/ui';
import { Fragment } from 'react';

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
    throw new NotFoundError('경기가 시작한 뒤 시간 순으로 타임라인이 업데이트됩니다.');

  const homeTeamId: number = game?.gameTeams[0].gameTeamId;

  return (
    <ul className={styles.root}>
      {game.state === 'FINISHED' && (
        <Fragment>
          <TextRecord>경기가 종료되었습니다.</TextRecord>
          <TextRecord className={styles.summaryRecord}>
            경기 결과 - {game.gameTeams[0].score}:{game.gameTeams[1].score}
            {game.isPkTaken && ` (${game.gameTeams[0].pkScore}:${game.gameTeams[1].pkScore})`}
          </TextRecord>
        </Fragment>
      )}
      {timelines.map((timeline) => {
        return (
          <Fragment key={timeline.gameQuarter}>
            {timeline.records.map((record) => {
              if (record.progressRecord?.gameProgressType) {
                if (timeline.gameQuarter === '경기 종료') return null;
                return (
                  <TextRecord key={record.recordId} showDividerLine={true}>
                    {timeline.gameQuarter}이(가)&nbsp;
                    {getProgressSemantics(record.progressRecord.gameProgressType)}
                    되었습니다.
                  </TextRecord>
                );
              }

              return <EventRecord key={record.recordId} record={record} homeTeamId={homeTeamId} />;
            })}
          </Fragment>
        );
      })}
    </ul>
  );
}
