'use client';

import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';
import { CheerTalkTabs as CheerTalkTabsBase } from '~/app/(private)/_components/cheertalk/cheertalk-tabs';

// TODO: useSuspenseLeagueCheerTalks로 교체 (API 추가 후)
const AllContent = ({ leagueId: _ }: { leagueId: number }) => {
  return <CheerTalkList cheerTalks={[]} status="all" />;
};

// TODO: useSuspenseLeagueCheerTalkReport로 교체 (API 추가 후)
const ReportedContent = ({ leagueId: _ }: { leagueId: number }) => {
  return <CheerTalkList cheerTalks={[]} status="reported" />;
};

type Props = { leagueId: number };

export const LeagueCheerTalkTabs = ({ leagueId }: Props) => (
  <CheerTalkTabsBase
    allContent={<AllContent leagueId={leagueId} />}
    reportedContent={<ReportedContent leagueId={leagueId} />}
  />
);
