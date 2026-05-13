'use client';

import { useSuspenseInfiniteCheerTalkReport } from '~/api/queries/useCheerTalkReport';
import { useSuspenseInfiniteCheerTalks } from '~/api/queries/useCheerTalks';
import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';
import { CheerTalkTabs as CheerTalkTabsBase } from '~/app/(private)/_components/cheertalk/cheertalk-tabs';
import { flattenCheerTalkPages } from '~/utils/cheer-talk';

const AllContent = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteCheerTalks({
    cursor: 0,
    size: 10,
  });
  const cheerTalks = flattenCheerTalkPages(data.pages);
  return (
    <CheerTalkList
      cheerTalks={cheerTalks}
      status="all"
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      onLoadMore={() => fetchNextPage()}
    />
  );
};

const ReportedContent = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteCheerTalkReport({ cursor: 0, size: 10 });
  const cheerTalks = flattenCheerTalkPages(data.pages);
  return (
    <CheerTalkList
      cheerTalks={cheerTalks}
      status="reported"
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      onLoadMore={() => fetchNextPage()}
    />
  );
};

export const CheerTalkTabs = () => (
  <CheerTalkTabsBase allContent={<AllContent />} reportedContent={<ReportedContent />} />
);
