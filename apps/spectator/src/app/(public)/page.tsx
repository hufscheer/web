import * as Tabs from '@radix-ui/react-tabs';
import { Suspense } from '@suspensive/react';
import { redirect } from 'next/navigation';
import { Header } from '~/components/layout';
import { CalendarMenu } from './_components/calendar-menu';
import { PreviousTab } from './_components/previous-tab';
import { RecentTab } from './_components/recent-tab';
import { TabTrigger } from './_components/tab-trigger';
import { TeamTab } from './_components/team-tab';

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { tab } = await searchParams;

  const validTabs = ['previous', 'recent', 'team'];
  const currentTab = validTabs.includes(tab || '') ? tab : 'recent';

  if (tab && !validTabs.includes(tab)) {
    redirect('?tab=recent');
  }

  return (
    <>
      <Header menu={<CalendarMenu />} />

      <Tabs.Root
        className="column w-full flex-1 overflow-hidden bg-white"
        defaultValue={currentTab}
      >
        <Tabs.List className="center gap-5 border-neutral-100 border-b">
          <TabTrigger value="previous">이전 대회</TabTrigger>
          <TabTrigger value="recent">최근 경기</TabTrigger>
          <TabTrigger value="team">팀별 보기</TabTrigger>
        </Tabs.List>

        <Tabs.Content value="previous">
          <Suspense clientOnly>
            <PreviousTab />
          </Suspense>
        </Tabs.Content>
        <Tabs.Content value="recent">
          <Suspense clientOnly>
            <RecentTab />
          </Suspense>
        </Tabs.Content>
        <Tabs.Content className="flex-1 overflow-hidden" value="team">
          <Suspense clientOnly>
            <TeamTab />
          </Suspense>
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default Page;
