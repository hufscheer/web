import type { Metadata } from 'next';

import * as Tabs from '@radix-ui/react-tabs';
import { Suspense } from '@suspensive/react';
import { notFound, redirect } from 'next/navigation';

import { GameLiveSync } from '~/app/org/[orgId]/_components/game-live-sync';
import { GameTabsRoot } from '~/app/org/[orgId]/_components/game-tabs-root';
import { loadGame } from '~/app/org/[orgId]/_components/load-game';
import { Header } from '~/components/layout';
import { TabTrigger } from '~/components/ui';
import { routes } from '~/constants/routes';

import { SPORT_TYPE } from '../../_constants';
import { Banner, BannerSkeleton } from '../_components/banner';
import { CheerTalk } from '../_components/cheer-talk';
import { CheerVS } from '../_components/cheer-vs';
import { LineupTab } from '../_components/lineup-tab';
import { TimelineTab } from '../_components/timeline-tab';
import { VideoTab } from '../_components/video-tab';

type Props = {
  params: Promise<{ orgId: string; id: string }>;
};

const Page = async ({ params }: Props) => {
  const { orgId: _orgId, id: _id } = await params;
  const orgId = Number(_orgId);
  const id = Number(_id);

  if (Number.isNaN(id) || id <= 0) {
    redirect(routes.home({ orgId, sport: SPORT_TYPE }));
  }

  // 삭제됐거나 없는 경기(404)만 not-found 로 보낸다. 그 밖의 오류는 본문을 클라이언트가 가져온다
  if ((await loadGame(id)) === 'not-found') notFound();

  return (
    <div className="flex h-dvh flex-col bg-white">
      <GameLiveSync gameId={id} />

      <Header.Root
        left={<Header.Arrow />}
        center={<Header.LinkLogo sport={SPORT_TYPE} orgId={orgId} />}
      />

      <Suspense clientOnly fallback={<BannerSkeleton />}>
        <Banner gameId={id} />
      </Suspense>

      <Suspense clientOnly>
        <CheerVS gameId={id} />
      </Suspense>

      <hr className="h-2 w-full border-none bg-neutral-50" />

      <GameTabsRoot className="flex min-h-0 flex-1 flex-col">
        <Tabs.List className="sticky top-0 z-10 flex h-12 flex-shrink-0 gap-5 border-b border-neutral-100 bg-white px-5">
          <TabTrigger className="size-full" value="cheer">
            응원
          </TabTrigger>
          <TabTrigger className="size-full" value="lineup">
            라인업
          </TabTrigger>
          <TabTrigger className="size-full" value="timeline">
            타임라인
          </TabTrigger>
          <TabTrigger className="size-full" value="video">
            영상
          </TabTrigger>
        </Tabs.List>

        <Tabs.Content
          value="cheer"
          className="flex min-h-0 flex-1 flex-col bg-[#EBEBEB] outline-none"
        >
          <Suspense clientOnly>
            <CheerTalk gameId={id} />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content value="lineup" className="overflow-y-auto outline-none">
          <Suspense clientOnly>
            <LineupTab gameId={id} />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content value="timeline" className="overflow-y-auto outline-none">
          <Suspense clientOnly>
            <TimelineTab gameId={id} />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content value="video" className="overflow-y-auto outline-none">
          <Suspense clientOnly>
            <VideoTab gameId={id} />
          </Suspense>
        </Tabs.Content>
      </GameTabsRoot>
    </div>
  );
};

export default Page;

// 빌드 때는 미리 그리지 않고 처음 요청 때 그려 캐시한다(주기는 상위 layout 의 revalidate)
export const generateStaticParams = async () => [];

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id: _id } = await params;
  const id = Number(_id);

  if (!_id || Number.isNaN(id) || id <= 0) return {};

  const game = await loadGame(id);
  if (!game || game === 'not-found') return {};

  const teamNames = game.gameTeams.map((t) => t.gameTeamName);
  const title =
    teamNames.length === 2 ? `${game.gameName} - ${teamNames[0]} : ${teamNames[1]}` : game.gameName;

  return {
    title,
    openGraph: { title },
    twitter: { title },
  };
};
