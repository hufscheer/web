'use client';
import { useGame, useTimeline } from '@hcc/api';
import { Fragment } from 'react';

import {
  EventRecord,
  TextRecord,
} from '@/app/league/[leagueId]/[gameId]/timeline/_components/Record';
import Layout from '@/components/Layout';

import GameScoreBanner from './_components/GameScoreBanner';
import TimelineMenu from './_components/TimelineMenu';
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

  return (
    <Layout navigationTitle="타임라인 수정">
      <GameScoreBanner game={game} />
      <div className={styles.timeline}>
        {timelines.map(timeline => {
          return (
            <Fragment key={timeline.gameQuarter}>
              <TextRecord showDividerLine={true}>
                {timeline.gameQuarter}이 시작되었습니다.
              </TextRecord>

              {timeline.records.map(record => (
                <EventRecord
                  key={record.recordId}
                  record={record}
                  homeTeamId={homeTeamId}
                />
              ))}
            </Fragment>
          );
        })}
        {game.state === 'FINISHED' && (
          <>
            <TextRecord>경기가 종료되었습니다.</TextRecord>
            <TextRecord>
              경기 결과 - {game.gameTeams[0].score}:{game.gameTeams[1].score}
            </TextRecord>
          </>
        )}
      </div>
      <TimelineMenu />
    </Layout>
  );
}
