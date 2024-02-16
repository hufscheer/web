import { InfiniteData } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { GameCommentType, GameTeamType } from '@/types/game';

import useGameCommentById from './query';

type GameCommentFetcherProps = {
  gameId: string;
  children: ({
    commentList,
    gameTeams,
    fetchNextPage,
    hasNextPage,
    isFetching,
  }: {
    commentList: InfiniteData<GameCommentType[]>;
    gameTeams: GameTeamType[];
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetching: boolean;
  }) => ReactNode;
};

export default function GameCommentFetcher({
  gameId,
  children,
}: GameCommentFetcherProps) {
  const {
    commentList,
    gameTeams,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGameCommentById(gameId);

  if (error) throw error;

  return children({
    commentList,
    gameTeams,
    fetchNextPage,
    hasNextPage,
    isFetching,
  });
}
