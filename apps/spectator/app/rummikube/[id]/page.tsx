'use client';

import { useRef, useState } from 'react';

import AsyncBoundary from '@/components/common/AsyncBoundary';
import Loader from '@/components/common/Loader';
import CommentForm from '@/components/game/CommentForm';
import CommentList from '@/components/game/CommentList';
import Lineup from '@/components/game/LineupList';
import Panel from '@/components/game/Panel';
import RecordList from '@/components/game/RecordList';
import Video from '@/components/game/Video';
import Cheer from '@/components/rummikub/Cheer';
import RummiKubGameBanner from '@/components/rummikub/GameBanner';
import useSocket from '@/hooks/useSocket';
import GameByIdFetcher from '@/queries/useGameById/Fetcher';
import GameCheerByIdFetcher from '@/queries/useGameCheerById/Fetcher';
import GameCommentFetcher from '@/queries/useGameCommentById/Fetcher';
import GameLineupFetcher from '@/queries/useGameLineupById/Fetcher';
import GameTimelineFetcher from '@/queries/useGameTimelineById/Fetcher';
import GameVideoFetcher from '@/queries/useGameVideoById/Fetcher';
import useSaveCommentMutation from '@/queries/useSaveCommentMutation/query';
import { GameCommentType } from '@/types/game';

import * as styles from './page.css';

export default function Rummikube({ params }: { params: { id: string } }) {
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
        errorFallback={props => <RummiKubGameBanner.ErrorFallback {...props} />}
        loadingFallback={<RummiKubGameBanner.Skeleton />}
      >
        <GameByIdFetcher gameId={params.id}>
          {data => <RummiKubGameBanner {...data} />}
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
                      <ul style={{ paddingBottom: '2rem' }}>
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
