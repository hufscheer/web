import { colors, Typography } from '@hcc/ui';
import * as Tabs from '@radix-ui/react-tabs';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { redirect } from 'next/navigation';
import { Header } from '~/components/layout';
import { TabTrigger } from '~/components/ui';
import { PreviousTab } from './_components/previous-tab';
import { RecentTab } from './_components/recent-tab';
import { TeamTab } from './_components/team-tab';
import { CalendarMenu } from './_components/calendar-menu';

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
          <ErrorBoundary fallback={<ErrorMessage />}>
            <Suspense clientOnly>
              <PreviousTab year={year} />
            </Suspense>
          </ErrorBoundary>
        </Tabs.Content>
        <Tabs.Content value="recent">
          <ErrorBoundary fallback={<ErrorMessage />}>
            <Suspense clientOnly>
              <RecentTab />
            </Suspense>
          </ErrorBoundary>
        </Tabs.Content>
        <Tabs.Content value="team">
          <ErrorBoundary fallback={<ErrorMessage />}>
            <Suspense clientOnly>
              <TeamTab />
            </Suspense>
          </ErrorBoundary>
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default Page;

const ErrorMessage = () => {
  return (
    <Typography className="p-5 text-center" color={colors.neutral500} fontSize={14} weight="medium">
      알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해 주세요.
    </Typography>
  );
};
