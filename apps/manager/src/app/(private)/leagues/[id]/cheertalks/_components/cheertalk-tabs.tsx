'use client';

import { useSuspenseInfiniteLeagueCheerTalkReport } from '~/api/queries/useLeagueCheerTalkReport';
import { useSuspenseInfiniteLeagueCheerTalks } from '~/api/queries/useLeagueCheerTalks';
import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';
import { CheerTalkTabs as CheerTalkTabsBase } from '~/app/(private)/_components/cheertalk/cheertalk-tabs';

const AllContent = ({ leagueId }: { leagueId: number }) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteLeagueCheerTalks({ leagueId, cursor: 0, size: 10 });
  const cheerTalks = [...new Map(data.pages.flat().map((t) => [t.cheerTalkId, t])).values()].map(
    (t) => ({ ...t, leagueId }),
  );
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

const ReportedContent = ({ leagueId }: { leagueId: number }) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteLeagueCheerTalkReport({ leagueId, cursor: 0, size: 10 });
  const cheerTalks = [...new Map(data.pages.flat().map((t) => [t.cheerTalkId, t])).values()].map(
    (t) => ({ ...t, leagueId }),
  );
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

type Props = { leagueId: number };

export const LeagueCheerTalkTabs = ({ leagueId }: Props) => (
  <CheerTalkTabsBase
    allContent={<AllContent leagueId={leagueId} />}
    reportedContent={<ReportedContent leagueId={leagueId} />}
  />
);
