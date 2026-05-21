'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { Suspense } from '@suspensive/react';
import { useState } from 'react';

import type { SportType } from '~/api';

import { CheerVS } from '~/app/[sport]/games/_components/cheer-vs';
import { LineupTab } from '~/app/[sport]/games/_components/lineup-tab';
import { TimelineTab } from '~/app/[sport]/games/_components/timeline-tab';
import { VideoTab } from '~/app/[sport]/games/_components/video-tab';
import { Header } from '~/components/layout';
import { TabTrigger } from '~/components/ui';
import { cn } from '~/utils/cn';

import { Banner, BannerSkeleton } from '../../_components/banner';
import { CheerTalk } from '../../_components/cheer-talk';

type Props = {
  gameId: number;
  sportType: SportType;
  defaultTab: string;
};

export const GamePageClient = ({ gameId, sportType, defaultTab }: Props) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const isCheerTab = activeTab === 'cheer';

  return (
    <div className={cn('flex flex-col bg-white', !isCheerTab && 'h-dvh')}>
      <Header.Root left={<Header.Arrow />} center={<Header.LinkLogo />} />

      <Suspense clientOnly fallback={<BannerSkeleton />}>
        <Banner gameId={gameId} sportType={sportType} />
      </Suspense>

      <Suspense clientOnly>
        <CheerVS gameId={gameId} />
      </Suspense>

      <hr className="h-2 w-full border-none bg-neutral-50" />

      <Tabs.Root
        className={cn('flex flex-col', !isCheerTab && 'min-h-0 flex-1')}
        defaultValue={defaultTab}
        onValueChange={setActiveTab}
      >
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

        <Tabs.Content value="cheer" className="flex flex-col bg-[#EBEBEB] outline-none">
          <Suspense clientOnly>
            <CheerTalk gameId={gameId} sportType={sportType} />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content
          value="lineup"
          className={cn('outline-none', !isCheerTab && 'flex-1 overflow-y-auto')}
        >
          <Suspense clientOnly>
            <LineupTab gameId={gameId} sportType={sportType} />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content
          value="timeline"
          className={cn('outline-none', !isCheerTab && 'flex-1 overflow-y-auto')}
        >
          <Suspense clientOnly>
            <TimelineTab gameId={gameId} sportType={sportType} />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content
          value="video"
          className={cn('outline-none', !isCheerTab && 'flex-1 overflow-y-auto')}
        >
          <Suspense clientOnly>
            <VideoTab gameId={gameId} />
          </Suspense>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
