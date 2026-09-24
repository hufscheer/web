'use client';

import {
  useSuspenseInfiniteCheerTalkReport,
  useSuspenseInfiniteCheerTalks,
} from '@hcc/manager-api';

import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';
import { CheerTalkTabs as CheerTalkTabsBase } from '~/app/(private)/_components/cheertalk/cheertalk-tabs';

const AllContent = () => {
  const {
    data: cheerTalks,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteCheerTalks({ cursor: 0, size: 10 });
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
  const {
    data: cheerTalks,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteCheerTalkReport({ cursor: 0, size: 10 });
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
