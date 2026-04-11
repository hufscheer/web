'use client';

import { useSuspenseCheerTalkReport } from '~/api/queries/useCheerTalkReport';
import { useSuspenseCheerTalks } from '~/api/queries/useCheerTalks';
import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';
import { CheerTalkTabs as CheerTalkTabsBase } from '~/app/(private)/_components/cheertalk/cheertalk-tabs';

const AllContent = () => {
  const { data } = useSuspenseCheerTalks({ cursor: 1, size: 2 });
  return <CheerTalkList cheerTalks={data} status="all" />;
};

const ReportedContent = () => {
  const { data } = useSuspenseCheerTalkReport({ cursor: 1, size: 2 });
  return <CheerTalkList cheerTalks={data} status="reported" />;
};

export const CheerTalkTabs = () => (
  <CheerTalkTabsBase allContent={<AllContent />} reportedContent={<ReportedContent />} />
);
