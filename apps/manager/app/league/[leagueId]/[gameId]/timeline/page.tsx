'use client';
import {
  TimelineRecordType,
  TimelineType,
  useGame,
  useTimeline,
} from '@hcc/api';
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

  const sortedTimelines: TimelineType[] = timelines.map(timeline => ({
    ...timeline,
    records: timeline.records.sort((a, b) => b.recordId - a.recordId),
  }));
  const lastRecord: TimelineRecordType | undefined =
    sortedTimelines?.[0]?.records?.[0] ?? undefined;

  const currentQuarter = sortedTimelines[0]?.gameQuarter ?? undefined;

  return (
    <Layout
      navigationTitle="타임라인 수정"
      navigationMenu={<RecordDeleteMenu gameId={gameId} record={lastRecord} />}
    >
      <GameScoreBanner game={game} />

      <div className={styles.timeline}>
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
        {sortedTimelines.map(timeline => {
          return (
            <Fragment key={timeline.gameQuarter}>
              {timeline.records.map(record => {
                if (record.type === 'GAME_PROGRESS') {
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
      </div>

      <BottomMenu gameId={gameId} quarter={currentQuarter} />
    </Layout>
  );
}
