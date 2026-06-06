import { useMemo } from 'react';

import useCheerTalkById from '../useCheerTalkById';
import { useGameCheerTalkSocket } from './useGameCheerTalkSocket';

export const useCheerTalkStream = (gameId: number) => {
  const { data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } =
    useCheerTalkById(gameId);
  const socketTalkList = useGameCheerTalkSocket(gameId);

  const cheerTalkList = useMemo(() => (data ? data.pages.flat() : []), [data]);

  return {
    cheerTalkList,
    socketTalkList,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  };
};
