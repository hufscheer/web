import type { Metadata } from 'next';

import * as Tabs from '@radix-ui/react-tabs';
import { Suspense } from '@suspensive/react';
import { redirect } from 'next/navigation';

import type { GameType } from '~/api';

import { fetchGame } from '~/api';
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

const validTabs = ['cheer', 'lineup', 'timeline', 'video'];

type Props = {
  searchParams: Promise<{ tab?: string }>;
  params: Promise<{ orgId: string; id: string }>;
};

const Page = async ({ searchParams, params }: Props) => {
  const { orgId: _orgId, id: _id } = await params;
  const orgId = Number(_orgId);
  const id = Number(_id);

  if (Number.isNaN(id) || id <= 0) {
    redirect(routes.home({ orgId, sport: SPORT_TYPE }));
  }

  const { tab: _tab } = await searchParams;
  const tab = validTabs.includes(_tab || '') ? _tab : 'cheer';

  if (_tab && !validTabs.includes(_tab)) {
    redirect('?tab=cheer');
  }

  return (
    <div className="flex h-dvh flex-col bg-white">
      <Header.Root
        left={<Header.Arrow />}
        center={<Header.LinkLogo sport={SPORT_TYPE} orgId={orgId} />}
      />

      <Suspense clientOnly fallback={<BannerSkeleton />}>
        <Banner gameId={id} sportType={SPORT_TYPE} />
      </Suspense>

      <Suspense clientOnly>
        <CheerVS gameId={id} />
      </Suspense>

      <hr className="h-2 w-full border-none bg-neutral-50" />

      <Tabs.Root className="flex min-h-0 flex-1 flex-col" defaultValue={tab}>
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
            <CheerTalk gameId={id} sportType={SPORT_TYPE} />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content value="lineup" className="overflow-y-auto outline-none">
          <Suspense clientOnly>
            <LineupTab gameId={id} sportType={SPORT_TYPE} />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content value="timeline" className="overflow-y-auto outline-none">
          <Suspense clientOnly>
            <TimelineTab gameId={id} sportType={SPORT_TYPE} />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content value="video" className="overflow-y-auto outline-none">
          <Suspense clientOnly>
            <VideoTab gameId={id} />
          </Suspense>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default Page;

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id: _id } = await params;
  const id = Number(_id);

  if (!_id || Number.isNaN(id) || id <= 0) return {};

  const game: GameType = await fetchGame({ gameId: id });
  const teamNames = game.gameTeams.map((t) => t.gameTeamName);
  const title =
    teamNames.length === 2 ? `${game.gameName} - ${teamNames[0]} : ${teamNames[1]}` : game.gameName;

  return {
    title,
    openGraph: { title },
    twitter: { title },
  };
};
