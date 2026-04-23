'use client';

import { useSuspenseInfiniteCheerTalkReport } from '~/api/queries/useCheerTalkReport';
import { useSuspenseInfiniteCheerTalks } from '~/api/queries/useCheerTalks';
import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';
import { CheerTalkTabs as CheerTalkTabsBase } from '~/app/(private)/_components/cheertalk/cheertalk-tabs';

const AllContent = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteCheerTalks({
    cursor: 0,
    size: 10,
  });
  const cheerTalks = [...new Map(data.pages.flat().map((t) => [t.cheerTalkId, t])).values()];
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
  const cheerTalks = [...new Map(data.pages.flat().map((t) => [t.cheerTalkId, t])).values()];
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
