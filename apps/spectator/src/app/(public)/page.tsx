import * as Tabs from '@radix-ui/react-tabs';
import { Header } from '~/components/layout';
import { CalendarMenu } from './_components/calendar-menu';
import { TabTrigger } from './_components/tab-trigger';

const Page = () => {
  return (
    <>
      <Header menu={<CalendarMenu />} />

      <Tabs.Root className="h-full w-full bg-white" defaultValue="tab-1">
        <Tabs.List className="center gap-5 border-neutral-100 border-b">
          <TabTrigger value="tab-1">이전 대회</TabTrigger>
          <TabTrigger value="tab-2">최근 대회</TabTrigger>
          <TabTrigger value="tab-3">팀별 보기</TabTrigger>
        </Tabs.List>

        <Tabs.Content value="tab-1">Tab 1</Tabs.Content>
        <Tabs.Content value="tab-2">Tab 2</Tabs.Content>
        <Tabs.Content value="tab-3">Tab 3</Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default Page;
