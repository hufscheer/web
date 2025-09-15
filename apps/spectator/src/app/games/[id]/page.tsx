import * as Tabs from '@radix-ui/react-tabs';
import { Suspense } from '@suspensive/react';
import { redirect } from 'next/navigation';
import { CheerVS } from '~/app/games/[id]/_components/cheer-vs';
import { Header } from '~/components/layout';
import { TabTrigger } from '~/components/ui';
import { Banner } from './_components/banner';

const validTabs = ['lineup', 'timeline', 'video'];

type Props = {
  searchParams: Promise<{ tab?: string }>;
  params: Promise<{ id: string }>;
};

const Page = async ({ searchParams, params }: Props) => {
  const { id: _id } = await params;
  const id = Number(_id);

  const { tab: _tab } = await searchParams;
  const tab = validTabs.includes(_tab || '') ? _tab : 'lineup';

  if (_tab && !validTabs.includes(_tab)) {
    redirect('?tab=lineup');
  }

  return (
    <>
      <Header arrow />
      <div className="h-full w-full bg-white">
        <Suspense clientOnly>
          <Banner gameId={id} />
        </Suspense>

        <Suspense clientOnly>
          <CheerVS gameId={id} />
        </Suspense>

        <hr className="h-2 w-full border-none bg-neutral-50" />

        <Tabs.Root className="column w-full flex-1 overflow-hidden bg-white" defaultValue={tab}>
          <Tabs.List className="center gap-5 border-neutral-100 border-b">
            <TabTrigger className="w-full" value="lineup">
              라인업
            </TabTrigger>
            <TabTrigger className="w-full" value="timeline">
              타임라인
            </TabTrigger>
            <TabTrigger className="w-full" value="video">
              영상
            </TabTrigger>
          </Tabs.List>

          <Tabs.Content className="flex-1 overflow-hidden" value="lineup">
            <Suspense clientOnly>
              <></>
            </Suspense>
          </Tabs.Content>

          <Tabs.Content className="flex-1 overflow-hidden" value="timeline">
            <Suspense clientOnly>
              <></>
            </Suspense>
          </Tabs.Content>

          <Tabs.Content className="flex-1 overflow-hidden" value="video">
            <Suspense clientOnly>
              <></>
            </Suspense>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export default Page;
