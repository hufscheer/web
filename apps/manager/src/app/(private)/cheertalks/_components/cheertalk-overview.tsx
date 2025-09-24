'use client';

import { Fragment } from 'react';
import { CheertalkList } from './cheertalk-list';
import CheerTalkCard from './cheertalkCard';
import CheerTalkTabs from './cheertalk-tab';
import { Button } from '@hcc/ui';

export const CheertalkOverview = () => {
  //const { data } = useSuspenseLeaguesLeague();

  return (
    <Fragment>
      <div className="flex w-full flex-col gap-2 p-5">
        <CheerTalkTabs />
        <CheertalkList
          cheerTalk={{
            cheerTalkId: 1,
            content: '응원합니다! 화이팅!',
            gameTeamId: 101,
            createdAt: '2025-09-23T13:00:00',
            isBlocked: false,
            leagueName: '트로이카',
            gameName: '외대 VS 경희대',
          }}
          status="reported"
        />
        <CheerTalkCard
          cheerTalk={{
            cheerTalkId: 1,
            content: '응원합니다! 화이팅!',
            gameTeamId: 101,
            createdAt: '2025-09-23T13:00:00',
            isBlocked: false,
            leagueName: '트로이카',
            gameName: '외대 VS 경희대',
          }}
        />
        <Button color="danger" variant="subtle">
          채팅 가리기
        </Button>
      </div>
      <div>d</div>
    </Fragment>
  );
};
