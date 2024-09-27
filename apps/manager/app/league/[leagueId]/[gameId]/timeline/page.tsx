'use client';
import { useGame, useTimeline, TimelineRecordType } from '@hcc/api';
import { Fragment } from 'react';

import Layout from '@/components/Layout';

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

  const lastRecord: TimelineRecordType | undefined =
    timelines?.[0]?.records?.[0] ?? undefined;

  return (
    <Layout
      navigationTitle="타임라인 수정"
      navigationMenu={<RecordDeleteMenu gameId={gameId} record={lastRecord} />}
    >
      <GameScoreBanner game={game} />

      <div className={styles.timeline}>
        {game.state === 'FINISHED' && (
          <>
            <TextRecord>경기가 종료되었습니다.</TextRecord>
            <TextRecord className={styles.summaryRecord}>
              경기 결과 - {game.gameTeams[0].score}:{game.gameTeams[1].score}
            </TextRecord>
          </>
        )}
        {timelines.map(timeline => {
          return (
            <Fragment key={timeline.gameQuarter}>
              {timeline.records.map(record => (
                <EventRecord
                  key={record.recordId}
                  record={record}
                  homeTeamId={homeTeamId}
                />
              ))}
              <TextRecord showDividerLine={true}>
                {timeline.gameQuarter}이 시작되었습니다.
              </TextRecord>
            </Fragment>
          );
        })}
      </div>

      <BottomMenu gameId={gameId} />
    </Layout>
  );
}
