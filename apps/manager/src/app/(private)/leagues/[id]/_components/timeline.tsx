'use client';

import { colors, Typography } from '@hcc/ui';
import { Fragment } from 'react';

import { useSuspenseGame, useSuspenseGameTimeline } from '~/api';

import { getProgressSemantics } from './timeline-tab/_utils';
import { EventRecord } from './timeline-tab/event-record';
import { TextRecord } from './timeline-tab/text-record';
import { useTimelineDeleteMode } from './timeline-tab/timeline-delete-context';

type Props = {
  gameId: number;
};

export const Timeline = ({ gameId }: Props) => {
  const { isDeleteMode } = useTimelineDeleteMode();
  const { data: game } = useSuspenseGame({ gameId });
  const { data } = useSuspenseGameTimeline({ gameId });
  const { timelines } = data;
  if (timelines.length === 0)
    return (
      <Typography
        className="p-5 text-center"
        color={colors.neutral500}
        fontSize={14}
        weight="medium"
      >
        경기가 시작한 뒤 시간 순으로 타임라인이 업데이트됩니다.
      </Typography>
    );

  const homeTeamId: number = game.gameTeams?.[0]?.gameTeamId;

  return (
    <div className={isDeleteMode ? 'bg-white px-5 py-5' : 'bg-white py-5'}>
      {game.state === 'FINISHED' && (
        <Fragment>
          <TextRecord>경기가 종료되었습니다.</TextRecord>
          <TextRecord className="pt-0">
            경기 결과 - {game.gameTeams[0].score}:{game.gameTeams[1].score}
            {game.isPkTaken && ` (${game.gameTeams[0].pkScore}:${game.gameTeams[1].pkScore})`}
          </TextRecord>
        </Fragment>
      )}

      {timelines.map((timeline) => (
        <div key={timeline.gameQuarter.key}>
          <Fragment key={timeline.gameQuarter.key}>
            {timeline.records.map((record) => {
              if (record.progressRecord?.gameProgressType) {
                if (timeline.gameQuarter.key === 'POST_GAME') return null;

                return (
                  <TextRecord
                    key={record.recordId}
                    showDividerLine
                    deleteRecord={{ gameId, record }}
                  >
                    {timeline.gameQuarter.label}이(가)&nbsp;
                    {getProgressSemantics(record.progressRecord.gameProgressType)}
                    되었습니다.
                  </TextRecord>
                );
              }

              if (
                record.type !== 'SCORE' &&
                record.type !== 'SOCCER_REPLACEMENT' &&
                record.type !== 'PK' &&
                record.type !== 'WARNING_CARD'
              ) {
                return null;
              }

              return (
                <EventRecord
                  key={record.recordId}
                  record={record}
                  homeTeamId={homeTeamId}
                  gameId={gameId}
                />
              );
            })}
          </Fragment>
        </div>
      ))}
    </div>
  );
};
