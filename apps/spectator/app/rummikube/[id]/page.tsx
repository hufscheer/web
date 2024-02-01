'use client';

import { useRef, useState } from 'react';
import { MatchCommentType } from '@/types/match';

import AsyncBoundary from '@/components/common/AsyncBoundary';
import Loader from '@/components/common/Loader';
import CommentForm from '@/components/match/CommentForm';
import CommentList from '@/components/match/CommentList';
import Lineup from '@/components/match/LineupList';
import Panel from '@/components/match/Panel';
import RecordList from '@/components/match/RecordList';
import Video from '@/components/match/Video';
import Cheer from '@/components/rummikub/Cheer';
import RummiKubMatchBanner from '@/components/rummikub/MatchBanner';
import useSocket from '@/hooks/useSocket';
import MatchByIdFetcher from '@/queries/useMatchById/Fetcher';
import MatchCheerByIdFetcher from '@/queries/useMatchCheerById/Fetcher';
import MatchCommentFetcher from '@/queries/useMatchCommentById/Fetcher';
import MatchLineupFetcher from '@/queries/useMatchLineupById/Fetcher';
import MatchTimelineFetcher from '@/queries/useMatchTimelineById/Fetcher';
import MatchVideoFetcher from '@/queries/useMatchVideoById/Fetcher';
import useSaveCommentMutation from '@/queries/useSaveCommentMutation/query';

import * as styles from './page.css';

export default function Rummikute({ params }: { params: { id: string } }) {
  const [comments, setComments] = useState<MatchCommentType[]>([]);

  const handleSocketMessage = (comment: MatchCommentType) => {
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
        errorFallback={props => (
          <RummiKubMatchBanner.ErrorFallback {...props} />
        )}
        loadingFallback={<RummiKubMatchBanner.Skeleton />}
      >
        <MatchByIdFetcher matchId={params.id}>
          {data => <RummiKubMatchBanner {...data} />}
        </MatchByIdFetcher>
      </AsyncBoundary>

      <AsyncBoundary
        errorFallback={props => <Cheer.ErrorFallback {...props} />}
        loadingFallback={<Loader />}
      >
        <MatchCheerByIdFetcher matchId={params.id}>
          {({ cheers, matchTeams }) => (
            <Cheer
              matchId={params.id}
              cheers={cheers}
              matchTeams={matchTeams}
            />
          )}
        </MatchCheerByIdFetcher>
      </AsyncBoundary>
      <Panel options={options} defaultValue="라인업">
        {({ selected }) => (
          <>
            {selected === '라인업' && (
              <AsyncBoundary
                errorFallback={props => <Lineup.ErrorFallback {...props} />}
                loadingFallback={<Loader />}
              >
                <MatchLineupFetcher matchId={params.id}>
                  {([firstTeam, secondTeam]) => (
                    <div className={styles.lineupSection}>
                      <Lineup {...firstTeam} />
                      <Lineup {...secondTeam} />
                    </div>
                  )}
                </MatchLineupFetcher>
              </AsyncBoundary>
            )}
            {selected === '타임라인' && (
              <AsyncBoundary
                errorFallback={props => <RecordList.ErrorFallback {...props} />}
                loadingFallback={<Loader />}
              >
                <MatchTimelineFetcher matchId={params.id}>
                  {([firstHalf, secondHalf]) => (
                    <div className={styles.timelineSection}>
                      <RecordList {...firstHalf} />
                      <RecordList {...secondHalf} />
                    </div>
                  )}
                </MatchTimelineFetcher>
              </AsyncBoundary>
            )}
            {selected === '응원댓글' && (
              <AsyncBoundary
                errorFallback={props => (
                  <CommentList.ErrorFallback {...props} />
                )}
                loadingFallback={<Loader />}
              >
                <MatchCommentFetcher matchId={params.id}>
                  {({ commentList, matchTeams, ...data }) => (
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
                        matchTeams={matchTeams}
                        matchId={params.id}
                        mutate={mutate}
                        scrollToBottom={scrollToBottom}
                      />
                    </div>
                  )}
                </MatchCommentFetcher>
              </AsyncBoundary>
            )}
            {selected === '경기영상' && (
              <AsyncBoundary
                errorFallback={props => <Video.ErrorFallback {...props} />}
                loadingFallback={<Loader />}
              >
                <MatchVideoFetcher matchId={params.id}>
                  {data => (
                    <div className={styles.videoSection}>
                      <Video {...data} />
                    </div>
                  )}
                </MatchVideoFetcher>
              </AsyncBoundary>
            )}
          </>
        )}
      </Panel>
    </section>
  );
}
