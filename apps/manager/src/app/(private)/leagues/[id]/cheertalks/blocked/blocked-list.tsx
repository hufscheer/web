'use client';

import { useSuspenseLeagueCheerTalkBlock } from '~/api/queries/useLeagueCheerTalkBlock';
import { CheerTalkList } from '~/app/(private)/_components/cheertalk/cheertalk-list';

type Props = { leagueId: number };

export const BlockedList = ({ leagueId }: Props) => {
  const { data } = useSuspenseLeagueCheerTalkBlock({ leagueId, cursor: 1, size: 20 });

  return <CheerTalkList cheerTalks={data} status="blocked" />;
};
