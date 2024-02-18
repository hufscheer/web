import { InfiniteData } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { GameCheerTalkType, GameTeamType } from '@/types/game';

import useGameCheerTalkById from './query';

type GameCheerTalkFetcherProps = {
  gameId: string;
  children: ({
    gameTalkList,
    gameTeams,
    fetchNextPage,
    hasNextPage,
    isFetching,
  }: {
    gameTalkList: InfiniteData<GameCheerTalkType[]>;
    gameTeams: GameTeamType[];
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetching: boolean;
  }) => ReactNode;
};

export default function GameCheerTalkFetcher({
  gameId,
  children,
}: GameCheerTalkFetcherProps) {
  const {
    cheerTalkList,
    gameTeams,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGameCheerTalkById(gameId);

  if (error) throw error;

  return children({
    gameTalkList: cheerTalkList,
    gameTeams,
    fetchNextPage,
    hasNextPage,
    isFetching,
  });
}
