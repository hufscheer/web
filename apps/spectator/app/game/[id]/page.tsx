'use client';

import { useState } from 'react';

import CheerTalkEntryButton from '@/components/cheertalk/EntryButton/CheerTalkEntryButton';
import CheerTalkModal from '@/components/cheertalk/Modal/CheerTalkModal';
import AsyncBoundary from '@/components/common/AsyncBoundary';
import Loader from '@/components/common/Loader';
import Cheer from '@/components/game/Cheer';
import Panel from '@/components/game/Panel';
import RecordList from '@/components/game/RecordList';
import Video from '@/components/game/Video';
import GameCheerByIdFetcher from '@/queries/useGameCheerById/Fetcher';

import Banner from './_components/Banner';
import BannerFallback from './_components/Banner/Error';
import BannerSkeleton from './_components/Banner/Skeleton';
import Lineup from './_components/Lineup';
import LineupFallback from './_components/Lineup/Error';
import LineupSkeleton from './_components/Lineup/Skeleton';
// import * as styles from './page.css';

export default function Game({ params }: { params: { id: string } }) {
  const [isCheerTalkModalOpen, setIsCheerTalkModalOpen] = useState(false);

  const options = [
    { label: '라인업' },
    { label: '타임라인' },
    { label: '경기영상' },
  ];

  return (
    <>
      <section>
        <AsyncBoundary
          errorFallback={() => <BannerFallback />}
          loadingFallback={<BannerSkeleton />}
        >
          <Banner gameId={params.id} />
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
                  errorFallback={props => <LineupFallback {...props} />}
                  loadingFallback={<LineupSkeleton />}
                >
                  <Lineup gameId={params.id} />
                </AsyncBoundary>
              )}
              {selected === '타임라인' && (
                <AsyncBoundary
                  errorFallback={props => (
                    <RecordList.ErrorFallback {...props} />
                  )}
                  loadingFallback={<Loader />}
                >
                  <div></div>
                  {/* <GameTimelineFetcher gameId={params.id}>
                    {([firstHalf, secondHalf]) => (
                      <div className={styles.timelineSection}>
                        <RecordList {...firstHalf} />
                        <RecordList {...secondHalf} />
                      </div>
                    )}
                  </GameTimelineFetcher> */}
                </AsyncBoundary>
              )}
              {selected === '경기영상' && (
                <AsyncBoundary
                  errorFallback={props => <Video.ErrorFallback {...props} />}
                  loadingFallback={<Loader />}
                >
                  <div></div>
                  {/* <GameVideoFetcher gameId={params.id}>
                    {data => (
                      <div className={styles.videoSection}>
                        <Video {...data} />
                      </div>
                    )}
                  </GameVideoFetcher> */}
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
