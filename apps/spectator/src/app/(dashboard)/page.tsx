import * as Tabs from '@radix-ui/react-tabs';
import { Suspense } from '@suspensive/react';
import { redirect } from 'next/navigation';
import { Header } from '~/components/layout';
import { TabTrigger } from '~/components/ui';
import { CalendarMenu } from './_components/calendar-menu';
import { PreviousTab } from './_components/previous-tab';
import { RecentTab } from './_components/recent-tab';
import { TeamTab } from './_components/team-tab';

const validTabs = ['previous', 'recent', 'team'];

interface Props {
  searchParams: Promise<{
    tab?: string;
    year: string;
  }>;
}

const Page = async ({ searchParams }: Props) => {
  const { tab: _tab, year: _year } = await searchParams;

  const tab = validTabs.includes(_tab || '') ? _tab : 'recent';

  if (_tab && !validTabs.includes(_tab)) {
    redirect('?tab=recent');
  }

  const year = _year ? Number(_year) : new Date().getFullYear();

  return (
    <>
      <Header menu={<CalendarMenu />} />

      <Tabs.Root className="column w-full bg-white" defaultValue={tab}>
        <Tabs.List className="center sticky top-12 z-header h-12 gap-5 border-neutral-100 border-b bg-white">
          <TabTrigger value="previous">이전 대회</TabTrigger>
          <TabTrigger value="recent">최근 경기</TabTrigger>
          <TabTrigger value="team">팀별 보기</TabTrigger>
        </Tabs.List>

        <Tabs.Content value="previous">
          <Suspense clientOnly>
            <PreviousTab year={year} />
          </Suspense>
        </Tabs.Content>
        <Tabs.Content value="recent">
          <Suspense clientOnly>
            <RecentTab />
          </Suspense>
        </Tabs.Content>
        <Tabs.Content value="team">
          <Suspense clientOnly>
            <TeamTab />
          </Suspense>
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default Page;
