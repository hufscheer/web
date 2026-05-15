'use client';

import { useSuspenseInfiniteCheerTalkBlock } from '~/api/queries/useCheerTalkBlock';
import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';

export const BlockedList = () => {
  const {
    data: cheerTalks,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteCheerTalkBlock({ cursor: 0, size: 10 });

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
