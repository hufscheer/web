import { InfiniteData } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { MatchCommentType, MatchTeamType } from '@/types/match';

import useMatchCommentById from './query';

type MatchCommentFetcherProps = {
  matchId: string;
  children: ({
    commentList,
    matchTeams,
    fetchNextPage,
    hasNextPage,
    isFetching,
  }: {
    commentList: InfiniteData<MatchCommentType[]>;
    matchTeams: MatchTeamType[];
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetching: boolean;
  }) => ReactNode;
};

export default function MatchCommentFetcher({
  matchId,
  children,
}: MatchCommentFetcherProps) {
  const {
    commentList,
    matchTeams,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useMatchCommentById(matchId);

  if (error) throw error;

  return children({
    commentList,
    matchTeams,
    fetchNextPage,
    hasNextPage,
    isFetching,
  });
}
