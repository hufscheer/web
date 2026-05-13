'use client';

import { useSuspenseInfiniteGamesCheerTalkBlock } from '~/api/queries/useGamesCheerTalkBlock';
import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';
import { flattenCheerTalkPages } from '~/utils/cheer-talk';

type Props = { gameId: number; leagueId: number };

export const BlockedList = ({ gameId, leagueId }: Props) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteGamesCheerTalkBlock({ gameId, cursor: 0, size: 20 });
  const cheerTalks = flattenCheerTalkPages(data.pages).map((t) => ({ ...t, leagueId }));

  return (
    <CheerTalkList
      cheerTalks={cheerTalks}
      status="blocked"
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      onLoadMore={() => fetchNextPage()}
    />
  );
};
