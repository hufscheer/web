import * as Tabs from '@radix-ui/react-tabs';
import { Suspense } from '@suspensive/react';
import { redirect } from 'next/navigation';

import { CheerVS } from '~/app/games/[id]/_components/cheer-vs';
import { LineupTab } from '~/app/games/[id]/_components/lineup-tab';
import { TimelineTab } from '~/app/games/[id]/_components/timeline-tab';
import { VideoTab } from '~/app/games/[id]/_components/video-tab';
import { Header } from '~/components/layout';
import { TabTrigger } from '~/components/ui';
import { routes } from '~/constants/routes';

import { Banner } from './_components/banner';
import { CheerTalk } from './_components/cheer-talk';

const validTabs = ['cheer', 'lineup', 'timeline', 'video'];

type Props = {
  searchParams: Promise<{ tab?: string }>;
  params: Promise<{ id: string }>;
};

const Page = async ({ searchParams, params }: Props) => {
  const { id: _id } = await params;
  const id = Number(_id);

  if (Number.isNaN(id) || id <= 0) {
    redirect(`/${routes.home}`);
  }

  const { tab: _tab } = await searchParams;
  const tab = validTabs.includes(_tab || '') ? _tab : 'cheer';

  if (_tab && !validTabs.includes(_tab)) {
    redirect('?tab=cheer');
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <Header arrow />

      <div className="flex-shrink-0">
        <Suspense clientOnly>
          <Banner gameId={id} />
        </Suspense>

        <Suspense clientOnly>
          <CheerVS gameId={id} />
        </Suspense>

        <hr className="h-2 w-full border-none bg-neutral-50" />
      </div>

      <Tabs.Root className="flex min-h-0 flex-1 flex-col" defaultValue={tab}>
        <Tabs.List className="center sticky top-0 z-10 flex h-12 flex-shrink-0 gap-5 border-b border-neutral-100 bg-white">
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
          className="flex min-h-0 flex-1 flex-col overflow-hidden outline-none"
        >
          <Suspense clientOnly>
            <CheerTalk gameId={id} />
          </Suspense>
        </Tabs.Content>
        <Tabs.Content value="lineup" className="min-h-0 flex-1 overflow-y-auto outline-none">
          <Suspense clientOnly>
            <LineupTab gameId={id} />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content value="timeline" className="min-h-0 flex-1 overflow-y-auto outline-none">
          <Suspense clientOnly>
            <TimelineTab gameId={id} />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content value="video" className="min-h-0 flex-1 overflow-y-auto outline-none">
          <Suspense clientOnly>
            <VideoTab gameId={id} />
          </Suspense>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default Page;
