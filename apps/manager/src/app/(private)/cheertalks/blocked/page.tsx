'use client';

import { Suspense } from '@suspensive/react';
import { Header } from '~/components/layout';
import { CheertalkList } from '../_components/cheertalk-list';

const Page = () => {
  return (
    <>
      <Header title="응원톡 관리" arrow />

      <div className="column h-full gap-1.5 bg-white p-5">
        <Suspense clientOnly>
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
            status="blocked"
          />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
