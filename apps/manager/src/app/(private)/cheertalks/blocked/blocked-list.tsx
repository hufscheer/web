'use client';

import { useSuspenseInfiniteCheerTalkBlock } from '~/api/queries/useCheerTalkBlock';
import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';
import { flattenCheerTalkPages } from '~/utils/cheer-talk';

export const BlockedList = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteCheerTalkBlock({ cursor: 0, size: 10 });
  const cheerTalks = flattenCheerTalkPages(data.pages);

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
