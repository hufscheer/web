'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { Suspense } from '@suspensive/react';

import type { SportType } from '~/api';

import { CheerVS } from '~/app/[sport]/games/_components/cheer-vs';
import { LineupTab } from '~/app/[sport]/games/_components/lineup-tab';
import { TimelineTab } from '~/app/[sport]/games/_components/timeline-tab';
import { VideoTab } from '~/app/[sport]/games/_components/video-tab';
import { Header } from '~/components/layout';
import { TabTrigger } from '~/components/ui';

import { Banner, BannerSkeleton } from '../../_components/banner';
import { CheerTalk } from '../../_components/cheer-talk';

type Props = {
  gameId: number;
  sportType: SportType;
  defaultTab: string;
};

export const GamePageClient = ({ gameId, sportType, defaultTab }: Props) => {
  return (
    <div className="flex h-dvh flex-col overflow-y-auto bg-white">
      <Header.Root left={<Header.Arrow />} center={<Header.LinkLogo />} />

      <Suspense clientOnly fallback={<BannerSkeleton />}>
        <Banner gameId={gameId} sportType={sportType} />
      </Suspense>

      <Suspense clientOnly>
        <CheerVS gameId={gameId} />
      </Suspense>

      <hr className="h-2 w-full border-none bg-neutral-50" />

      <Tabs.Root className="flex flex-col" defaultValue={defaultTab}>
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
          className="flex h-[calc(100dvh-3rem)] flex-col bg-[#EBEBEB] outline-none"
        >
          <Suspense clientOnly>
            <CheerTalk gameId={gameId} sportType={sportType} />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content value="lineup" className="min-h-[calc(100dvh-3rem)] outline-none">
          <Suspense clientOnly>
            <LineupTab gameId={gameId} sportType={sportType} />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content value="timeline" className="min-h-[calc(100dvh-3rem)] outline-none">
          <Suspense clientOnly>
            <TimelineTab gameId={gameId} sportType={sportType} />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content value="video" className="min-h-[calc(100dvh-3rem)] outline-none">
          <Suspense clientOnly>
            <VideoTab gameId={gameId} />
          </Suspense>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
