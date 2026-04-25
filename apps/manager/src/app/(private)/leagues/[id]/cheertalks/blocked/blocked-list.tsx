'use client';

import { useSuspenseInfiniteLeagueCheerTalkBlock } from '~/api/queries/useLeagueCheerTalkBlock';
import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';

type Props = { leagueId: number };

export const BlockedList = ({ leagueId }: Props) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteLeagueCheerTalkBlock({ leagueId, cursor: 0, size: 20 });
  const cheerTalks = [...new Map(data.pages.flat().map((t) => [t.cheerTalkId, t])).values()].map(
    (t) => ({ ...t, leagueId }),
  );

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
