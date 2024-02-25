'use client';

import { useState } from 'react';

import RummiKubGameBanner from '@/app/rummikube/[id]/_components/Banner';
import CheerTalkEntryButton from '@/components/cheertalk/EntryButton/CheerTalkEntryButton';
import CheerTalkModal from '@/components/cheertalk/Modal/CheerTalkModal';
import AsyncBoundary from '@/components/common/AsyncBoundary';
import Loader from '@/components/common/Loader';
import Lineup from '@/components/game/LineupList';
import Panel from '@/components/game/Panel';
import RecordList from '@/components/game/RecordList';
import Video from '@/components/game/Video';
import Cheer from '@/components/rummikub/Cheer';
import GameCheerByIdFetcher from '@/queries/useGameCheerById/Fetcher';
import GameLineupFetcher from '@/queries/useGameLineupById/Fetcher';
import GameTimelineFetcher from '@/queries/useGameTimelineById/Fetcher';
import GameVideoFetcher from '@/queries/useGameVideoById/Fetcher';

import * as styles from './page.css';

export default function Rummikube({ params }: { params: { id: string } }) {
  const [isCheerTalkModalOpen, setIsCheerTalkModalOpen] = useState(false);

  const options = [
    { label: '라인업' },
    { label: '응원댓글' },
    { label: '경기영상' },
    { label: '타임라인' },
  ];

  return (
    <>
      <section>
        <AsyncBoundary
          errorFallback={props => (
            <RummiKubGameBanner.ErrorFallback {...props} />
          )}
          loadingFallback={<RummiKubGameBanner.Skeleton />}
        >
          <RummiKubGameBanner gameId={params.id} />
        </AsyncBoundary>

        <AsyncBoundary
          errorFallback={props => <Cheer.ErrorFallback {...props} />}
          loadingFallback={<Loader />}
        >
          <GameCheerByIdFetcher gameId={params.id}>
            {({ cheers, gameTeams }) => (
              <Cheer gameId={params.id} cheers={cheers} gameTeams={gameTeams} />
            )}
          </GameCheerByIdFetcher>
        </AsyncBoundary>
        <Panel options={options} defaultValue="라인업">
          {({ selected }) => (
            <>
              {selected === '라인업' && (
                <AsyncBoundary
                  errorFallback={props => <Lineup.ErrorFallback {...props} />}
                  loadingFallback={<Loader />}
                >
                  <GameLineupFetcher gameId={params.id}>
                    {([firstTeam, secondTeam]) => (
                      <div className={styles.lineupSection}>
                        <Lineup {...firstTeam} />
                        <Lineup {...secondTeam} />
                      </div>
                    )}
                  </GameLineupFetcher>
                </AsyncBoundary>
              )}
              {selected === '타임라인' && (
                <AsyncBoundary
                  errorFallback={props => (
                    <RecordList.ErrorFallback {...props} />
                  )}
                  loadingFallback={<Loader />}
                >
                  <GameTimelineFetcher gameId={params.id}>
                    {([firstHalf, secondHalf]) => (
                      <div className={styles.timelineSection}>
                        <RecordList {...firstHalf} />
                        <RecordList {...secondHalf} />
                      </div>
                    )}
                  </GameTimelineFetcher>
                </AsyncBoundary>
              )}
              {selected === '응원댓글' && <></>}
              {selected === '경기영상' && (
                <AsyncBoundary
                  errorFallback={props => <Video.ErrorFallback {...props} />}
                  loadingFallback={<Loader />}
                >
                  <GameVideoFetcher gameId={params.id}>
                    {data => (
                      <div className={styles.videoSection}>
                        <Video {...data} />
                      </div>
                    )}
                  </GameVideoFetcher>
                </AsyncBoundary>
              )}
            </>
          )}
        </Panel>
        <CheerTalkEntryButton onClick={() => setIsCheerTalkModalOpen(true)} />
      </section>
      <CheerTalkModal
        isOpen={isCheerTalkModalOpen}
        onClose={() => setIsCheerTalkModalOpen(false)}
        gameId={params.id}
      />
    </>
  );
}
