'use client';

import { colors, Typography } from '@hcc/ui';
import { Fragment } from 'react';

import { useSuspenseGame, useSuspenseGameTimeline, type SportType } from '~/api';

import { getProgressSemantics } from './_utils';
import { EventRecord } from './event-record';
import { TextRecord } from './text-record';

type Props = {
  gameId: number;
  sportType: SportType;
};

export const TimelineTab = ({ gameId, sportType }: Props) => {
  const { data: game } = useSuspenseGame({ gameId });
  const { data } = useSuspenseGameTimeline({ gameId });

  if (data.length === 0)
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

  const homeTeamId: number = game.gameTeams[0].gameTeamId;

  return (
    <div className="bg-white py-5">
      {game.state === 'FINISHED' && (
        <Fragment>
          <TextRecord>경기가 종료되었습니다.</TextRecord>
          <TextRecord className="pt-0">
            경기 결과 - {game.gameTeams[0].score}:{game.gameTeams[1].score}
            {game.isPkTaken && ` (${game.gameTeams[0].pkScore}:${game.gameTeams[1].pkScore})`}
          </TextRecord>
        </Fragment>
      )}

      {data.map((timeline) => (
        <div key={timeline.gameQuarter.key}>
          <Fragment key={timeline.gameQuarter.key}>
            {timeline.records.map((record) => {
              if (record.progressRecord?.gameProgressType) {
                if (timeline.gameQuarter.key === 'POST_GAME') return null;

                return (
                  <TextRecord key={record.recordId} showDividerLine>
                    {timeline.gameQuarter.label}이(가)&nbsp;
                    {getProgressSemantics(record.progressRecord.gameProgressType)}
                    되었습니다.
                  </TextRecord>
                );
              }

              return (
                <EventRecord
                  key={record.recordId}
                  record={record}
                  homeTeamId={homeTeamId}
                  sportType={sportType}
                />
              );
            })}
          </Fragment>
        </div>
      ))}
    </div>
  );
};
