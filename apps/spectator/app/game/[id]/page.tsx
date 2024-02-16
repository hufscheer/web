'use client';

import { useRef, useState } from 'react';

import AsyncBoundary from '@/components/common/AsyncBoundary';
import Loader from '@/components/common/Loader';
import FconlineUserLineup from '@/components/fcOnline/UserInfo';
import GameBanner from '@/components/game/Banner';
import Cheer from '@/components/game/Cheer';
import CommentForm from '@/components/game/CommentForm';
import CommentList from '@/components/game/CommentList';
import Lineup from '@/components/game/LineupList';
import Panel from '@/components/game/Panel';
import RecordList from '@/components/game/RecordList';
import Video from '@/components/game/Video';
import useSocket from '@/hooks/useSocket';
import FconlineLineupFetcher from '@/queries/useFconlineLineupById/Fetcher';
import GameByIdFetcher from '@/queries/useGameById/Fetcher';
import GameCheerByIdFetcher from '@/queries/useGameCheerById/Fetcher';
import GameCommentFetcher from '@/queries/useGameCommentById/Fetcher';
import GameTimelineFetcher from '@/queries/useGameTimelineById/Fetcher';
import GameVideoFetcher from '@/queries/useGameVideoById/Fetcher';
import useSaveCommentMutation from '@/queries/useSaveCommentMutation/query';
import { GameCommentType } from '@/types/game';

import * as styles from './page.css';

export default function Game({ params }: { params: { id: string } }) {
  const [comments, setComments] = useState<GameCommentType[]>([]);

  const handleSocketMessage = (comment: GameCommentType) => {
    if (comment) {
      setComments(prev => [...prev, comment]);
    }
  };

  const { connect } = useSocket({
    url: 'wss://api.hufstreaming.site/ws',
    destination: `/topic/games/${params.id}`,
    callback: handleSocketMessage,
  });

  connect();

  const { mutate } = useSaveCommentMutation();
  const options = [
    { label: '라인업' },
    { label: '응원댓글' },
    { label: '경기영상' },
    { label: '타임라인' },
  ];

  const scrollRef = useRef(null);
  const scrollToBottom = () => {
    if (!scrollRef.current) return;

    (scrollRef.current as HTMLDivElement).scrollIntoView();
  };

  return (
    <section>
      <AsyncBoundary
        errorFallback={props => <GameBanner.ErrorFallback {...props} />}
        loadingFallback={<GameBanner.Skeleton />}
      >
        <GameByIdFetcher gameId={params.id}>
          {data => <GameBanner {...data} />}
        </GameByIdFetcher>
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
                <FconlineLineupFetcher gameId={params.id}>
                  {({ mergedUserInfo }) => (
                    <FconlineUserLineup userInfos={mergedUserInfo} />
                    // <div className="grid grid-cols-2 py-5 [&>*:first-child>ul]:before:absolute [&>*:first-child>ul]:before:right-0 [&>*:first-child>ul]:before:h-full [&>*:first-child>ul]:before:border-l-2 [&>*:first-child>ul]:before:bg-gray-2">
                    //   <Lineup {...firstTeam} />
                    //   <Lineup {...secondTeam} />
                    // </div>
                  )}
                </FconlineLineupFetcher>
              </AsyncBoundary>
            )}
            {selected === '타임라인' && (
              <AsyncBoundary
                errorFallback={props => <RecordList.ErrorFallback {...props} />}
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
            {selected === '응원댓글' && (
              <AsyncBoundary
                errorFallback={props => (
                  <CommentList.ErrorFallback {...props} />
                )}
                loadingFallback={<Loader />}
              >
                <GameCommentFetcher gameId={params.id}>
                  {({ commentList, gameTeams, ...data }) => (
                    <div className={styles.cheerTalkSection.div}>
                      <ul className={styles.cheerTalkSection.ul}>
                        <CommentList
                          commentList={commentList.pages.flat()}
                          scrollToBottom={scrollToBottom}
                          {...data}
                        />
                        <CommentList.SocketList commentList={comments} />
                        <li ref={scrollRef}></li>
                      </ul>
                      <CommentForm
                        gameTeams={gameTeams}
                        gameId={params.id}
                        mutate={mutate}
                        scrollToBottom={scrollToBottom}
                      />
                    </div>
                  )}
                </GameCommentFetcher>
              </AsyncBoundary>
            )}
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
    </section>
  );
}
