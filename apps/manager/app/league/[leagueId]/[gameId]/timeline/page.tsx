'use client';
import { useTimeline } from '@hcc/api';
import { Fragment } from 'react';

import { TextRecord } from '@/app/league/[leagueId]/[gameId]/timeline/_components/Record';
import Layout from '@/components/Layout';

import GameScoreBanner from './_components/GameScoreBanner';
import TimelineMenu from './_components/TimelineMenu';
import * as styles from './page.css';

type PageProps = {
  params: { leagueId: string; gameId: string };
};

export default function Page({ params }: PageProps) {
  const gameId: string = params.gameId;

  const { data: timelines } = useTimeline(gameId);

  if (!timelines) return null;

  return (
    <Layout navigationTitle="타임라인 수정">
      <GameScoreBanner gameId={gameId} />
      <div className={styles.timeline}>
        {timelines.map(timeline => {
          return (
            <Fragment key={timeline.gameQuarter}>
              <TextRecord showDividerLine={true}>
                {timeline.gameQuarter}이 시작되었습니다.
              </TextRecord>

              {timeline.records.map(record => (
                <div key={record.recordId}>{record.playerName}</div>
              ))}
            </Fragment>
          );
        })}
      </div>
      <TimelineMenu />
    </Layout>
  );
}
