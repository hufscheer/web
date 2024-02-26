'use client';

import { useState } from 'react';

import Live from '@/app/_components/Live';
import CheerTalkEntryButton from '@/components/cheertalk/EntryButton/CheerTalkEntryButton';
import CheerTalkModal from '@/components/cheertalk/Modal/CheerTalkModal';
import AsyncBoundary from '@/components/common/AsyncBoundary';
import Loader from '@/components/common/Loader';
import Cheer from '@/components/game/Cheer';
import Lineup from '@/components/game/LineupList';
import Panel from '@/components/game/Panel';
import RecordList from '@/components/game/RecordList';
import Video from '@/components/game/Video';
import GameCheerByIdFetcher from '@/queries/useGameCheerById/Fetcher';

import Banner from './_components/Banner';
import BannerFallback from './_components/Banner/Error';
import BannerSkeleton from './_components/Banner/Skeleton';
import CheerTalkInReal from './_components/CheerTalk/OnAir';
import * as styles from './page.css';

export default function Game({ params }: { params: { id: string } }) {
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

        <section className={styles.cheerTalk.section}>
          <div className={styles.cheerTalk.header}>
            <h2 className={styles.cheerTalk.title}>실시간 응원톡</h2>
            <Live />
          </div>

          <AsyncBoundary
            errorFallback={() => <div>에러</div>}
            loadingFallback={<div>로딩</div>}
          >
            <CheerTalkInReal gameId={params.id} />
          </AsyncBoundary>
        </section>

        <Panel options={options} defaultValue="라인업">
          {({ selected }) => (
            <>
              {selected === '라인업' && (
                <AsyncBoundary
                  errorFallback={props => <Lineup.ErrorFallback {...props} />}
                  loadingFallback={<Loader />}
                >
                  <div></div>
                  {/* <FconlineLineupFetcher gameId={params.id}>
                    {({ mergedUserInfo }) => (
                      <FconlineUserLineup userInfos={mergedUserInfo} />
                      // <div className="grid grid-cols-2 py-5 [&>*:first-child>ul]:before:absolute [&>*:first-child>ul]:before:right-0 [&>*:first-child>ul]:before:h-full [&>*:first-child>ul]:before:border-l-2 [&>*:first-child>ul]:before:bg-gray-2">
                      //   <Lineup {...firstTeam} />
                      //   <Lineup {...secondTeam} />
                      // </div>
                    )}
                  </FconlineLineupFetcher> */}
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
              {selected === '응원댓글' && <></>}
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
