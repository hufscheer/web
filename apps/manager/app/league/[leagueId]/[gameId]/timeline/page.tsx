'use client';
import { TimelineRecordType, useGame, useTimeline } from '@hcc/api';
import { Fragment } from 'react';

import Layout from '@/components/Layout';
import { getProgressSemantics } from '@/constants/games';

import BottomMenu from './_components/BottomMenu';
import GameScoreBanner from './_components/GameScoreBanner';
import { EventRecord, TextRecord } from './_components/Record';
import RecordDeleteMenu from './_components/RecordDeleteMenu';
import * as styles from './page.css';

type PageProps = {
  params: { leagueId: string; gameId: string };
};

export default function Page({ params }: PageProps) {
  const gameId: string = params.gameId;

  const { data: game } = useGame(gameId);
  const { data: timelines } = useTimeline(gameId);

  if (!game || !timelines) return null;

  const homeTeamId: number = game.gameTeams[0].gameTeamId;

  const lastRecord: TimelineRecordType | undefined = timelines
    .flatMap(item => item.records)
    .sort((a, b) => b.recordId - a.recordId)[0];

  const currentQuarter: string | undefined = timelines[0]?.gameQuarter;

  return (
    <Layout
      navigationTitle="타임라인 수정"
      navigationMenu={<RecordDeleteMenu gameId={gameId} record={lastRecord} />}
    >
      <GameScoreBanner game={game} />

      <ul className={styles.timeline}>
        {game.state === 'FINISHED' && (
          <Fragment>
            <TextRecord>경기가 종료되었습니다.</TextRecord>
            <TextRecord className={styles.summaryRecord}>
              경기 결과 - {game.gameTeams[0].score}:{game.gameTeams[1].score}
              {game.isPkTaken &&
                ` (${game.gameTeams[0].pkScore}:${game.gameTeams[1].pkScore})`}
            </TextRecord>
          </Fragment>
        )}
        {timelines.map(timeline => {
          return (
            <Fragment key={timeline.gameQuarter}>
              {timeline.records.map(record => {
                if (record.type === 'GAME_PROGRESS') {
                  if (timeline.gameQuarter === '경기 종료') return null;
                  return (
                    <TextRecord key={record.recordId} showDividerLine={true}>
                      {timeline.gameQuarter}이(가)&nbsp;
                      {getProgressSemantics(
                        record.progressRecord.gameProgressType,
                      )}
                      되었습니다.
                    </TextRecord>
                  );
                }
                return (
                  <EventRecord
                    key={record.recordId}
                    record={record}
                    homeTeamId={homeTeamId}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </ul>

      <BottomMenu gameId={gameId} quarter={currentQuarter} />
    </Layout>
  );
}
