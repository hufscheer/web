'use client';

import { useSuspenseLeagueCheerTalkReport } from '~/api/queries/useLeagueCheerTalkReport';
import { useSuspenseLeagueCheerTalks } from '~/api/queries/useLeagueCheerTalks';
import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';
import { CheerTalkTabs as CheerTalkTabsBase } from '~/app/(private)/_components/cheertalk/cheertalk-tabs';

const AllContent = ({ leagueId }: { leagueId: number }) => {
  const { data } = useSuspenseLeagueCheerTalks({ leagueId, cursor: 1, size: 20 });
  return <CheerTalkList cheerTalks={data} status="all" />;
};

const ReportedContent = ({ leagueId }: { leagueId: number }) => {
  const { data } = useSuspenseLeagueCheerTalkReport({ leagueId, cursor: 1, size: 20 });
  return <CheerTalkList cheerTalks={data} status="reported" />;
};

type Props = { leagueId: number };

export const LeagueCheerTalkTabs = ({ leagueId }: Props) => (
  <CheerTalkTabsBase
    allContent={<AllContent leagueId={leagueId} />}
    reportedContent={<ReportedContent leagueId={leagueId} />}
  />
);
