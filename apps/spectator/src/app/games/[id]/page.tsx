import * as Tabs from '@radix-ui/react-tabs';
import { Suspense } from '@suspensive/react';
import { redirect } from 'next/navigation';
import { CheerVS } from '~/app/games/[id]/_components/cheer-vs';
import { LineupTab } from '~/app/games/[id]/_components/lineup-tab';
import { TimelineTab } from '~/app/games/[id]/_components/timeline-tab';
import { VideoTab } from '~/app/games/[id]/_components/video-tab';
import { Header } from '~/components/layout';
import { TabTrigger } from '~/components/ui';
import { Banner } from './_components/banner';
import { CheerTalk } from './_components/cheer-talk';
import { routes } from '~/constants/routes';

const validTabs = ['lineup', 'timeline', 'video'];

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
  const tab = validTabs.includes(_tab || '') ? _tab : 'lineup';

  if (_tab && !validTabs.includes(_tab)) {
    redirect('?tab=lineup');
  }

  return (
    <>
      <Header arrow />
      <div className="w-full">
        <Suspense clientOnly>
          <Banner gameId={id} />
        </Suspense>

        <Suspense clientOnly>
          <CheerVS gameId={id} />
        </Suspense>

        <Suspense clientOnly>
          <CheerTalk gameId={id} />
        </Suspense>

        <hr className="h-2 w-full border-none bg-neutral-50" />

        <Tabs.Root className="column w-full" defaultValue={tab}>
          <Tabs.List className="center sticky top-12 z-10 h-12 gap-5 border-neutral-100 border-b bg-white">
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

          <Tabs.Content value="lineup">
            <Suspense clientOnly>
              <LineupTab gameId={id} />
            </Suspense>
          </Tabs.Content>

          <Tabs.Content value="timeline">
            <Suspense clientOnly>
              <TimelineTab gameId={id} />
            </Suspense>
          </Tabs.Content>

          <Tabs.Content value="video">
            <Suspense clientOnly>
              <VideoTab gameId={id} />
            </Suspense>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export default Page;
