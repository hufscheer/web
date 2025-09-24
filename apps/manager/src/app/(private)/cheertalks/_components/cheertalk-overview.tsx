'use client';

import CheerTalkTabs from './cheertalk-tab';

export const CheertalkOverview = () => {
  //const { data } = useSuspenseLeaguesLeague();

  return (
    <div className="flex w-full flex-col gap-2 p-5">
      <CheerTalkTabs />
    </div>
  );
};
