'use client';

import { useSuspenseInfiniteCheerTalkBlock } from '~/api/queries/useCheerTalkBlock';
import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';

export const BlockedList = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteCheerTalkBlock({ cursor: 0, size: 10 });
  const cheerTalks = [
    ...new Map(data.pages.flatMap((p) => p.content).map((t) => [t.cheerTalkId, t])).values(),
  ];

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
