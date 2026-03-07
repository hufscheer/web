'use client';

import { useSuspenseCheerTalkBlock } from '~/api';

import { CheerTalkList } from '../_components/cheertalk-list';

export const BlockedList = () => {
  const { data } = useSuspenseCheerTalkBlock({ cursor: 1, size: 5 });

  return <CheerTalkList cheerTalks={data} status="blocked" />;
};
