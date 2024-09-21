'use client';
import { useTimeline } from '@hcc/api';

import Layout from '@/components/Layout';

import GameScoreBanner from './_components/GameScoreBanner';
import TimelineController from './_components/TimelineController';

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

      <div style={{ flex: '1', height: '100%', overflowY: 'auto' }}>
        {timelines.map(timeline => {
          return (
            <>
              {timeline.gameQuarter}
              {timeline.records.map(record => {
                return (
                  <p key={record.recordId}>
                    {record.playerName}({record.teamName})
                  </p>
                );
              })}
            </>
          );
        })}
      </div>

      <TimelineController />
    </Layout>
  );
}
