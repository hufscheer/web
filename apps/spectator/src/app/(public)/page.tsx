import { colors, Typography } from '@hcc/ui';
import * as Tabs from '@radix-ui/react-tabs';
import { Header } from '~/components/layout';
import { CalendarMenu } from './_components/calendar-menu';

const Page = () => {
  return (
    <>
      <Header menu={<CalendarMenu />} />

      <Tabs.Root className="h-full w-full bg-white" value="tab-1">
        <Tabs.List className="center gap-5 border-neutral-100 border-b">
          <Typography fontSize={14} color={colors.neutral900} weight="semibold" asChild>
            <Tabs.Trigger
              className="cursor-pointer border-neutral-900 border-b px-1.5 py-3"
              value="tab-1"
            >
              이전 대회
            </Tabs.Trigger>
          </Typography>
          <Typography fontSize={14} color={colors.neutral900} weight="semibold" asChild>
            <Tabs.Trigger
              className="cursor-pointer border-neutral-900 border-b px-1.5 py-3"
              value="tab-2"
            >
              최근 대회
            </Tabs.Trigger>
          </Typography>
          <Typography fontSize={14} color={colors.neutral900} weight="semibold" asChild>
            <Tabs.Trigger
              className="cursor-pointer border-neutral-900 border-b px-1.5 py-3"
              value="tab-3"
            >
              팀별 보기
            </Tabs.Trigger>
          </Typography>
        </Tabs.List>
        <Tabs.Content value="tab-1">Tab 1</Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default Page;
