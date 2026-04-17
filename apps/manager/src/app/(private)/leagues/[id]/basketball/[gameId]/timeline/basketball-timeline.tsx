'use client';

import { colors, Typography } from '@hcc/ui';
import { Fragment, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { useSuspenseGame, useSuspenseGameTimeline } from '~/api';

import { getProgressSemantics } from '../../../_components/timeline-tab/_utils';
import { TextRecord } from '../../../_components/timeline-tab/text-record';
import { BasketballEventRecord } from './basketball-event-record';

type Props = {
  gameId: number;
};

export const BasketballTimeline = ({ gameId }: Props) => {
  const { data: game } = useSuspenseGame({ gameId });
  const { data } = useSuspenseGameTimeline({ gameId });

  const visibleQuarters = data.filter((t) => t.gameQuarter.key !== 'PRE_GAME');
  const [activeQuarterKey, setActiveQuarterKey] = useState<string>(
    visibleQuarters[0]?.gameQuarter.key ?? '',
  );

  if (data.length === 0) {
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
  }

  const homeTeamId = game.gameTeams?.[0]?.gameTeamId;
  const activeTimeline = visibleQuarters.find((t) => t.gameQuarter.key === activeQuarterKey);

  // 쿼터별 점수 계산 (마지막 득점 이벤트의 snapshot 사용)
  const getQuarterScores = (quarterKey: string): [number, number] | null => {
    const quarter = data.find((t) => t.gameQuarter.key === quarterKey);
    if (!quarter) return null;

    let homeScore = 0;
    let awayScore = 0;
    for (const record of quarter.records) {
      if (record.type === 'SCORE') {
        const snap = record.scoreRecord?.snapshot;
        if (snap && snap.length >= 2) {
          homeScore = snap[0]?.score ?? homeScore;
          awayScore = snap[1]?.score ?? awayScore;
        }
      }
    }
    return [homeScore, awayScore];
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* 쿼터 탭 */}
      <div className="flex border-b border-neutral-100">
        {visibleQuarters.map((timeline) => {
          const isActive = timeline.gameQuarter.key === activeQuarterKey;
          const scores = getQuarterScores(timeline.gameQuarter.key);
          return (
            <button
              key={timeline.gameQuarter.key}
              type="button"
              className={twMerge(
                'flex flex-1 flex-col items-center gap-0.5 px-2 py-3 text-sm font-medium transition-colors',
                isActive
                  ? 'border-b-2 border-black text-black'
                  : 'border-b-2 border-transparent text-neutral-400',
              )}
              onClick={() => setActiveQuarterKey(timeline.gameQuarter.key)}
            >
              <span>{timeline.gameQuarter.label}</span>
              {scores && (
                <span className="text-xs text-neutral-400">
                  {scores[0]}-{scores[1]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 선택된 쿼터 이벤트 */}
      <div className="flex-1 overflow-y-auto bg-white py-5">
        {game.state === 'FINISHED' &&
          activeTimeline?.gameQuarter.key === visibleQuarters.at(-1)?.gameQuarter.key && (
            <Fragment>
              <TextRecord>경기가 종료되었습니다.</TextRecord>
              <TextRecord className="pt-0">
                경기 결과 - {game.gameTeams[0].score}:{game.gameTeams[1].score}
              </TextRecord>
            </Fragment>
          )}

        {!activeTimeline || activeTimeline.records.length === 0 ? (
          <Typography
            className="p-5 text-center"
            color={colors.neutral500}
            fontSize={14}
            weight="medium"
          >
            이 쿼터에 기록된 이벤트가 없습니다.
          </Typography>
        ) : (
          activeTimeline.records.map((record) => {
            if (record.type === 'GAME_PROGRESS') {
              if (activeTimeline.gameQuarter.key === 'POST_GAME') return null;
              return (
                <TextRecord key={record.recordId} showDividerLine>
                  {activeTimeline.gameQuarter.label}이(가)&nbsp;
                  {getProgressSemantics(record.progressRecord.gameProgressType)}
                  되었습니다.
                </TextRecord>
              );
            }
            if (
              record.type === 'SCORE' ||
              record.type === 'BASKETBALL_REPLACEMENT' ||
              record.type === 'WARNING_CARD' ||
              record.type === 'FOUL'
            ) {
              return (
                <BasketballEventRecord
                  key={record.recordId}
                  record={record}
                  homeTeamId={homeTeamId}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
};
