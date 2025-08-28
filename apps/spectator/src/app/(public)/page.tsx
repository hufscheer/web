import * as Tabs from '@radix-ui/react-tabs';
import { redirect } from 'next/navigation';
import { Header } from '~/components/layout';
import { CalendarMenu } from './_components/calendar-menu';
import { TabTrigger } from './_components/tab-trigger';

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

      <Tabs.Root className="h-full w-full bg-white" defaultValue={currentTab}>
        <Tabs.List className="center gap-5 border-neutral-100 border-b">
          <TabTrigger value="previous">이전 대회</TabTrigger>
          <TabTrigger value="recent">최근 대회</TabTrigger>
          <TabTrigger value="team">팀별 보기</TabTrigger>
        </Tabs.List>

        <Tabs.Content value="previous">이전 대회 내용</Tabs.Content>
        <Tabs.Content value="recent">최근 대회 내용</Tabs.Content>
        <Tabs.Content value="team">팀별 보기 내용</Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default Page;
